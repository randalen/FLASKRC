import json
import base64
from algosdk.v2client import algod
from algosdk import account, mnemonic
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, AssetFreezeTxn
from algosdk.future.transaction import *


# Shown for demonstration purposes. NEVER reveal secret mnemonics in practice.
# Change these values with your mnemonics
mnemonic1 = "warm embrace adult must album square fantasy pause draw caught age clap voice ski exist spirit truly intact stage best gold cabin damage about broccoli"
mnemonic2 = "sport soup rug leisure napkin castle coffee rug alert gallery avocado rug client amused artefact artist joy improve resource cup slender lemon auction absorb catch"
mnemonic3 = "business cabbage zoo expire grief real reason gauge bulb cash around foam figure keep animal betray minor elder mutual raccoon explain oblige mean able merry"
# never use mnemonics in production code, replace for demo purposes only

# For ease of reference, add account public and private keys to
# an accounts dict.

def getKeysAccount(mn):
    accounts = {}
    counter = 1
    for m in [mnemonic1, mnemonic2, mnemonic3]:
        accounts[counter] = {}
        accounts[counter]['pk'] = mnemonic.to_public_key(m)
        accounts[counter]['sk'] = mnemonic.to_private_key(m)
        counter += 1

# Specify your node address and token. This must be updated.
# algod_address = ""  # ADD ADDRESS
# algod_token = ""  # ADD TOKEN
def algod_client():
    algod_address = "https://testnet-algorand.api.purestake.io/ps2"
    algod_token = "Dbkz5VF0Rs4D8levweTASaoFzo01hlWl8uH0jppe"
    headers = {"X-API-Key": algod_token,}

    return algod.AlgodClient(algod_token, algod_address, headers)


#   Utility function used to print created asset for account and assetid
def print_created_asset(algodclient, account, assetid):    
    # note: if you have an indexer instance available it is easier to just use this
    # response = myindexer.accounts(asset_id = assetid)
    # then use 'account_info['created-assets'][0] to get info on the created asset
    account_info = algodclient.account_info(account)
    idx = 0;
    for my_account_info in account_info['created-assets']:
        scrutinized_asset = account_info['created-assets'][idx]
        idx = idx + 1       
        if (scrutinized_asset['index'] == assetid):
            print("Asset ID: {}".format(scrutinized_asset['index']))
            print(json.dumps(my_account_info['params'], indent=4))
            break

#   Utility function used to print asset holding for account and assetid
def print_asset_holding(algodclient, account, assetid):
    # note: if you have an indexer instance available it is easier to just use this
    # response = myindexer.accounts(asset_id = assetid)
    # then loop thru the accounts returned and match the account you are looking for
    account_info = algodclient.account_info(account)
    idx = 0
    for my_account_info in account_info['assets']:
        scrutinized_asset = account_info['assets'][idx]
        idx = idx + 1        
        if (scrutinized_asset['asset-id'] == assetid):
            print("Asset ID: {}".format(scrutinized_asset['asset-id']))
            print(json.dumps(scrutinized_asset, indent=4))
            break

# CREATE ASSET
# Get network params for transactions before every transaction.
def createAsset(accounts):
    params = algod_client.suggested_params()
    # comment these two lines if you want to use suggested params
    # params.fee = 1000
    # params.flat_fee = True

    # Account 1 creates an asset called latinum and
    # sets Account 2 as the manager, reserve, freeze, and clawback address.
    # Asset Creation transaction

    txn = AssetConfigTxn(
        sender=accounts[1]['pk'],
        sp=params,
        total=1000,
        default_frozen=False,
        unit_name="LATINUM",
        asset_name="latinum",
        manager=accounts[1]['pk'],
        reserve=accounts[1]['pk'],
        freeze=accounts[1]['pk'],
        clawback=accounts[1]['pk'],
        url="https://path/to/my/asset/details", 
        decimals=0)
    # Sign with secret key of creator
    stxn = txn.sign(accounts[1]['sk'])

    # Send the transaction to the network and retrieve the txid.
    try:
        txid = algod_client.send_transaction(stxn)
        print("Signed transaction with txID: {}".format(txid))
        # Wait for the transaction to be confirmed
        confirmed_txn = wait_for_confirmation(algod_client, txid, 4)  
        print("TXID: ", txid)
        print("Result confirmed in round: {}".format(confirmed_txn['confirmed-round']))
    
    except Exception as err:
        print(err)
    # Retrieve the asset ID of the newly created asset by first
    # ensuring that the creation transaction was confirmed,
    # then grabbing the asset id from the transaction.

    print("Transaction information: {}".format(
        json.dumps(confirmed_txn, indent=4)))
    # print("Decoded note: {}".format(base64.b64decode(
    #     confirmed_txn["txn"]["txn"]["note"]).decode()))

    try:
        # Pull account info for the creator
        # account_info = algod_client.account_info(accounts[1]['pk'])
        # get asset_id from tx
        # Get the new asset's information from the creator account
        ptx = algod_client.pending_transaction_info(txid)
        asset_id = ptx["asset-index"]
        print_created_asset(algod_client, accounts[1]['pk'], asset_id)
        print_asset_holding(algod_client, accounts[1]['pk'], asset_id)
    except Exception as e:
        print(e)



# CHANGE MANAGER
# The current manager(Account 2) issues an asset configuration transaction that assigns Account 1 as the new manager.
# Keep reserve, freeze, and clawback address same as before, i.e. account 2
def changeAssetManager(accounts, asset_id):
    params = algod_client.suggested_params()
    # comment these two lines if you want to use suggested params
    # params.fee = 1000
    # params.flat_fee = True

    # asset_id = 328952;

    txn = AssetConfigTxn(
        sender=accounts[1]['pk'],
        sp=params,
        index=asset_id, 
        manager=accounts[2]['pk'],
        reserve=accounts[1]['pk'],
        freeze=accounts[1]['pk'],
        clawback=accounts[1]['pk'])
    # sign by the current manager - Account 2
    stxn = txn.sign(accounts[1]['sk'])
    # txid = algod_client.send_transaction(stxn)
    # print(txid)

    # Wait for the transaction to be confirmed
    # Send the transaction to the network and retrieve the txid.
    try:
        txid = algod_client.send_transaction(stxn)
        print("Signed transaction with txID: {}".format(txid))
        # Wait for the transaction to be confirmed
        confirmed_txn = wait_for_confirmation(algod_client, txid, 4) 
        print("TXID: ", txid)
        print("Result confirmed in round: {}".format(confirmed_txn['confirmed-round']))
    
    except Exception as err:
        print(err)
    # Check asset info to view change in management. manager should now be account 1
    print_created_asset(algod_client, accounts[2]['pk'], asset_id)


# OPT-IN
# Check if asset_id is in account asset holdings prior to opt-in
def OptinTransfer(accounts, asset_id):
    params = algod_client.suggested_params()
    # comment these two lines if you want to use suggested params
    # params.fee = 1000
    # params.flat_fee = True

    account_info = algod_client.account_info(accounts[3]['pk'])
    holding = None
    idx = 0
    for my_account_info in account_info['assets']:
        scrutinized_asset = account_info['assets'][idx]
        idx = idx + 1    
        if (scrutinized_asset['asset-id'] == asset_id):
            holding = True
            break

    if not holding:

        # Use the AssetTransferTxn class to transfer assets and opt-in
        txn = AssetTransferTxn(
            sender=accounts[3]['pk'],
            sp=params,
            receiver=accounts[3]["pk"],
            amt=0,
            index=asset_id)
        stxn = txn.sign(accounts[3]['sk'])
        # Send the transaction to the network and retrieve the txid.
        try:
            txid = algod_client.send_transaction(stxn)
            print("Signed transaction with txID: {}".format(txid))
            # Wait for the transaction to be confirmed
            confirmed_txn = wait_for_confirmation(algod_client, txid, 4) 
            print("TXID: ", txid)
            print("Result confirmed in round: {}".format(confirmed_txn['confirmed-round']))
    
        except Exception as err:
            print(err)
        # Now check the asset holding for that account.
        # This should now show a holding with a balance of 0.
        print_asset_holding(algod_client, accounts[3]['pk'], asset_id)


# TRANSFER ASSET
def transferAsset(accounts, asset_id):
    params = algod_client.suggested_params()
    # comment these two lines if you want to use suggested params
    # params.fee = 1000
    # params.flat_fee = True
    txn = AssetTransferTxn(
        sender=accounts[1]['pk'],
        sp=params,
        receiver=accounts[2]["pk"],
        amt=10,
        index=asset_id)
    stxn = txn.sign(accounts[1]['sk'])
    # Send the transaction to the network and retrieve the txid.
    try:
        txid = algod_client.send_transaction(stxn)
        print("Signed transaction with txID: {}".format(txid))
        # Wait for the transaction to be confirmed
        confirmed_txn = wait_for_confirmation(algod_client, txid, 4) 
        print("TXID: ", txid)
        print("Result confirmed in round: {}".format(confirmed_txn['confirmed-round']))

    except Exception as err:
        print(err)
    print_asset_holding(algod_client, accounts[2]['pk'], asset_id)


# FREEZE ASSET
def freezeAsset(accounts, asset_id):
    params = algod_client.suggested_params()
    # comment these two lines if you want to use suggested params
    # params.fee = 1000
    # params.flat_fee = True
    # The freeze address (Account 1) freezes Account 2's asset holdings.

    txn = AssetFreezeTxn(
        sender=accounts[1]['pk'],
        sp=params,
        index=asset_id,
        target=accounts[2]["pk"],
        new_freeze_state=True   
        )
    stxn = txn.sign(accounts[1]['sk'])
    # Send the transaction to the network and retrieve the txid.
    try:
        txid = algod_client.send_transaction(stxn)
        print("Signed transaction with txID: {}".format(txid))
        # Wait for the transaction to be confirmed
        confirmed_txn = wait_for_confirmation(algod_client, txid, 4)  
        print("TXID: ", txid)
        print("Result confirmed in round: {}".format(confirmed_txn['confirmed-round']))    
    except Exception as err:
        print(err)
    # The balance should now be 10 with frozen set to true.
    print_asset_holding(algod_client, accounts[2]['pk'], asset_id)


# REVOKE ASSET
# The clawback address (Account 1) revokes  from Account 2 and places it back with Account 3.
def revokeAsset(accounts, asset_id):
    params = algod_client.suggested_params()
    # comment these two lines if you want to use suggested params
    # params.fee = 1000
    # params.flat_fee = True

    # Must be signed by the account that is the Asset's clawback address
    txn = AssetTransferTxn(
        sender=accounts[1]['pk'],
        sp=params,
        receiver=accounts[3]["pk"],
        amt=10,
        index=asset_id,
        revocation_target=accounts[2]['pk']
        )
    stxn = txn.sign(accounts[1]['sk'])
    # Send the transaction to the network and retrieve the txid.
    try:
        txid = algod_client.send_transaction(stxn)
        print("Signed transaction with txID: {}".format(txid))
        # Wait for the transaction to be confirmed
        confirmed_txn = wait_for_confirmation(algod_client, txid, 4)
        print("TXID: ", txid)
        print("Result confirmed in round: {}".format(confirmed_txn['confirmed-round']))      
    except Exception as err:
        print(err)
    print("Account revoked 2 balance")
    print_asset_holding(algod_client, accounts[2]['pk'], asset_id)

    # The balance of account 3 should increase by new assignation.
    print("Account 3 incresed")
    print_asset_holding(algod_client, accounts[3]['pk'], asset_id)


# DESTROY ASSET
# With all assets back in the creator's account,
# the manager (Account 1) destroys the asset.
def destroyAsset(accounts, asset_id):
    params = algod_client.suggested_params()
    # comment these two lines if you want to use suggested params
    # params.fee = 1000
    # params.flat_fee = True

    # Asset destroy transaction
    txn = AssetConfigTxn(
        sender=accounts[1]['pk'],
        sp=params,
        index=asset_id,
        strict_empty_address_check=False
        )

    # Sign with secret key of creator
    stxn = txn.sign(accounts[1]['sk'])
    # Send the transaction to the network and retrieve the txid.
    # Send the transaction to the network and retrieve the txid.
    try:
        txid = algod_client.send_transaction(stxn)
        print("Signed transaction with txID: {}".format(txid))
        # Wait for the transaction to be confirmed
        confirmed_txn = wait_for_confirmation(algod_client, txid, 4) 
        print("TXID: ", txid)
        print("Result confirmed in round: {}".format(confirmed_txn['confirmed-round']))     
    except Exception as err:
        print(err)

    # Asset was deleted.
    try:
        print("Account 3 must do a transaction for an amount of 0, " )
        print("with a close_assets_to to the creator account, to clear it from its accountholdings")
        print("For Account 1, nothing should print after this as the asset is destroyed on the creator account")
    
        print_asset_holding(algod_client, accounts[1]['pk'], asset_id)
        print_created_asset(algod_client, accounts[1]['pk'], asset_id)
        # asset_info = algod_client.asset_info(asset_id)
    except Exception as e:
        print(e)
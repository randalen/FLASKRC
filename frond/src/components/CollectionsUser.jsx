import React, {useContext} from "react";
import {TransactionContext} from '../context/TransactionContext';
import dummyData from '../utils/dummyData';
import { shortenAddress } from "../utils/shortenAddress";
import assets from '../assets';

const CollectionsUser = () => {

    const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount, url}) =>{
      return (
        <div className="bg-[#181918] m-4 flex flex-1
            2x1:min-with-w-[450px]
            2x1:man-with-w-[500px]
            sm:min-w-[270px]
            sm:man-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2x1">
                <div className="flex flex-col items-center w-full mt-3">
                    <div className="w-full mb-6 p-2">
                        <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target='_blank' rel="noreferrer">
                            <p className="text-white text-base">
                                Creator: Dennys
                            </p>
                        </a>
                        <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target='_blank' rel="noreferrer">
                            <p className="text-white text-base">
                                Item: prueba 1
                            </p>
                        </a>
                        <p className="text-white text-base">
                            Collection: Nature 2022
                        </p>
                        {message && (<>
                            <br />
                            <p className="text-white text-base">Message: {message}</p>
                        </>)}
                        <img
                            //src={gifUrl || url}
                            src= {assets.feature}
                            alt="nature"
                            className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                        />
                    </div>
                </div>
        </div>
      )
    }
    //const {currentAccount } = useContext(TransactionContext);
    return (
        <div className="flex w-full justify-center items-center 2x1:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {true ? (
                    <h3 className="text-white text-3x1 text-center my-2">
                        Your current collections
                    </h3>
                ) : (
                    <h3 className="text-white text-3x1 text-center my-2">
                        LogIn to see your transactions
                    </h3>
                )}
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {dummyData.reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default CollectionsUser;
import {AiFillPlayCircle} from 'react-icons/ai';
import {SiEthereum} from 'react-icons/si';
import {BsInfoCircle} from 'react-icons/bs';
import styles from '../styles/Global';
import {AiFillThunderbolt} from 'react-icons/ai';
import {CollectionsUser} from '../components';
import {Loader} from './';
import { BsShieldFillCheck } from "react-icons/bs";
import assets from '../assets';
import React, {useContext} from "react";
import {TransactionContext} from '../context/TransactionContext';
import dummyData from '../utils/dummyData';
import { shortenAddress } from "../utils/shortenAddress";
import {NavLink, Link} from 'react-router-dom';

const Welcome = () => {

    const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
    
    const Input = ({ placeholder, name, type, value, handleChange }) =>(
    <input
    placeholder= {placeholder}
    type= {type}
    step= "0.0001"
    value= {value} 
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
    );

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
                                  Item: bahia 1
                              </p>
                          </a>
                          <p className="text-white text-base">
                              Collection: south 2022
                          </p>
                          {message && (<>
                              <br />
                              <p className="text-white text-base">Message: {message}</p>
                          </>)}
                          <img
                              //src={gifUrl || url}
                              src={assets.feature}
                              alt="nature"
                              className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                          />
                      </div>
                  </div>
          </div>
        )
      }

    const FeatureCard = ({ iconUrl, iconText }) =>  (
        <div className={styles.featureCard}>
          <img src={iconUrl} alt="icon" className={styles.featureImg} />
          <p className={styles.featureText}>{iconText}</p>
        </div>
      )

    const connectWallet = () =>{

    }

    const handleSubmit = () =>{

    }

    return (
        <div className='flex w-full justify-center items-center'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                    <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
                            <div className='flex justify-between flex-col w-full h-full'>
                                    <div className='flex justify-between items-start'>
                                        <div className='w-10 h-10 rounded-full border-2flex justify-center items-center'>
                                        
                                        </div>
                                        <AiFillThunderbolt fontSize={17} color="#fff" />
                                    </div>
                                    <div> 
                                        <p className='text-white font-light text-sm'>
                                         balance: 0 <br /> CO2 mitigated: 100 kg <br /> Number of Trees: 23 
                                        </p>
                                        <p className='text-white font-semibold text-lg mt-1'>
                                        TestUser
                                        </p>
                                    </div>


                            </div>
                    </div>
                             <p className='text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                                        <br /> Projects you have participated:
                                    </p>
                            <div>            
                            <FeatureCard iconUrl={assets.react} iconText="RC-Costa Rica" />    
                            </div>
                            <Link to='/projects'className={styles.btnPrimary}>Check more projects</Link> 
                            <br /> <br /> <br /> 
                        <div className="flex w-full justify-center items-center 2x1:px-20 gradient-bg-transactions">
                                <div className="flex flex-col md:p-12 py-12 px-4">
                                    {true ? (
                                        <h3 className="text-white text-3x1 text-center my-2">
                                            <br /> <br /> <br /> Your current collections
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
                                    <br /> <br /> <br /> 
                                </div>
                        </div>  
                        <div className='flex flex-1 justify-start flex-col mf:mr-10'>
                            <h1 className='text-3x1 sm:text-5x1 text-white text-gradient py-1'>
                                You can also offset on demand by adding to your balance, <br /> currently we support Algorand wallets.
                            </h1>
                            <button type='button' onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                                <p className='text-white text-base font-semibold'>Connect Wallet</p> 
                            </button>
                        </div>
                </div>

            </div>
        </div>
    );
}

export default Welcome;
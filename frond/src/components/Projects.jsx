import React, {useContext} from "react";
import {TransactionContext} from '../context/TransactionContext';
import dummyData from '../utils/dummyData';
import { shortenAddress } from "../utils/shortenAddress";
import {AiFillPlayCircle} from 'react-icons/ai';
import {SiEthereum} from 'react-icons/si';
import {BsInfoCircle} from 'react-icons/bs';
import {Navbar,Welcome, Footer, Services, Transactions} from '../components';
import styles from '../styles/Global';
import assets from '../assets';
import Button from './Button';
const Projects = () => {

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
                        <a href={`https://radicalclimate.xyz/projects/cerros`} target='_blank' rel="noreferrer">
                            <p className="text-white text-base">
                                Name: Cerros del sur 2022
                            </p>
                        </a>
                        <a href={`https://radicalclimate.xyz/projects/cerros`} target='_blank' rel="noreferrer">
                            <p className="text-white text-base">
                                Type: Reforestación
                            </p>
                        </a>
                        <p className="text-white text-base">
                            Due date: 2040
                        </p>
                        {message && (<>
                            <br />
                            <p className="text-white text-base">Message: {message}</p>
                        </>)}
                        <img
                            //src={gifUrl || url}
                            src={assets.siembra}
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
        <div className="min-h-screen gradient-bg-welcome">
        <Navbar />
        <div className='flex w-full justify-center items-center bg-white'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
            <div className='flex flex-1 justify-start flex-col mf:mr-10'>
            <h1 className={`
            ${ styles.blackText}
            ${styles.h1Text}`}>We work with the best selection of certified projects</h1>
            <div className={`${styles.descDiv} 
            ${" fadeLeftMini"}
            ${ styles.textLeft}
            `}>

            <p className={`
            ${styles.blackText }
            ${styles.descriptionText}`}>Following international standards, using cutting edge technology to provide  ultimate traceability
                                        <br /> <br />Current projects: </p>
            </div>

                </div>

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {dummyData.reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                        ))}
                    <div className="bg-[#181918] m-4 flex flex-1
                        2x1:min-with-w-[450px]
                        2x1:man-with-w-[500px]
                        sm:min-w-[270px]
                        sm:man-w-[300px]
                        flex-col p-3 rounded-md hover:shadow-2x1">
                            <div className="flex flex-col items-center w-full mt-3">
                                <div className="w-full mb-6 p-2">
                                    <a href={`https://radicalclimate.xyz/projects/ecoins`} target='_blank' rel="noreferrer">
                                        <p className="text-white text-base">
                                            Name: Ecoins
                                        </p>
                                    </a>
                                    <a href={`https://radicalclimate.xyz/projects/ecoins`} target='_blank' rel="noreferrer">
                                        <p className="text-white text-base">
                                            Type: Economia circular
                                        </p>
                                    </a>
                                    <p className="text-white text-base">
                                        Due date: 2028
                                    </p>
                                    <img
                                        //src={gifUrl || url}
                                        src={assets.ecoins}
                                        alt="nature"
                                        className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                                    />
                                </div>
                            </div>
                            
                    </div>
                    
                </div>

            </div>
        </div>
        <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-4 mt-10'>
        <br /> <br /> <br /> <br />
                            <h1 className='text-3x1 sm:text-5x1 text-white py-1'>
                                If you have an impactful project, and consider share our mission to preserve the planet, please reach us.
                            </h1>
                            <button type='button' className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                                <p className='text-white text-base font-semibold'>Share Project</p> 
                            </button>
                        </div>
        <Footer />
        </div>
    );
}

export default Projects;
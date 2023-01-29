import React, {useContext} from "react";
import {TransactionContext} from '../context/TransactionContext';
import dummyData from '../utils/dummyData';
import { shortenAddress } from "../utils/shortenAddress";

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
                        <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target='_blank' rel="noreferrer">
                            <p className="text-white text-base">
                                Creator: Delia Serracin
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
                            src="https://media.giphy.com/media/dsngJ31iGCnatIHe4w/giphy.gif"
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
        <div className='flex w-full justify-center items-center'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-1 justify-start flex-col mf:mr-10'>
                    <h1 className='text-3x1 sm:text-5x1 text-white py-1'>
                        Thanks for getting involve!
                        <br /> We are in a limited betta version, preparing for full operation.
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        Mid 2023 is the target date.
                    </p>

                </div>

                <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {dummyData.reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                        ))}
                </div>

                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default Projects;
import {AiFillPlayCircle} from 'react-icons/ai';
import {SiEthereum} from 'react-icons/si';
import {BsInfoCircle} from 'react-icons/bs';
import {Navbar,Welcome, Footer, Services, Transactions} from '../components';

import {Loader} from './';


const Subscribe = () => {

    const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
    
    const Input = ({ placeholder, name, type, handleChange }) =>(
    <input
    placeholder= {placeholder}
    type= {type}
    step= "0.0001"
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
    );
    
    const connectWallet = () =>{

    }

    const handleSubmit = () =>{

    }

    return (
        <div className="min-h-screen gradient-bg-welcome">
        <Navbar />
        <div className='flex w-full justify-center items-center'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-1 justify-start flex-col mf:mr-10'>
                    <h1 className='text-3x1 sm:text-5x1 text-white py-1'>
                        Here you are! Let's take take action on projects across the world and save our planet.
                        <br /> You assing a percentage to be assign from your rewards montly balance to funds projects.
                        Or you can Offset at any time by selecting a project.
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        Already have an account? Log In in to continue
                    </p>

                <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
                        <div className={`rounded-tl-2x1 ${commonStyles}`}>
                            X# users active
                        </div>                       

                    <div className={commonStyles}>
                    X# trees planted
                    </div>
                        <div className={`rounded-bl-2x1 ${commonStyles}`}>
                        X# project available
                        </div>   
                        <div className={commonStyles}>
                        X# carbon mitigated
                        </div>                     
                    </div>
                </div>

                <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
                    <Input placeholder="Email" name="amount" type="number" handleChange={() => {}}/>

                <div className='h-[1px] w-full bg-gray-400 my-2'/>
                <Input placeholder="Bank name" name="addressTo" type="text" handleChange={() => {}}/>
                    <Input placeholder="Last 4 digits credit card (only last 4)" name="amount" type="number" handleChange={() => {}}/>
                    <Input placeholder="Percentage to assign %" name="keyword" type="text" handleChange={() => {}}/>
                    <Input placeholder="Country" name="message" type="text" handleChange={() => {}}/>
                <div className='h-[1px] w-full bg-gray-400 my-2'/>
                {false ? (
                    <Loader />
                ) : (
                    <button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer">
                        whait list form 
                     </button>
                )}
                </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default Subscribe;
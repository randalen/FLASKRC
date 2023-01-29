import {AiFillPlayCircle} from 'react-icons/ai';
import {SiEthereum} from 'react-icons/si';
import {BsInfoCircle} from 'react-icons/bs';
import {Navbar,Welcome, Footer, Services, Transactions} from '.';
import {Loader} from '.';
import { Link, useParams, Navigate, redirect,  } from 'react-router-dom';
import React, {useContext, useState,  } from 'react';


const Login = () => {

    //const {store, actions }  = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const token  = sessionStorage.getItem('token');

    const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

    const handleSubmit = async () =>{
        //actions.login(email, password);
        const opts ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email" : email, "password": password})
        
        }
        try {
            const resp = await fetch('https://radicalclimatev1.azurewebsites.net/login', opts)
            if (resp.status !== 200) {
                alert("Error")
                return false;
              }
              const data = await resp.json();
              console.log("BACKEND: ",data)
              sessionStorage.setItem('token', data.access_token);
              //setStore ({token: data.access_token});
              setRedirect(true);
          } catch (err) {
              console.error("There was an error logging in", err);
            };
    }

    if (redirect){
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className="min-h-screen gradient-bg-welcome">
        <Navbar />
        <div className='flex w-full justify-center items-center'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
            <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
                    <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" placeholder="User" name="email" type="text" value = {email}  onChange= {e => setEmail(e.target.value)}/>
                    <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" placeholder="Password" name="password" type="text" value = {password} onChange={(e) => setPassword(e.target.value)}/>
                <div className='h-[1px] w-full bg-gray-400 my-2'/>
                    <button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer">
                        Access
                     </button>
                </div>
                    <h1 className='text-3x1 sm:text-5x1 text-white py-1'>
                        <br /> You assign a percentage from your credit card rewards montly balance to fund conservation projects.
                        Or you can Offset at any time by selecting a project.
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        Current numbers:
                    </p>
                <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
                        <div className={`rounded-tl-2x1 ${commonStyles}`}>
                            15 users active
                        </div>                       

                    <div className={commonStyles}>
                    786 trees planted
                    </div>
                        <div className={`rounded-bl-2x1 ${commonStyles}`}>
                        2 projects available
                        </div>   
                        <div className={commonStyles}>
                         carbon mitigated
                        </div>                     
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default Login;
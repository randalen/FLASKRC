import { useState } from 'react'
import assets from '../assets';
import styles from '../styles/Global';
import Button from './Button';

const Intro = () => {

  return (
    <div className={`relative flex items-center justify-center mb-12 overflow-hidden `}>
      
      <div className={`${styles.subSection} flex-col text-center justify-center items-center `}>
        <div className="relative z-30 p-20 text-2xl text-white bg-blue-300 bg-opacity-10 rounded-xl ">
          <h1 className={`${styles.h1Text} `}>Let's take action!</h1>
            <p className={`${styles.pText}`}>Our mission is to make it easy for everyone to participate on climate change projects,
          in the most transparent way.</p>
            <div className='flex justify-center items-center'>
            {(sessionStorage.getItem('token') && sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== ''
                      )?  
          <Button

                assetUrl={assets.expo}
                link="/projects"
            />
            :
            <Button

            assetUrl={assets.expo}
            link="/subscribe"
        />}
            </div>
        </div>
      <video src={assets.vd} autoPlay loop muted className="object-cover absolute z-10 w-auto min-w-full min-h-full max-w-none"/>
        <div>
        </div>
      </div>
    </div>

  );
}

export default Intro


import React from 'react';
import { BsShieldFillCheck } from "react-icons/bs";
import assets from '../assets';
import styles from '../styles/Global';

const FeatureCard = ({ iconUrl, iconText }) =>  (
  <div className={styles.featureCard}>
    <img src={iconUrl} alt="icon" className={styles.featureImg} />
    <p className={styles.featureText}>{iconText}</p>
  </div>
)

const ServiceCard = ({color, title, icon, subtitle}) =>(
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
  <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
    {icon}
  </div>
  <div className="ml-5 flex flex-col flex-1">
    <h3 className="mt-2 text-white text-lg">{title}</h3>
    <p className="mt-1 text-white text-sm md:w-9/12">
      {subtitle}
    </p>
  </div>
</div>
);


const FeaturesCopy = () => {
  return (
    <div className={`${styles.section} ${styles.bgPrimary} banner03`}>
      <div className={`${styles.subSection} flex-col text-center`}>
        <div>
          <h1 className={`${styles.h1Text} ${styles.whiteText}`}>Supported by</h1>
        </div>

        <div className={styles.flexWrap}>
          <FeatureCard iconUrl={assets.react} iconText="PuraVidaFruts" />
        </div>
      </div>
    </div>
  )
}

export default FeaturesCopy
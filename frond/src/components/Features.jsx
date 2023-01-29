import React from 'react';
import { BsShieldFillCheck } from "react-icons/bs";
import assets from '../assets';
import styles from '../styles/Global';
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

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


const Features = () => {
  return (
    <div className={`${styles.section} ${styles.bgPrimary} banner03`}>
      <div className={`${styles.subSection} flex-col text-center`}>
        <div>
          <h1 className={`${styles.h1Text} ${styles.whiteText}`}>The time is now.</h1>
          <p className={`${styles.pText} ${styles.whiteText}`}>We enable contributions from credit cards rewards programs to support intelligent projects against climate change.</p>
        </div>

        <div className={styles.flexWrap}>
        <ServiceCard
              color="bg-[#F84550]"
              title="Directly protect the planet and biodiversity"
              icon={<RiHeart2Fill fontSize={21} className="text-white" />}
              subtitle="And know your impact, by number of trees planted, amount of CO2 mitigated, or other metrics."
            />
          <ServiceCard
              color="bg-[#2952E3]"
              title="Full Transparency of the invesment strategy"
              icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
              subtitle="Using the blockchain technology, we can track every single dollar that is invested on climate change projects."
            />
            <ServiceCard
              color="bg-[#8945F8]"
              title="Go Local, community oriented"
              icon={<BiSearchAlt fontSize={21} className="text-white" />}
              subtitle="Impact globally by investing locally. We support projects that are close to you, so you can see the impact of your contribution."
            />

        </div>
      </div>
    </div>
  )
}

export default Features
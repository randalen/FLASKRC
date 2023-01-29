import React from 'react';

import styles from '../styles/Global';
import assets from '../assets';
import Button from './Button';

const SectionWrapper = ({ title, description, showBtn, banner, reverse }) => {
  return (
    <div className={`min-h-screen ${styles.section} 
      ${reverse ? styles.bgWhite : styles.bgPrimary} 
      ${banner}`}>
      <div className={`flex items-center 
        ${reverse ? styles.boxReverseClass : styles.boxClass} 
        w-11/12 sm:w-full minmd:w-3/4`}>
        <div className={`${styles.descDiv} 
          ${reverse ? " fadeRightMini" : " fadeLeftMini"}
          ${reverse ? styles.textRight : styles.textLeft}
        `}>
          <h1 className={`
          ${reverse ? styles.blackText : styles.whiteText}
          ${styles.h1Text}`}>{title}</h1>
          <p className={`
          ${reverse ? styles.blackText : styles.whiteText}
          ${styles.descriptionText}`}>{description}</p>
          {showBtn && (
            <div className='flex justify-center items-center'>
            <Button 
              assetUrl={assets.expo}
              link=""
            />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SectionWrapper
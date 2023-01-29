import React from 'react';

import styles from '../styles/Global';
import assets from '../assets';
import Button from './Button';

const Download = () => {
  return (
    <div className={`${styles.section} ${styles.bgWhite}`}>
      <div className={`${styles.subSection} flex-col text-center`}>
        <div>
          <h1 className={`${styles.h1Text} ${styles.blackText}`}>Let's take action!</h1>
          <p className={`${styles.pText} ${styles.blackText}`}>Our mission is to make it easy for everyone to participate on climate change projects,
        in the most transparent way.</p>
        </div>
        <Button 
              assetUrl={assets.expo}
              link=""
            />
        <div className={styles.flexCenter}>
          <img 
            src={assets.scene}
            alt="download_png"
            className={styles.fullImg}
          />
        </div>
      </div>
    </div>
  )
}

export default Download
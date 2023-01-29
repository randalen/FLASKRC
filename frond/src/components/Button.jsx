import React from 'react';
import {useNavigate} from "react-router-dom"
import styles from '../styles/Global';

const Button = ({ assetUrl, link }) => {
  return (
    <div 
      className={styles.btnBlack}
      onClick={() => window.location.assign(link)
      }
    >
      <img src={assetUrl} alt="expo_icon" className={styles.btnIcon} />
      <div className="flex flex-col justify-center ml-4">
        <p className={`${styles.btnText} font-normal text-xs`}>subscribe</p>
        <p className={`${styles.btnText} font-bold text-sm`}>Offset now</p>
      </div>
    </div>
  )
}

export default Button
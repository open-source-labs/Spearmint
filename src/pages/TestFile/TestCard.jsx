import React from 'react'
import styles from './TestCard.module.scss'

const TestCard = ({icon, type, description, onClick}) => {

  return (
    <div className={styles.testCard} onClick={onClick}>
      <div className={styles.iconLeft}>
        {icon}
      </div>
      <div className={styles.contentCard}>
        <h1 className={styles.cardTitle}>
          {type}
        </h1>
        <div className={styles.cardDesc}>
          {description}
        </div>
      </div>
    </div>
  );
};

export default TestCard;
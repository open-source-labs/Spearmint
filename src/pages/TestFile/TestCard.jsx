import React, { useContext } from 'react'
import styles from './TestCard.module.scss'
import { GlobalContext } from '../../context/reducers/globalReducer';

const TestCard = ({icon, type, description, onClick}) => {

  const [{ theme }] = useContext(
    GlobalContext
  );

  return (
    <div className={styles[`testCard${theme}`]} onClick={onClick}>
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
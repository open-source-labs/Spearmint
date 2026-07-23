/**
 * Light/Dark mode switch
 */

import React, { useContext } from 'react';
import styles from './ModeSwitch.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { toggleTheme } from '../../context/actions/globalActions';
import { BiSun, BiMoon } from 'react-icons/bi';
import { Switch } from '@mui/material';

const ModeSwitch = (): JSX.Element => {
  const [{ theme }, dispatchToGlobal] = useContext(GlobalContext);
  
  const changeTheme = () => {
    localStorage.setItem("theme", theme === 'light' ? 'dark' : 'light');
    dispatchToGlobal(toggleTheme());
  };

  return (
    <div className={styles.modBtnContainer}>
      <span title='Dark Mode'>
        <BiMoon size={'1.5rem'} />
      </span>
      <span title='Change theme'>
        <Switch checked={theme === 'light' ? true : false} onChange={changeTheme}/>
      </span>
      <span title='Light Mode'>
        <BiSun size={'1.5rem'} />
      </span>
    </div>
  );
}

export default ModeSwitch;
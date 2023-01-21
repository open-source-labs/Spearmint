/**
 * nav pannel
 * to export files, switch views, or open a new folder
 */
import { Button } from '@mui/material';
import React, { useState, useContext, useReducer } from 'react';
import styles from './NavBar.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  loadProject,
  toggleFileDirectory,
  toggleExportBool,
  toggleTheme,
} from '../../context/actions/globalActions';
import OpenFolder from '../OpenFolder/OpenFolderButton';
import ExportFileModal from '../Modals/ExportFileModal';
import Modal from '../Modals/Modal';
import { VscSettingsGear } from 'react-icons/vsc'
import { FaFileExport, FaUserCircle } from 'react-icons/fa';
import { BiSun, BiMoon } from 'react-icons/bi';
import { GoFileSubmodule } from 'react-icons/go';
import { ImHome3 } from "react-icons/im"
import { Switch } from '@mui/material';
import { useToggleModal } from '../TestMenu/testMenuHooks';
import { setTestCase } from '../../context/actions/globalActions';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { 
  ReactTestCaseContext, 
  reactTestCaseState,
  reactTestCaseReducer 
} from '../../context/reducers/reactTestCaseReducer';
import { createNewTest } from '../../context/actions/frontendFrameworkTestCaseActions';

// make sure to import in the dispatcher to the global state variable, isProjectLoaded
const NavBar = ({ inAboutPage }) => {
  const [{ fileTree, isFileDirectoryOpen, theme, isProjectLoaded }, dispatchToGlobal] =
    useContext(GlobalContext);
  const [, dispatchToMockData] = useContext(MockDataContext);
  const [reactTestCase, dispatchToReactTestCase] = useReducer(
    reactTestCaseReducer,
    reactTestCaseState
  );
  const { title, isModalOpen, openModal, openScriptModal, setIsModalOpen } = useToggleModal('New Test');
  
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  // we might have to export the context from ProjectLoader.jsx and then userContext(LoginContext) here to read in and set isLoggedIn from the login component
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // this is currently a component-scoped state
  
  /* handles logout */
  const handleLogout = () => {
    dispatchToGlobal(loadProject(false));
    fetch('http://localhost:3001/logout')
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  /* opens/closes the filedirectory */
  const handleToggleFileDirectory = () => {
    dispatchToGlobal(toggleFileDirectory());
  };

  /* exports the file (when true) */
  const openExportModal = () => {
    dispatchToGlobal(toggleExportBool());
    setIsExportModalOpen(true);
  };

  const changeTheme = () => {
    localStorage.setItem("theme", theme === 'light' ? 'dark' : 'light');
    dispatchToGlobal(toggleTheme());
  };

  /*
   * renders: buttons + icons for navbar, exportFileModal, boxes to open new folder and enter url, file directory
   */
  return (
    <div id={styles[`navBar${theme}`]}>
      {/* File Explorer */}
      <div className={styles.btnContainer}>
        <span onClick={openModal} title='Home'>
          <ImHome3 size={'1.5rem'}/>
        </span>
        <span id={isFileDirectoryOpen ? styles.activeEffect : ''} onClick={handleToggleFileDirectory} title='Expand file explorer'>
          <GoFileSubmodule size={'1.5rem'}/>
        </span>
        <span onClick={openExportModal} title='Export test file'>
          <FaFileExport size={'1.5rem'}/>
        </span>
        <OpenFolder />
      </div>
      <div id={styles.spearmintTitle}>
        spearmint
      </div>
      <div className={styles.btnContainer}>
        {/* removing icons because they do not serve any purpose in current code base */}
        {/* <span title='Change user profile'>
          <FaUserCircle size={'1.5rem'}/>
        </span>
        <span title='Change settings'>
          <VscSettingsGear size={'1.5rem'}/>
        </span> */}
        {/* <Button variant="outlined" type="button" onClick={handleLogout} id={styles.loginBtn}>
          LOGOUT
        </Button> */}
      </div>
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
      <div>
        <Modal
        title={title}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dispatchMockData={dispatchToMockData}
        dispatchTestCase={dispatchToReactTestCase}
        createTest={createNewTest}
        />
      </div>
      {!inAboutPage && (
        <ExportFileModal
          isExportModalOpen={isExportModalOpen}
          setIsExportModalOpen={setIsExportModalOpen}
        />
      )}
    </div>
  );
};

export default NavBar;

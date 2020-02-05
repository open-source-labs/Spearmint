import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addMiddleware } from '../../../context/reduxTestCaseActions';
import ReduxTestModal from '../../NavBar/Modals/ReduxTestModal';

const ReduxTestMenu = ({ dispatchToReduxTestCase }) => {

    /* making new state for this componenet, naming it isMOdalOpen, making method for it called setIsModalOpen, setting initial state to false */
    const [isReduxModalOpen, setIsReduxModalOpen] = useState(false)

    const openReduxModal = () => {
        setIsReduxModalOpen(true);
    };

    const closeReduxModal = () => {
        setIsReduxModalOpen(false);
    };

    const handleAddMiddleware = e => {
        dispatchToReduxTestCase(addMiddleware());
    };

    return (
        <div id='test'>
            <div id={styles.testMenu}>
                <div  id={styles.left}>
                <button onClick={openReduxModal}>New Redux Test +</button>
                <ReduxTestModal
                    isReduxModalOpen={isReduxModalOpen}
                    closeReduxModal={closeReduxModal}
                    dispatchToReduxTestCase={dispatchToReduxTestCase}
                />                    
                </div>
                <div id={styles.right}>
                    <button onClick={handleAddMiddleware}>Middleware</button>
                </div>
            </div>
        </div>
    )
}

export default ReduxTestMenu;
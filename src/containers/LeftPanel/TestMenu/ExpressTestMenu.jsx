import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import ExpressTestModal from '../../NavBar/Modals/ExpressTestModal';
/**
 * import actions here.Ex:
 * import { addMiddleware } from '../../../context/expressTestCaseActions';
 */

const ExpressTestMenu = ({ dispatchToExpressTestCase }) => {
    const [isExpressModalOpen, setIsExpressModalOpen] = useState(false)

    const openExpressModal = () => {
        setIsExpressModalOpen(true);
    };

    const closeExpressModal = () => {
        setIsExpressModalOpen(false);
    };

    /* add dispatches here. Ex:
    const handleAddMiddleware = e => {
        dispatchToExpressTestCase(addMiddleware());
    };*/

    return (
        <div id='test'>
            <div id={styles.testMenu}>
                <div  id={styles.left}>
                <button onClick={openExpressModal}>New Redux Test +</button>
                <ExpressTestModal
                    isExpressModalOpen={isExpressModalOpen}
                    closeExpressModal={closeExpressModal}
                    dispatchToExpressTestCase={dispatchToExpressTestCase}
                />                    
                </div>
                <div id={styles.right}>
                    {/* add buttons here. EX: */}
                    {/* <button onClick={handleAddMiddleware}>Middleware</button> */}
                </div>
            </div>
        </div>
    )
}

export default ExpressTestMenu;
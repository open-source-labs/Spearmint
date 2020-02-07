import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import EndpointTestModal from '../../NavBar/Modals/EndpointTestModal';
/**
 * import actions here.Ex:
 * import { addMiddleware } from '../../../context/endpointTestCaseActions';
 */

const EndpointTestMenu = ({ dispatchToEndpointTestCase }) => {
    const [isEndpointModalOpen, setIsEndpointModalOpen] = useState(false)

    const openEndpointModal = () => {
        setIsEndpointModalOpen(true);
    };

    const closeEndpointModal = () => {
        setIsEndpointModalOpen(false);
    };

    /* add dispatches here. Ex:
    const handleAddMiddleware = e => {
        dispatchToEndpointTestCase(addMiddleware());
    };*/

    return (
        <div id='test'>
            <div id={styles.testMenu}>
                <div  id={styles.left}>
                <button onClick={openEndpointModal}>New Redux Test +</button>
                <EndpointTestModal
                    isEndpointModalOpen={isEndpointModalOpen}
                    closeEndpointModal={closeEndpointModal}
                    dispatchToEndpointTestCase={dispatchToEndpointTestCase}
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

export default EndpointTestMenu;
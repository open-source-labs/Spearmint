import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import EndpointTestModal from '../../NavBar/Modals/EndpointTestModal';
import { addEndpoint } from '../../../context/endpointTestCaseActions';


const EndpointTestMenu = ({ dispatchToEndpointTestCase }) => {
    const [isEndpointModalOpen, setIsEndpointModalOpen] = useState(false)

    const openEndpointModal = () => {
        setIsEndpointModalOpen(true);
    };

    const closeEndpointModal = () => {
        setIsEndpointModalOpen(false);
    };

    const handleAddEndpoint = e => {
        console.log('HIT HANDLEADDENDPOINT')
        dispatchToEndpointTestCase(addEndpoint());
    };

    return (
        <div id='test'>
            <div id={styles.testMenu}>
                <div  id={styles.left}>
                <button onClick={openEndpointModal}>New Test +</button>
                <EndpointTestModal
                    isEndpointModalOpen={isEndpointModalOpen}
                    closeEndpointModal={closeEndpointModal}
                    dispatchToEndpointTestCase={dispatchToEndpointTestCase}
                />                    
                </div>
                <div id={styles.right}>
                    <button data-testid='endPointButton' onClick={handleAddEndpoint}>
                        Endpoint
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EndpointTestMenu;
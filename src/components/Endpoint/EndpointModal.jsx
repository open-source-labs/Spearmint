import React, { useContext } from 'react'
import { closeInfoModal } from '../../context/actions/endpointTestCaseActions';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import ReactModal from 'react-modal';
import styles from '../../components/Modals/ExportFileModal.module.scss';
const closeIcon = require('../../assets/images/close.png');

const EndpointModal = () => {
   const [ {modalOpen} , dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);

   const closeModal = () => {
       dispatchToEndpointTestCase(closeInfoModal())
   }

   const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

    return(
        <ReactModal
        className={styles.modal}
        shouldCloseOnEsc={true}
        isOpen={modalOpen}
        // style={modalStyles}
        >
            
            <img src= {closeIcon} onClick ={closeModal}/>
        </ReactModal>
        
    )
}

export default EndpointModal;
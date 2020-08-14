import React, { useContext } from 'react';
import { closeInfoModal } from '../../context/actions/reactTestCaseActions';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import ReactModal from 'react-modal';
import styles from '../../components/TestHelpModals/ReactHelpModal.module.scss';
import cn from 'classnames';
const closeIcon = require('../../assets/images/close.png');
const describe = require('../../assets/images/describe.png');

const ReactHelpModal = () => {
  const [{ modalOpen }, dispatchToTestCase] = useContext(ReactTestCaseContext);

  const closeModal = () => {
    dispatchToTestCase(closeInfoModal());
  };

  return (
    <ReactModal
      className={styles.modal}
      shouldCloseOnEsc={true}
      isOpen={modalOpen}
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      ariaHideApp={false}
    >
      <img
        src={closeIcon}
        onClick={closeModal}
        className={cn('far fa-window-close', styles.describeClose)}
      />
      <h2>Describe(name, fn)</h2>
      <p>
        Describe creates a block that groups together several related tests. The name argument is
        simply the name of component you're testing. fn argument is the test callback function{' '}
      </p>
      <img className={styles.describe} src={describe} />
    </ReactModal>
  );
};

export default ReactHelpModal;

import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { closeInfoModal } from '../../context/actions/reactTestCaseActions';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import styles from './TestHelpModal.module.scss';
import cn from 'classnames';

const closeIcon = require('../../assets/images/close.png');
const describe = require('../../assets/images/describehelp.png');

const ReactHelpModal = () => {
  const [_, dispatchToGlobal] = useContext(GlobalContext);
  // Hooks testing docs url
  const reactUrl = 'https://testing-library.com/docs/react-testing-library/example-intro';

  const [{ modalOpen }, dispatchToTestCase] = useContext(ReactTestCaseContext);

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(reactUrl));
    dispatchToTestCase(closeInfoModal());
  };

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

      {/* <h2>describe(name, fn)</h2>
      <p>
        Describe creates a block that groups together several related tests. First argument is name
        of component your testing. Second argument is the test/it callback function{' '}
      </p>
      <h2>it(name, fn)</h2>
      <p>
        First argument is name of the test. Second argument is callback function with test method.{' '}
      </p> */}
      <img className={styles.describe} src={describe} />
      <div>
        <button onClick={openDocs}>Need More Help?</button>
      </div>
    </ReactModal>
  );
};

export default ReactHelpModal;

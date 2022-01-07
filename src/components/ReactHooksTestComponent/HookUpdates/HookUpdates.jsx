import React, { useContext, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './HookUpdates.module.scss';
import { HooksTestCaseContext } from '../../../context/reducers/hooksTestCaseReducer';
import {
  deleteHookUpdates,
  updateHookUpdates,
  addAssertion,
  addCallbackFunc,
} from '../../../context/actions/hooksTestCaseActions';
import HooksAssertion from '../HooksAssertion';
import HooksCallback from '../HooksCallback';

const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const HookUpdates = ({ hookUpdates, index }) => {
  const [, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);

  const handleChangeHookUpdatesFields = (e, field) => {
    let updatedHookUpdates = { ...hookUpdates };
    updatedHookUpdates[field] = e.target.value;
    dispatchToHooksTestCase(updateHookUpdates(updatedHookUpdates));
  };

  const handleClickDeleteHookUpdates = (e) => {
    dispatchToHooksTestCase(deleteHookUpdates(hookUpdates.id));
  };

  const addAssertionHandleClick = () => {
    dispatchToHooksTestCase(addAssertion(index));
  };
  const addCallbackHandleClick = () => {
    dispatchToHooksTestCase(addCallbackFunc(index));
  };

  const testDescription = useRef(null);

  useEffect(() => {
    if (testDescription && testDescription.current) {
      testDescription.current.focus();
    }
  }, []);
  return (
    <Draggable draggableId={hookUpdates.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.hookUpdates}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteHookUpdates}
          />
          <div id={styles.hookUpdatesHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Hooks</h3>
          </div>
          <div id={styles.hooksFlexBox}>
            <div id={styles.serverInput}>
              <label htmlFor='test-statement'>Test description</label>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'spaceBetween',
                }}
              >
                <div id={styles.labelInputTest}>
                  <br />
                  <input
                    ref={testDescription}
                    type='text'
                    value={hookUpdates.testName}
                    id={styles.testStatement}
                    onChange={(e) => handleChangeHookUpdatesFields(e, 'testName')}
                  />
                </div>
              </div>
            </div>
          </div>
          <div id={styles.cbFlexBox}>
            <div id={styles.cb}>
              <label htmlFor='hook'>Hook</label>
              <input
                type='text'
                id='hook'
                value={hookUpdates.hook}
                onChange={(e) => handleChangeHookUpdatesFields(e, 'hook')}
                placeholder='e.g. useToggleCount'
              />
            </div>
            <div id={styles.cb}>
              <label htmlFor='hookParams'>Hook Parameters (optional)</label>
              <input
                type='text'
                id='hookParams'
                value={hookUpdates.hookParams}
                placeholder='e.g. false, 0'
                onChange={(e) => handleChangeHookUpdatesFields(e, 'hookParams')}
              />
            </div>
          </div>
          {hookUpdates.callbackFunc.map((callbackFunc, i) => {
            return (
              <div id={styles.cbFlexBox}>
                <HooksCallback callbackFunc={callbackFunc} index={index} id={i} key={'k' + i} />
              </div>
            );
          })}{' '}
          <div className={styles.buttonsContainer}></div>
          {hookUpdates.assertions.map((assertion, i) => {
            return <HooksAssertion assertion={assertion} index={index} id={i} key={'k' + i} />;
          })}
          <div className={styles.buttonsContainer} id={styles.stateFlexBox}>
            <button onClick={addAssertionHandleClick} className={styles.assertionButton}>
              <i className='fas fa-plus'></i>
              Assertion
            </button>
            <button onClick={addCallbackHandleClick} className={styles.assertionButton}>
              <i className='fas fa-plus'></i>
              Callback
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default HookUpdates;

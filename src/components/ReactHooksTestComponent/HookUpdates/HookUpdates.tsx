import React, { useContext, useRef, useEffect } from 'react';
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
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { Button } from '@mui/material';
import { HookUpdatesProps } from '../../../utils/hooksTypes';
import { Assertion } from '../../../utils/reactTypes';

const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

type FieldTypes = ('testName' | 'hook' | 'hookParams');

const HookUpdates = ({ hookUpdates, index }: HookUpdatesProps): JSX.Element => {
  const [ { theme } ] = useContext(GlobalContext)
  const [, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);

  const handleChangeHookUpdatesFields = (e: React.ChangeEvent<HTMLInputElement>, field: FieldTypes): void => {
    let updatedHookUpdates = { ...hookUpdates };
    updatedHookUpdates[field] = e.target.value;
    dispatchToHooksTestCase(updateHookUpdates(updatedHookUpdates));
  };

  const handleClickDeleteHookUpdates = (): void => {
    dispatchToHooksTestCase(deleteHookUpdates(hookUpdates.id));
  };

  const addAssertionHandleClick = (): void => {
    dispatchToHooksTestCase(addAssertion(index));
  };
  const addCallbackHandleClick = (): void => {
    dispatchToHooksTestCase(addCallbackFunc(index));
  };

  const testDescription = useRef<HTMLInputElement>(null);

  // useEffect used to focus user to the test description field after creating a new hook test
  useEffect(() => {
    if (testDescription && testDescription.current) {
      testDescription.current.focus();
    }
  }, []);

  return (
        <div
          id={styles[`hooksmodal${theme}`]}
          data-index={index}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteHookUpdates}
          />
          <div id={styles.hookUpdatesHeader}>
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
          {hookUpdates.callbackFunc.map((callbackFunc: Function, i: number) => {
            return (
              <div id={styles.cbFlexBox}>
                <HooksCallback callbackFunc={callbackFunc} index={index} id={i} key={'k' + i} />
              </div>
            );
          })}{' '}
          <div className={styles.buttonsContainer}></div>
          {hookUpdates.assertions.map((assertion: Assertion, i: number) => {
            return <HooksAssertion assertion={assertion} index={index} id={i} key={'k' + i} />;
          })}
          <div className={styles.buttonsContainer} id={styles.stateFlexBox}>
            <Button onClick={addAssertionHandleClick} className={styles.assertionButton} variant='outlined'>
              <i className='fas fa-plus'></i>
              Assertion
            </Button>
            <Button onClick={addCallbackHandleClick} className={styles.assertionButton} variant='outlined'>
              <i className='fas fa-plus'></i>
              Callback
            </Button>
          </div>
        </div>
  );
};

export default HookUpdates;

import React, { useContext } from 'react';
import styles from './ActionCreator.module.scss';
import { ReduxTestCaseContext } from '../../../context/reducers/reduxTestCaseReducer';
import {
  deleteActionCreator,
  updateActionCreator,
} from '../../../context/actions/reduxTestCaseActions';
import { ReduxActionCreator } from '../../../utils/reduxTypes';
const closeIcon = require('../../../assets/images/close.png');

const ActionCreator = (props: ReduxActionCreator): JSX.Element => {
  const { actionCreator, index } = props;
  // let dispatchToReduxTestCase: jest.Mock<any, any, any>;
  const [, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);

  const handleChangeActionCreatorFields = (e: (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)
  , field: ('it' | 'actionCreatorFunc' | 'actionType' | 'payloadKey' | 'payloadType')) => {
    let updatedActionCreator = { ...actionCreator };
    updatedActionCreator[field] = e.target.value;
    dispatchToReduxTestCase(updateActionCreator(updatedActionCreator));
  };

  const handleClickDeleteActionCreator = (e: React.MouseEvent) => {
    dispatchToReduxTestCase(deleteActionCreator(actionCreator.id));
  };

  return (
        <div
          id={styles.actionCreator}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteActionCreator}
          />
          <div id={styles.actionCreatorHeader}>
            <h3>Action Creator</h3>
          </div>

          <div id={styles.filesFlexBox}>
            <div id={styles.files}>
              <label htmlFor='it'>It should...</label>
              <input
                type='text'
                id='it'
                value={actionCreator.it}
                onChange={(e) => handleChangeActionCreatorFields(e, 'it')}
                placeholder='e.g.should return expected action'
              />
            </div>
          </div>

          <div id={styles.actionFlexBox}>
            <div id={styles.actions}>
              <label htmlFor='actionCreatorFunc'>Action Creator</label>
              <input
                type='text'
                id='actionCreatorFunc'
                value={actionCreator.actionCreatorFunc}
                onChange={(e) => handleChangeActionCreatorFields(e, 'actionCreatorFunc')}
                placeholder='e.g. addTodo'
              />
            </div>

            <div id={styles.actions}>
              <label htmlFor='actionType'>Action Type</label>
              <input
                type='text'
                id='actionType'
                value={actionCreator.actionType}
                onChange={(e) => handleChangeActionCreatorFields(e, 'actionType')}
                placeholder='e.g. ADD_TODO'
              />
            </div>
          </div>

          <div id={styles.payloadFlexBox}>
            <div id={styles.payloadKey}>
              <label htmlFor='payloadKey'>Payload Key</label>
              <input
                type='text'
                id='payloadKey'
                value={actionCreator.payloadKey}
                onChange={(e) => handleChangeActionCreatorFields(e, 'payloadKey')}
                placeholder='e.g. todo'
              />
            </div>

            <div id={styles.payloadType}>
              <label htmlFor='payloadType'>Payload Type</label>
              <select
                id='payloadType'
                value={actionCreator.payloadType}
                onChange={(e) => handleChangeActionCreatorFields(e, 'payloadType')}
              >
                <option value='' />
                <option value='word'>word</option>
                <option value='words'>words</option>
                <option value='number'>number</option>
                <option value='arrayElement'>arrayElement</option>
                <option value='objectElement'>objectElement</option>
              </select>
            </div>
          </div>
        </div>
  );
};

export default ActionCreator;

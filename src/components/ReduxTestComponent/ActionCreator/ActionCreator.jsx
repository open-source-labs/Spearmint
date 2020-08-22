import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './ActionCreator.module.scss';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { ReduxTestCaseContext } from '../../../context/reducers/reduxTestCaseReducer';
import {
  deleteActionCreator,
  updateActionCreator,
  updateActionsFilePath,
  updateTypesFilePath,
} from '../../../context/actions/reduxTestCaseActions';
import SearchInput from '../../SearchInput/SearchInput';

const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const ActionCreator = ({ actionCreator, index }) => {
  const [{ filePathMap }] = useContext(GlobalContext);
  const [, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);

  const handleChangeActionCreatorFields = (e, field) => {
    let updatedActionCreator = { ...actionCreator };
    updatedActionCreator[field] = e.target.value;
    dispatchToReduxTestCase(updateActionCreator(updatedActionCreator));
  };

  const handleClickDeleteActionCreator = (e) => {
    dispatchToReduxTestCase(deleteActionCreator(actionCreator.id));
  };

  return (
    <Draggable draggableId={actionCreator.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.actionCreator}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteActionCreator}
          />
          <div id={styles.actionCreatorHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Action Creator</h3>
          </div>

          {/* <div id={styles.filesFlexBox}>
            <div id={styles.files}>
              <label htmlFor='actionsFolder'>Import Actions From</label>
              <SearchInput
                options={Object.keys(filePathMap)}
                dispatch={dispatchToReduxTestCase}
                updateActionsFilePath={updateActionsFilePath}
                id={actionCreator.id}
                filePathMap={filePathMap}
              />
            </div>

            <div id={styles.files}>
              <label htmlFor='typesFolder'>Import Action Types From</label>
              <SearchInput
                options={Object.keys(filePathMap)}
                dispatch={dispatchToReduxTestCase}
                updateTypesFilePath={updateTypesFilePath}
                id={actionCreator.id}
                filePathMap={filePathMap}
              />
            </div>
          </div> */}

          <div id={styles.actionFlexBox}>
            <div id={styles.actions}>
              <label htmlFor='actionCreatorFunc'>Action Creator</label>
              <input
                type='text'
                id='actionCreatorFunc'
                onChange={(e) => handleChangeActionCreatorFields(e, 'actionCreatorFunc')}
                placeholder='e.g. addTodo'
              />
            </div>

            <div id={styles.actions}>
              <label htmlFor='actionType'>Action Type</label>
              <input
                type='text'
                id='actionType'
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
                onChange={(e) => handleChangeActionCreatorFields(e, 'payloadKey')}
                placeholder='e.g. todo'
              />
            </div>

            <div id={styles.payloadType}>
              <label htmlFor='payloadType'>Payload Type</label>
              <select
                id='payloadType'
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
      )}
    </Draggable>
  );
};

export default ActionCreator;

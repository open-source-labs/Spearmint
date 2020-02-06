import React, { useContext } from 'react';
import styles from '../ActionCreator/ActionCreator.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import {
  deleteActionCreator,
  updateActionCreator,
  updateActionsFilePath,
  updateTypesFilePath,
} from '../../../context/reduxTestCaseActions';
import { Draggable } from 'react-beautiful-dnd';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const ActionCreator = ({ actionCreator, index, dispatchToTestCase }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);
  const handleChangeActionCreatorFields = (e, field) => {
    let updatedActionCreator = { ...actionCreator };
    updatedActionCreator[field] = e.target.value;
    dispatchToTestCase(updateActionCreator(updatedActionCreator));
  };

  const handleClickDeleteActionCreator = e => {
    dispatchToTestCase(deleteActionCreator(actionCreator.id));
  };

  const handleChangeActionsFileName = e => {
    const actionsFileName = e.target.value;
    const filePath = filePathMap[actionsFileName] || '';
    dispatchToTestCase(updateActionsFilePath(actionsFileName, filePath));
  };

  const handleChangeTypesFileName = e => {
    const typesFileName = e.target.value;
    const filePath = filePathMap[typesFileName] || '';
    dispatchToTestCase(updateTypesFilePath(typesFileName, filePath));
  };

  return (
    <Draggable draggableId={actionCreator.id.toString()} index={index}>
      {provided => (
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

          <div id={styles.filesFlexBox}>
            <div id={styles.files}>
              <label htmlFor='actionsFolder'>Actions File</label>
              <input
                type='text'
                id='actionsFolder'
                value={actionCreator.actionsFile}
                onChange={handleChangeActionsFileName}
              />
            </div>

            <div id={styles.files}>
              <label htmlFor='typesFolder'>Action Types File</label>
              <input
                type='text'
                id='typesFolder'
                value={actionCreator.typesFile}
                onChange={handleChangeTypesFileName}
              />
            </div>
          </div>

          <div id={styles.actionFlexBox}>
            <div id={styles.actions}>
              <label htmlFor='actionCreatorFunc'>Action Creator</label>
              <input
                type='text'
                id='actionCreatorFunc'
                onChange={e => handleChangeActionCreatorFields(e, 'actionCreatorFunc')}
              />
            </div>

            <div id={styles.actions}>
              <label htmlFor='actionType'>Action Type</label>
              <input
                type='text'
                id='actionType'
                onChange={e => handleChangeActionCreatorFields(e, 'actionType')}
              />
            </div>
          </div>

          <div id={styles.payloadFlexBox}>
            <div id={styles.payloadKey}>
              <label htmlFor='payloadKey'>Payload Key</label>
              <input
                type='text'
                id='payloadKey'
                onChange={e => handleChangeActionCreatorFields(e, 'payloadKey')}
              />
            </div>

            <div id={styles.payloadType}>
              <label htmlFor='payloadType'>Payload Type</label>
              <select
                id='payloadType'
                onChange={e => handleChangeActionCreatorFields(e, 'payloadType')}
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

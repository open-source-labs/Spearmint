import React, { useContext } from 'react';
import styles from '../ActionCreator/ActionCreator.module.scss';
import { deleteActionCreator, updateActionCreator } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const ActionCreator = ({ actionCreator, index, dispatchToTestCase }) => {
  const handleChangeActionCreatorFields = (e, field) => {
    let updatedActionCreator = { ...actionCreator };
    updatedActionCreator[field] = e.target.value;
    dispatchToTestCase(updateActionCreator(updatedActionCreator));
  };

  const handleClickDeleteActionCreator = e => {
    dispatchToTestCase(deleteActionCreator(actionCreator.id));
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
          {/* close icon, handle delete */}
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteActionCreator}
          />

          {/* header / h3 name / drag icon */}
          <div id={styles.actionCreatorHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Action Creator</h3>
          </div>

          <div id={styles.filesFlexBox}>
            {/* event type & autocomplete */}
            <div id={styles.files}>
              <label htmlFor='actionsFolder'>Import Actions File From</label>
              <input
                type='text'
                id='actionsFolder'
                onChange={e => handleChangeActionCreatorFields(e, 'actionsFolder')}
              />
            </div>

            <div id={styles.files}>
              <label htmlFor='typesFolder'>Import Types File From</label>
              <input
                type='text'
                id='typesFolder'
                onChange={e => handleChangeActionCreatorFields(e, 'typesFolder')}
              />
            </div>
          </div>

          <div id={styles.actionFlexBox}>
            {/* event type & autocomplete */}
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

          {/* payload key*/}
          <div id={styles.payloadFlexBox}>
            <div id={styles.payloadKey}>
              <label htmlFor='payloadKey'>Payload Key</label>
              <input
                type='text'
                id='payloadKey'
                onChange={e => handleChangeActionCreatorFields(e, 'payloadKey')}
              />
            </div>

            {/* payload type selector dropdown */}
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

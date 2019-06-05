import React from 'react';
import styles from '../Action/Action.module.scss';
// import { actionState, actionReducer } from './actionReducer';
// import { setEventValue, setQuerySelector, setQueryValue, setQueryVariant } from './actionActions';
import { deleteAction, updateAction } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
import AutoComplete from '../AutoComplete/AutoComplete';

const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');

const Action = ({ action, index, dispatchToTestCase }) => {
  const handleChangeActionFields = (e, field) => {
    let updatedAction = { ...action };
    updatedAction[field] = e.target.value;
    dispatchToTestCase(updateAction(updatedAction));
  };

  const handleClickDeleteAction = e => {
    dispatchToTestCase(deleteAction(action.id));
  };
  //conditional rendering for events with values
  const needsEventValue = eventType => {
    const eventsWithValues = [
      'keyDown',
      'keyPress',
      'keyUp',
      'change',
      'input',
      'invalid',
      'submit',
    ];
    return eventsWithValues.includes(eventType);
  };

  return (
    <Draggable draggableId={action.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.action}
        >
          <div id={styles.actionHeader}>
            <h3>Action</h3>
            <img src={closeIcon} alt='close' onClick={handleClickDeleteAction} />
          </div>
          {/* <div id={styles.actionFlexBox}>
          <div id={styles.eventType}> */}
          <label htmlFor='eventType'>Event Type</label>
          <AutoComplete
            statement={action}
            statementType='action'
            // dispatchToAction={dispatchToAction}
            dispatchToTestCase={dispatchToTestCase}
          />
          {needsEventValue(action.eventType) && (
            <span>
              <label htmlFor='eventValue' />
              <input
                type='text'
                id='eventValue'
                onChange={e => handleChangeActionFields(e, 'eventValue')}
              />
            </span>
          )}
          <label htmlFor='queryVariant'>Query Selector</label>
          <img src={questionIcon} alt='help' title='Please chose the variant' />
          <select id='queryVariant' onChange={e => handleChangeActionFields(e, 'queryVariant')}>
            <option value='' />
            <option value='getBy'>getBy</option>
            <option value='getAllBy'>getAllBy</option>
            <option value='queryBy'>queryBy</option>
            <option value='queryAllBy'>queryAllBy</option>
            <option value='findBy'>findBy</option>
            <option value='findAllBy'>findAllBy</option>
          </select>
          <img src={questionIcon} alt='help' title='Please chose the queries' />
          <select id='querySelector' onChange={e => handleChangeActionFields(e, 'querySelector')}>
            <option value='' />
            <option value='LabelText'>LabelText</option>
            <option value='PlaceholderText'>PlaceholderText</option>
            <option value='ByText'>Text</option>
            <option value='AltText'>AltText</option>
            <option value='Title'>Title</option>
            <option value='DisplayValue'>DisplayValue</option>
            <option value='Role'>Role</option>
            <option value='TestId'>TestId</option>
            {/* TextMatch Precision & Normalization will be added */}
          </select>
          <label htmlFor='queryValue'>Query</label>

          <input
            type='text'
            id='queryValue'
            onChange={e => handleChangeActionFields(e, 'queryValue')}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Action;

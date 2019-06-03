import React, { useReducer } from 'react';
import styles from '../Action/Action.module.scss';
import { actionState, actionReducer } from './actionReducer';
import { setEventValue, setQuerySelector, setQueryValue, setQueryVariant } from './actionActions';
import { deleteAction, updateAction } from '../../../context/testCaseActions';
import AutoComplete from './AutoComplete';
import { Draggable } from 'react-beautiful-dnd';

const minusIcon = require('../../../assets/images/minus-box-outline.png');
const questionIcon = require('../../../assets/images/help-circle.png');

const Action = ({ id, index, dispatchToTestCase }) => {
  const [action, dispatchToAction] = useReducer(actionReducer, actionState);

  const DISPATCH_MAP = {
    eventValue: value => dispatchToAction(setEventValue(value)),
    queryVariant: value => dispatchToAction(setQueryVariant(value)),
    querySelector: value => dispatchToAction(setQuerySelector(value)),
    queryValue: value => dispatchToAction(setQueryValue(value)),
  };

  let newAction = {
    id,
    eventType: action.eventType,
    eventValue: action.eventValue,
    queryVariant: action.queryVariant,
    querySelector: action.querySelector,
    queryValue: action.queryValue,
  };

  const handleChangeActionFields = (e, field) => {
    DISPATCH_MAP[field](e.target.value);
    newAction[field] = e.target.value;
    dispatchToTestCase(updateAction(newAction));
  };

  const handleClickDeleteAction = e => {
    dispatchToTestCase(deleteAction(id));
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
    <Draggable draggableId={id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.action}
        >
          <h3>Action</h3>
          <img src={minusIcon} alt='delete' onClick={handleClickDeleteAction} />
          <label htmlFor='event-type'>Event Type</label>
          <AutoComplete
            action={action}
            dispatchToAction={dispatchToAction}
            dispatchToTestCase={dispatchToTestCase}
          />
          {needsEventValue(action.eventType) && (
            <span>
              <label htmlFor='event-value' />
              <input
                type='text'
                id='event-value'
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

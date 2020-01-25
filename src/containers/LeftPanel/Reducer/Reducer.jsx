import React, { useContext } from 'react';
import styles from '../Reducer/Reducer.module.scss';
import styles2 from '../AutoComplete/AutoCompleteMockData.module.scss';

import { deleteReducer, updateReducer } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
import AutoComplete from '../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';
import ToolTip from '../ToolTip/ToolTip';
import { MockDataContext } from '../../../context/mockDataReducer';
const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const Reducer = ({ reducer, index, dispatchToTestCase }) => {
  //   const [{ mockData }, _] = useContext(MockDataContext);
  const handleChangeReducerFields = (e, field) => {
    let updatedReducer = { ...reducer };
    updatedReducer[field] = e.target.value;
    dispatchToTestCase(updateReducer(updatedReducer));
  };

  const handleClickDeleteReducer = e => {
    dispatchToTestCase(deleteReducer(reducer.id));
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
    <Draggable draggableId={reducer.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.reducer}
        >
          <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteReducer} />
          <div id={styles.reducerHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Reducer</h3>
          </div>
          {/* <div id={styles.eventTypeFlexBox}>
            <div id={styles.eventType}>
              <label htmlFor='eventType'>Event Type</label>

              <AutoComplete
                statement={reducer}
                statementType='reducer'
                dispatchToTestCase={dispatchToTestCase}
                id={styles.autoComplete}
              />
            </div>
            <div id={styles.eventTypeVal}>
              {needsEventValue(reducer.eventType) ? (
                <div className={styles.eventValue}>
                  <label htmlFor='eventValue'> Value </label>
                  {/* <select onChange={e => handleChangeActionFields(e, 'eventValue')}>
                      <option id='eventValue' value='' />
                      {options}
                    </select> */}
          {/* <AutoCompleteMockData
                    statement={reducer}
                    dispatchToTestCase={dispatchToTestCase}
                    statementType='reducer'
                    id={styles2.autoCompleteMockData}
                  /> */}
          {/* </div>
              ) : needsEventValue(reducer.eventType) ? (
                <span className={styles.eventValue}>
                  <label htmlFor='eventValue'> Value </label>
                  <input
                    type='text'
                    id='eventValue'
                    onChange={e => handleChangeReducerFields(e, 'eventValue')}
                  />
                </span>
              ) : null}
            </div> */}
          {/* </div>  */}
          <div id={styles.queryFlexBox}>
            <div id={styles.querySelector}>
              <label htmlFor='queryVariant' className={styles.queryLabel}>
                Query Selector
              </label>
              <div id={styles.dropdownFlex}>
                <select
                  id='queryVariant'
                  onChange={e => handleChangeReducerFields(e, 'queryVariant')}
                >
                  <option value='' />
                  <option value='getBy'>getBy</option>
                  <option value='getAllBy'>getAllBy</option>
                  <option value='queryBy'>queryBy</option>
                  <option value='queryAllBy'>queryAllBy</option>
                  <option value='findBy'>findBy</option>
                  <option value='findAllBy'>findAllBy</option>
                </select>
                <span id={styles.hastooltip} role='tooltip'>
                  <img src={questionIcon} alt='help' />
                  <span id={styles.tooltip}>
                    <ToolTip toolTipType={reducer.queryVariant} />
                  </span>
                </span>

                <select
                  id='querySelector'
                  onChange={e => handleChangeReducerFields(e, 'querySelector')}
                >
                  <option value='' />
                  <option value='LabelText'>LabelText</option>
                  <option value='PlaceholderText'>PlaceholderText</option>
                  <option value='Text'>Text</option>
                  <option value='AltText'>AltText</option>
                  <option value='Title'>Title</option>
                  <option value='DisplayValue'>DisplayValue</option>
                  <option value='Role'>Role</option>
                  <option value='TestId'>TestId</option>
                  {/* TextMatch Precision & Normalization will be added */}
                </select>
                <span id={styles.hastooltip} role='tooltip'>
                  <img src={questionIcon} alt='help' />
                  <span id={styles.tooltip}>
                    <ToolTip toolTipType={reducer.querySelector} />
                  </span>
                </span>
              </div>
            </div>
            <div id={styles.query}>
              <label htmlFor='queryValue' className={styles.queryLabel}>
                Query
              </label>

              <input
                type='text'
                id='queryValue'
                onChange={e => handleChangeReducerFields(e, 'queryValue')}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Reducer;

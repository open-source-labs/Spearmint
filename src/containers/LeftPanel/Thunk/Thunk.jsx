// component to be rendered in the electron app

// Code copied from Actions.jsx

import React, { useContext } from 'react';
import styles from '../Thunk/Thunk.module.scss';
import styles2 from '../AutoComplete/AutoCompleteMockData.module.scss';
import { deleteAsync, updateAsync } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
import AutoComplete from '../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';
import ToolTip from '../ToolTip/ToolTip';
import { MockDataContext } from '../../../context/mockDataReducer';
// import LastAssertion from './LastAssertion';
const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');


// const Async = ({ async, index, dispatchToTestCase }) => {
//   return (
//     <Draggable draggableId={async.id.toString()} index={index}>
//       {provided => (
//         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//           {/* <LastAssertion async={async} dispatchToTestCase={dispatchToTestCase} /> */}
//         </div>
//       )}
//     </Draggable>
//   );
// };

const Async = ({ async, index, dispatchToTestCase }) => {
  console.log('This is Async -> ', async)
  const [{ mockData }, _] = useContext(MockDataContext);
  const handleChangeAsyncFields = (e, field) => {
    let updatedAsync = { ...async };
    updatedAsync[field] = e.target.value;
    dispatchToTestCase(updateAsync(updatedAsync));
  };

  const handleClickDeleteAsync = e => {
    dispatchToTestCase(deleteAsync(async.id));
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

  // const dropDownMockOptions = [];
  // mockData.forEach(mockDatum => {
  //   mockDatum.fieldKeys.forEach(key => {
  //     dropDownMockOptions.push(`mock${mockDatum.name}.${key.fieldKey}`);
  //   });
  //   dropDownMockOptions.push(`[mock${mockDatum.name}]`);
  //   dropDownMockOptions.push(`{mock${mockDatum.name}}`);
  // });

  // let options = dropDownMockOptions.map(option => {
  //   return (
  //     <option id='eventValue' value={option}>
  //       {option}
  //     </option>
  //   );
  // });

  return (
    <Draggable draggableId={async.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.action}
        >
          <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteAsync} />
          <div id={styles.actionHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Async</h3>
          </div>
          {/* <div id={styles.eventTypeFlexBox}>
            <div id={styles.eventType}>
              <label htmlFor='eventType'>Event Type</label>

              <AutoComplete
                statement={async}
                statementType='async'
                dispatchToTestCase={dispatchToTestCase}
                id={styles.autoComplete}
              />
            </div> */}
          {/* <div id={styles.eventTypeVal}>
              {needsEventValue(async.eventType) && mockData.length > 0 ? (
                <div className={styles.eventValue}>
                  <label htmlFor='eventValue'> Value </label> */}
          {/* <select onChange={e => handleChangeActionFields(e, 'eventValue')}>
                  <option id='eventValue' value='' />
                  {options}
                </select> */}
          {/* <AutoCompleteMockData
                    statement={async}
                    dispatchToTestCase={dispatchToTestCase}
                    statementType='async'
                    id={styles2.autoCompleteMockData}
                  />
                </div> */}
          {/* ) : needsEventValue(async.eventType) ? (
                <span className={styles.eventValue}>
                  <label htmlFor='eventValue'> Value </label>
                  <input
                    type='text'
                    id='eventValue'
                    onChange={e => handleChangeAsyncFields(e, 'eventValue')}
                  />
                </span>
              ) : null}
            </div>
          </div> */}
          <div id={styles.queryFlexBox}>
            <div id={styles.querySelector}>
              <label htmlFor='queryVariant' className={styles.queryLabel}>
                Query Selector
              </label>
              <div id={styles.dropdownFlex}>
                <select
                  id='queryVariant'
                  onChange={e => handleChangeAsyncFields(e, 'queryVariant')}
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
                    <ToolTip toolTipType={async.queryVariant} />
                  </span>
                </span>

                <select
                  id='querySelector'
                  onChange={e => handleChangeAsyncFields(e, 'querySelector')}
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
                    <ToolTip toolTipType={async.querySelector} />
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
                onChange={e => handleChangeAsyncFields(e, 'queryValue')}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Async;

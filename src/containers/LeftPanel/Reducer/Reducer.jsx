import React, { useContext, Fragment } from 'react';
import styles from '../Reducer/Reducer.module.scss';
// import styles2 from '../AutoComplete/Au toCompleteMockData.module.scss';
import { deleteReducer, updateReducer } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
import AutoComplete from '../AutoComplete/AutoComplete';
// import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';
import ToolTip from '../ToolTip/ToolTip';
// import { MockDataContext } from '../../../context/mockDataReducer';
const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const Reducer = ({ reducer, index, dispatchToTestCase }) => {
  const handleChangeReducerFields = (e, field) => {
    let updatedReducer = { ...reducer };
    updatedReducer[field] = e.target.value;
    dispatchToTestCase(updateReducer(updatedReducer));
  };

  const handleClickDeleteReducer = e => {
    dispatchToTestCase(deleteReducer(reducer.id));
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

          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='queryValue'>Reducer Name</label>
              <input type='text' id='queryValue' onChange={e => handleChangeReducerFields(e, 'queryValue')} />
            </div>
          </div>

          <div id={styles.queryFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='querySelector'>Initial State</label>
              <input type='text' id='querySelector' onChange={e => handleChangeReducerFields(e, 'querySelector')} />
            </div>
          </div>

          <div id={styles.queryFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='queryVariant'>Action</label>
              <input type='text' id='queryVariant' onChange={e => handleChangeReducerFields(e, 'queryVariant')} />
            </div>
          </div>

          <div id={styles.queryFlexBox}></div>
          <div id={styles.reducerName}>
            <label htmlFor='matcherValue' className={styles.queryLabel}>
              Updated State
            </label>
            {/* <AutoComplete
              statement={reducer}
              statementType='reducer'
              dispatchToTestCase={dispatchToTestCase}
              id={styles.autoComplete}
            /> */}
            <input type='text' id='matcherValue' onChange={e => handleChangeReducerFields(e, 'matcherValue')} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Reducer;

import React, { useContext, Fragment } from 'react';
import styles from '../Reducer/Reducer.module.scss';
// import styles2 from '../AutoComplete/Au toCompleteMockData.module.scss';
import { deleteReducer, updateReducer } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
// import AutoComplete from '../AutoComplete/AutoComplete';
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
              <label htmlFor='reducerName'>Reducer Name</label>
              <input type='text' id='reducerName' />
            </div>
          </div>

          <div id={styles.queryFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='initialState'>Initial State</label>
              <input type='text' id='initialState' />
            </div>
          </div>

          <div id={styles.queryFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='action'>Action</label>
              <input type='text' id='action' />
            </div>
          </div>

          <div id={styles.queryFlexBox}></div>
          <div id={styles.reducerName}>
            <label htmlFor='updatedState' className={styles.queryLabel}>
              Updated State
            </label>
            <input type='text' id='updatedState' />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Reducer;

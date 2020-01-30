import React, { useContext, Fragment } from 'react';
import styles from '../Reducer/Reducer.module.scss';
import { deleteReducer, updateReducer } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
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
              <input type='text' id='reducerName' onChange={e => handleChangeReducerFields(e, 'reducerName')} />
            </div>
          </div>

          <div id={styles.queryFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='initialState'>Initial State</label>
              <input type='text' id='initialState' onChange={e => handleChangeReducerFields(e, 'initialState')} />
            </div>
          </div>

          <div id={styles.queryFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='actionType'>Action Type</label>
              <input type='text' id='actionType' onChange={e => handleChangeReducerFields(e, 'actionType')} />
            </div>
          </div>

          <div id={styles.queryFlexBox}></div>
          <div id={styles.reducerName}>
            <label htmlFor='updatedState' className={styles.queryLabel}>
              Updated State
            </label>
            {/* <AutoComplete
              statement={reducer}
              statementType='reducer'
              dispatchToTestCase={dispatchToTestCase}
              id={styles.autoComplete}
            /> */}
            <input type='text' id='updatedState' onChange={e => handleChangeReducerFields(e, 'updatedState')} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Reducer;

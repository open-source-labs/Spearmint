import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './Reducer.module.scss';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { ReduxTestCaseContext } from '../../../context/reducers/reduxTestCaseReducer';
import {
  deleteReducer,
  updateReducer,
  updateTypesFilePath,
  updateReducersFilePath,
} from '../../../context/actions/reduxTestCaseActions';
import SearchInput from '../../SearchInput/SearchInput';

const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const Reducer = ({ reducer, index }) => {
  const [{ filePathMap }] = useContext(GlobalContext);
  const [, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);

  const handleChangeReducerFields = (e, field) => {
    let updatedReducer = { ...reducer };
    updatedReducer[field] = e.target.value;
    dispatchToReduxTestCase(updateReducer(updatedReducer));
  };

  const handleClickDeleteReducer = (e) => {
    dispatchToReduxTestCase(deleteReducer(reducer.id));
  };

  return (
    <Draggable draggableId={reducer.id.toString()} index={index}>
      {(provided) => (
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

          {/* <div id={styles.reducerNameFlexBox}> */}
          {/* <div id={styles.reducerName}>
              <label htmlFor='typesFile'>Import Reducer From</label>
              <SearchInput
                options={Object.keys(filePathMap)}
                dispatch={dispatchToReduxTestCase}
                action={updateReducersFilePath}
                filePathMap={filePathMap}
              />
            </div> */}
          {/* <div id={styles.reducerName}>
              <label htmlFor='typesFile'>Import Action Types From</label>
              <SearchInput
                options={Object.keys(filePathMap)}
                dispatch={dispatchToReduxTestCase}
                filePathMap={filePathMap}
                updateTypesFilePath={updateTypesFilePath}
                id={reducer.id}
              />
            </div> */}
          {/* </div> */}
          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='reducerName'>Reducer Name</label>
              <input
                type='text'
                id='reducerName'
                placeholder='eg. todoReducer'
                onChange={(e) => handleChangeReducerFields(e, 'reducerName')}
              />
            </div>

            <div id={styles.reducerName}>
              <label htmlFor='initialState'>Initial State</label>
              <input
                type='text'
                id='initialState'
                placeholder='eg. { key: value }'
                onChange={(e) => handleChangeReducerFields(e, 'initialState')}
              />
            </div>
          </div>

          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='reducerAction'>Action</label>
              <input
                type='text'
                id='reducerAction'
                placeholder='eg. type: types.ADD_TASK'
                onChange={(e) => handleChangeReducerFields(e, 'reducerAction')}
              />
            </div>

            <div id={styles.reducerName}>
              <label htmlFor='expectedState'>Updated State</label>
              <input
                type='text'
                placeholder='eg. { key: updated-value }'
                id='expectedState'
                onChange={(e) => handleChangeReducerFields(e, 'expectedState')}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Reducer;

import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './Reducer.module.scss';
import { ReduxTestCaseContext } from '../../../context/reducers/reduxTestCaseReducer';
import { deleteReducer, updateReducer } from '../../../context/actions/reduxTestCaseActions';
import { updateHooksTestStatement } from '../../../context/actions/hooksTestCaseActions';

const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const Reducer = ({ reducer, index }) => {
  const [, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);

  const handleChangeReducerFields = (e, field) => {
    // reducer is a single test statment
    let updatedReducer = { ...reducer };
    // adding key/value pair to test statement
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

          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='testStatement'>It Statement</label>
              <input
                type='text'
                id='testStatment'
                placeholder='eg. handles ADD_TODO action properly'
                onChange={(e) => handleChangeReducerFields(e, 'itStatement')}
              />
            </div>
            <div id={styles.reducerName}>
              <label htmlFor='reducerName'>Reducer Name</label>
              <input
                type='text'
                id='reducerName'
                placeholder='eg. todoReducer'
                onChange={(e) => handleChangeReducerFields(e, 'reducerName')}
              />
            </div>
          </div>
          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='initialStae'>Initial State</label>
              <input
                type='text'
                id='initialState'
                placeholder='eg. todosState'
                onChange={(e) => handleChangeReducerFields(e, 'initialState')}
              />
            </div>
            <div id={styles.reducerName}>
              <label htmlFor='reducerAction'>Action</label>
              <input
                type='text'
                id='reducerAction'
                placeholder='eg ADD_TODO'
                onChange={(e) => handleChangeReducerFields(e, 'reducerAction')}
              />
            </div>
          </div>
          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='initialState'>Payload (optional. if action requires)</label>
              <input
                type='text'
                id='payloadKey'
                placeholder='Key'
                onChange={(e) => handleChangeReducerFields(e, 'payloadKey')}
              />
              <input
                type='text'
                id='payloadValue'
                placeholder='Value'
                onChange={(e) => handleChangeReducerFields(e, 'payloadValue')}
              />
            </div>
            <div id={styles.reducerName}>
              <label htmlFor='expectedState'>Expected State</label>
              <input
                type='text'
                placeholder='Key'
                id='expectedKey'
                onChange={(e) => handleChangeReducerFields(e, 'expectedKey')}
              />
              <input
                type='text'
                placeholder='Value'
                id='expectedValue'
                onChange={(e) => handleChangeReducerFields(e, 'expectedValue')}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Reducer;

{
  /* <div id={styles.reducerNameFlexBox}> */
}
{
  /* <div id={styles.reducerName}>
              <label htmlFor='typesFile'>Import Reducer From</label>
              <SearchInput
                options={Object.keys(filePathMap)}
                dispatch={dispatchToReduxTestCase}
                action={updateReducersFilePath}
                filePathMap={filePathMap}
              />
            </div> */
}
{
  /* <div id={styles.reducerName}>
              <label htmlFor='typesFile'>Import Action Types From</label>
              <SearchInput
                options={Object.keys(filePathMap)}
                dispatch={dispatchToReduxTestCase}
                filePathMap={filePathMap}
                updateTypesFilePath={updateTypesFilePath}
                id={reducer.id}
              />
            </div> */
}
{
  /* </div> */
}

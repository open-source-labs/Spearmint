import React, { useContext } from 'react';
import styles from './Reducer.module.scss';
import { ReduxTestCaseContext } from '../../../context/reducers/reduxTestCaseReducer';
import { deleteReducer, updateReducer } from '../../../context/actions/reduxTestCaseActions';
import { ReduxStatements } from '../../../utils/reduxTypes';

const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

interface ReducerType {
  reducer: {
    id: number;
    itStatement: string,
    reducerName: string,
    initialState: string,
    reducerAction: string,
    payloadKey: string,
    payloadValue: string,
    expectedKey: string,
    expectedValue: string,
  },
  index: number,
}

type FieldTypes = (
   'itStatement'
   | 'reducerName'
   | 'initialState'
   | 'reducerAction'
   | 'payloadKey'
   | 'payloadValue'
   | 'expectedKey'
   | 'expectedValue'
)



const Reducer = ({ reducer, index }: ReducerType) => {
  const [, dispatchToReduxTestCase]: (Function)[] = useContext(ReduxTestCaseContext);

  const handleChangeReducerFields = (e: React.ChangeEvent<HTMLInputElement>, field: FieldTypes) => {
    // reducer is a single test statment
    let updatedReducer = { ...reducer };
    // adding key/value pair to test statement
    updatedReducer[field] = e.target.value;

    dispatchToReduxTestCase(updateReducer(updatedReducer));
  };

  const handleClickDeleteReducer = () => {
    dispatchToReduxTestCase(deleteReducer(reducer.id));
  };

  return (
        <div
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
                id='testStatement'
                value={reducer.itStatement}
                placeholder='e.g. handles ADD_TODO action properly'
                onChange={(e) => handleChangeReducerFields(e, 'itStatement')}
              />
            </div>
            <div id={styles.reducerName}>
              <label htmlFor='reducerName'>Reducer Name</label>
              <input
                type='text'
                id='reducerName'
                value={reducer.reducerName}
                placeholder='e.g. todoReducer'
                onChange={(e) => handleChangeReducerFields(e, 'reducerName')}
              />
            </div>
          </div>
          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='initialState'>Initial State</label>
              <input
                type='text'
                id='initialState'
                value={reducer.initialState}
                placeholder='e.g. todosState'
                onChange={(e) => handleChangeReducerFields(e, 'initialState')}
              />
            </div>
            <div id={styles.reducerName}>
              <label htmlFor='reducerAction'>Action</label>
              <input
                type='text'
                id='reducerAction'
                value={reducer.reducerAction}
                placeholder='e.g. ADD_TODO'
                onChange={(e) => handleChangeReducerFields(e, 'reducerAction')}
              />
            </div>
          </div>
          <div id={styles.reducerNameFlexBox}>
            <div id={styles.reducerName}>
              <label htmlFor='payload'>Payload (optional. if action requires)</label>
              <input
                type='text'
                id='payloadKey'
                value={reducer.payloadKey}
                placeholder='Key'
                onChange={(e) => handleChangeReducerFields(e, 'payloadKey')}
              />
              <input
                type='text'
                id='payloadValue'
                value={reducer.payloadValue}
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
                value={reducer.expectedKey}
                onChange={(e) => handleChangeReducerFields(e, 'expectedKey')}
              />
              <input
                type='text'
                placeholder='Value'
                id='expectedValue'
                value={reducer.expectedValue}
                onChange={(e) => handleChangeReducerFields(e, 'expectedValue')}
              />
            </div>
          </div>
        </div>
  );
};

export default Reducer;

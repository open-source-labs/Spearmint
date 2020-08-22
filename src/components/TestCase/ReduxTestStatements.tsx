import React, { useContext } from 'react';
import Middleware from '../ReduxTestComponent/Middleware/Middleware';
import ActionCreator from '../ReduxTestComponent/ActionCreator/ActionCreator';
import Async from '../ReduxTestComponent/Thunk/Thunk';
import Reducer from '../ReduxTestComponent/Reducer/Reducer';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import { ReduxStatements } from '../../utils/reduxTypes';

const ReduxTestStatements = () => {
  /* destructing from the reducer */
  const [{ reduxStatements }] = useContext(ReduxTestCaseContext);

  return (
    <>
      {reduxStatements.map((statement: ReduxStatements, i: number) => {
        switch (statement.type) {
          case 'middleware':
            return <Middleware key={statement.id} middleware={statement} index={i} />;
          case 'action-creator':
            return <ActionCreator key={statement.id} actionCreator={statement} index={i} />;
          case 'async':
            return <Async key={statement.id} async={statement} index={i} />;
          case 'reducer':
            if (i < 1) {
              return (
                <>
                  <label key={i}>Initial State</label>
                  <input placeholder='import state' />
                </>
              );
            } else {
              return <Reducer key={statement.id} reducer={statement} index={i} />;
            }
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default ReduxTestStatements;

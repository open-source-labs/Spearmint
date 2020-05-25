import React from 'react';
import Middleware from '../Middleware/Middleware';
import ActionCreator from '../ActionCreator/ActionCreator';
import Async from '../Thunk/Thunk';
import Reducer from '../Reducer/Reducer';
import { ReduxStatements } from '../../utils/reduxTypes';

interface ReduxTestStatementsProps {
  reduxStatements: ReduxStatements[];
  dispatchToReduxTestCase: (action: object) => void;
}

const ReduxTestStatements = function TestStatements({ reduxStatements, dispatchToReduxTestCase }: ReduxTestStatementsProps) {
  /* destructing from the reducer */
  return (
    <>
    {
      reduxStatements.map((statement, i) => {
        switch (statement.type) {
          case 'middleware':
            return (
              <Middleware
                key={statement.id}
                middleware={statement}
                index={i}
                dispatchToReduxTestCase={dispatchToReduxTestCase}
              />
            );
          case 'action-creator':
            return (
              <ActionCreator
                key={statement.id}
                actionCreator={statement}
                index={i}
                dispatchToReduxTestCase={dispatchToReduxTestCase}
              />
            );
          case 'async':
            return (
              <Async
                key={statement.id}
                async={statement}
                index={i}
                dispatchToReduxTestCase={dispatchToReduxTestCase}
              />
            );
          case 'reducer':
            return (
              <Reducer
                key={statement.id}
                reducer={statement}
                index={i}
                dispatchToReduxTestCase={dispatchToReduxTestCase}
              />
            );
          default:
            return <></>;
        }
      })
    }
    </>
  )
};

export default ReduxTestStatements;

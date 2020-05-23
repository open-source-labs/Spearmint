import React from 'react';
import Middleware from '../Middleware/Middleware';
import ActionCreator from '../ActionCreator/ActionCreator';
import Async from '../Thunk/Thunk';
import Reducer from '../Reducer/Reducer';
import { ReduxStatements } from '../../context/reduxTypes/reduxTypes';

interface ReduxTestStatementsProps {
  reduxStatements: ReduxStatements[];
  dispatchToReduxTestCase: () => void;
}

const ReduxTestStatements = function TestStatements({ reduxStatements, dispatchToReduxTestCase }: ReduxTestStatementsProps) {
  /* destructing from the reducer */
  const renderStatements = () => {
    return reduxStatements.map((statement, i) => {
      switch (statement.type) {
        case 'middleware':
          return (
            <>
            <Middleware
              key={statement.id}
              middleware={statement}
              index={i}
              dispatchToReduxTestCase={dispatchToReduxTestCase}
            />
            </>
          );
        case 'action-creator':
          return (
            <>
            <ActionCreator
              key={statement.id}
              actionCreator={statement}
              index={i}
              dispatchToReduxTestCase={dispatchToReduxTestCase}
            />
            </>
          );
        case 'async':
          return (
            <>
            <Async
              key={statement.id}
              async={statement}
              index={i}
              dispatchToReduxTestCase={dispatchToReduxTestCase}
            />
            </>
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
    });
  }
  
 return (
   <div>
     {renderStatements()}
   </div>
 )
};

export default ReduxTestStatements;

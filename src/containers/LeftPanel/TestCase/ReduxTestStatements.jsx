import React from 'react';
import Middleware from '../Middleware/Middleware';
import ActionCreator from '../ActionCreator/ActionCreator';
import Async from '../Thunk/Thunk';
import Reducer from '../Reducer/Reducer';

const ReduxTestStatements = function TestStatements({ reduxStatements, dispatchToReduxTestCase }) {
  /* destructing from the reducer */
  return reduxStatements.map((statement, i) => {
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
            dispatchToTestCase={dispatchToReduxTestCase}
          />
        );
      case 'async':
        return (
          <Async
            key={statement.id}
            async={statement}
            index={i}
            dispatchToTestCase={dispatchToReduxTestCase}
          />
        );
      case 'reducer':
        return (
          <Reducer
            key={statement.id}
            reducer={statement}
            index={i}
            dispatchToTestCase={dispatchToReduxTestCase}
          />
        );
      default:
        return <></>;
    }
  });
};

export default ReduxTestStatements;

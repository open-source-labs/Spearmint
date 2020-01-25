import React from 'react';
import Action from '../Action/Action';
import Assertion from '../Assertion/Assertion';
import Rerender from '../Render/Rerender';

// imported reducer
import Reducer from '../Reducer/Reducer';

const TestStatements = function TestStatements({ statements, dispatchToTestCase }) {
  return statements.map((statement, i) => {
    switch (statement.type) {
      case 'action':
        return (
          <Action
            key={statement.id}
            action={statement}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      case 'assertion':
        return (
          <Assertion
            key={statement.id}
            assertion={statement}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      // reducer
      case 'reducer':
        return (
          <Reducer
            key={statement.id}
            reducer={statement}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      case 'render':
        return <Rerender key={statement.id} render={statement} index={i} />;
      default:
        return <></>;
    }
  });
};

export default TestStatements;

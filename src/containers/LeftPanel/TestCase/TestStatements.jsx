import React from 'react';
import Action from '../Action/Action';
import Assertion from '../Assertion/Assertion';
import Rerender from '../Render/Rerender';

const TestStatements = function TestStatements({ statements, dispatchToTestCase }) {
  return statements.map((statement, i) => {
    switch (statement.type) {
      case 'action':
        return (
          <Action
            key={statement.id}
            id={statement.id}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      case 'assertion':
        return (
          <Assertion
            key={statement.id}
            id={statement.id}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      case 'render':
        return (
          <Rerender
            key={statement.id}
            id={statement.id}
            index={i}
            type={statement.type}
            props={statement.props}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      default:
        return <></>;
    }
  });
};

export default TestStatements;

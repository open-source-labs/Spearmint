import React from 'react';
import Action from '../Action/Action';
import Assertion from '../Assertion/Assertion';
import Render from '../Render/Render';

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
          <Render
            key={statement.id}
            id={statement.id}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
            props={statement.props}
            reRender={statement.reRender}
          />
        );
      default:
        return;
    }
  });
};

export default TestStatements;

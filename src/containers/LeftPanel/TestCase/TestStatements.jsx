/**
 * the boxes where you fill out info for assertion , render, and action
 */

import React from 'react';
import Action from '../Action/Action';
import Assertion from '../Assertion/Assertion';
import Rerender from '../Render/Rerender';
import Middleware from '../Middleware/Middleware';

const TestStatements = function TestStatements({ statements, dispatchToTestCase }) {  /* destructing from the reducer */
  return statements.map((statement, i) => {
    switch (statement.type) {
      case 'middleware':
        return (
          <Middleware
            key={statement.id}
            middleware={statement}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
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
      case 'render':
        return <Rerender key={statement.id} render={statement} index={i} />;
      default:
        return <></>;
    }
  });
};

export default TestStatements;

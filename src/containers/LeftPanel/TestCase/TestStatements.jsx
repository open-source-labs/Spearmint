/**
 * the boxes where you fill out info for assertion , render, and action
 */

import React from 'react';
import Action from '../Action/Action';
import Assertion from '../Assertion/Assertion';
import Rerender from '../Render/Rerender';
import Middleware from '../Middleware/Middleware';
import ActionCreator from '../ActionCreator/ActionCreator';
import Async from '../Thunk/Thunk';
import Reducer from '../Reducer/Reducer';
import HookUpdates from '../HookUpdates/HookUpdates';

const TestStatements = function TestStatements({ statements, dispatchToTestCase }) {
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
      case 'async':
        return (
          <Async
            key={statement.id}
            async={statement}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      case 'render':
        return <Rerender key={statement.id} render={statement} index={i} />;
      case 'action-creator':
        return (
          <ActionCreator
            key={statement.id}
            actionCreator={statement}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      case 'hook-updates':
        return (
          <HookUpdates
            key={statement.id}
            hookUpdates={statement}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      default:
        return <></>;
    }
  });
};

export default TestStatements;

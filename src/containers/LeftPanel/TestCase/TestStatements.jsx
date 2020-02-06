import React from 'react';
import Action from '../Action/Action';
import Assertion from '../Assertion/Assertion';
import Rerender from '../Render/Rerender';
import Context from '../Context/Context';
import HookRender from '../HookRender/HookRender';
import HookUpdates from '../HookUpdates/HookUpdates';

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

      case 'render':
        return <Rerender key={statement.id} render={statement} index={i} />;

      case 'context':
        return (
          <Context
            key={statement.id}
            context={statement}
            index={i}
            dispatchToTestCase={dispatchToTestCase}
          />
        );
      case 'hookRender':
        return (
          <HookRender
            key={statement.id}
            hookRender={statement}
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

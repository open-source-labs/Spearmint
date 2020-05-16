import React from 'react';
import Context from '../Context/Context';
import HookUpdates from '../HookUpdates/HookUpdates';
import HookRender from '../HookRender/HookRender';

const HooksTestStatements = function TestStatements({ hooksStatements, dispatchToHooksTestCase }) {
  return hooksStatements.map((statement, i) => {
    switch (statement.type) {
      case 'context':
        return (
          <Context
            key={statement.id}
            context={statement}
            index={i}
            dispatchToHooksTestCase={dispatchToHooksTestCase}
          />
        );
      case 'hook-updates':
        return (
          <HookUpdates
            key={statement.id}
            hookUpdates={statement}
            index={i}
            dispatchToHooksTestCase={dispatchToHooksTestCase}
          />
        );
      case 'hookRender':
        return (
          <HookRender
            key={statement.id}
            hookRender={statement}
            index={i}
            dispatchToHooksTestCase={dispatchToHooksTestCase}
          />
        );
      default:
        return <></>;
    }
  });
};

export default HooksTestStatements;

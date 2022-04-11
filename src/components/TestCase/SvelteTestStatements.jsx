import React from 'react';
import Action from '../SvelteTestComponent/Action/Action';
import Assertion from '../SvelteTestComponent/Assertion/Assertion';
import Render from '../SvelteTestComponent/Render/Render';

const SvelteTestStatements = ({ statements, itId, describeId }) => {

  // filter out ids not belonging to the correct describe block and itStatement
  const filterStatements = statements.allIds.filter((id) => {
    return statements.byId[id].describeId === describeId && statements.byId[id].itId === itId;
  });

  return filterStatements.map((id, i) => {
    switch (statements.byId[id].type) {
      case 'action':
        return (
          <Action
            key={`action-${id}-${i}`}
            statementId={id}
            describeId={describeId}
            itId={itId}
            statement={statements.byId[id]}
          />
        );
      case 'assertion':
        return (
          <Assertion
            key={`assertion-${id}-${i}`}
            statementId={id}
            describeId={describeId}
            itId={itId}
            statement={statements.byId[id]}
          />
        );
      case 'render':
        return (
          <Render
            key={`render-${id}-${i}`}
            statementId={id}
            describeId={describeId}
            itId={itId}
            statement={statements.byId[id]}
          />
        );
      default:
        return <></>;
    }
  });
};


export default SvelteTestStatements;
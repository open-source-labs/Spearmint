import React from 'react';
// import Action from '../Action/Action';
// import Assertion from '../Assertion/Assertion';
// import Rerender from '../Render/Rerender';
import Middleware from '../Middleware/Middleware';

const ReduxTestStatements = function TestStatements({ reduxStatements, dispatchToReduxTestCase }) {  /* destructing from the reducer */
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
        default:
            return <></>;
        }
     });

};

export default ReduxTestStatements;

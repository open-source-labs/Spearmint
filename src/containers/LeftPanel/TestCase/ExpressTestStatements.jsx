import React from 'react';
/* 
Add imports here. Ex: 
import Middleware from '../Middleware/Middleware'
*/;

const ExpressTestStatements = function expressTestStatements({ expressStatements, dispatchToexpressTestCase }) { 
    return expressStatements.map((statement, i) => {
        switch (statement.type) {
          /* add statements here. Ex: */
          /*case 'middleware':
            return (
              <Middleware
                key={statement.id}
                middleware={statement}
                index={i}
                dispatchToexpressTestCase={dispatchToexpressTestCase}
              />
            );*/
        default:
            return <></>;
        }
     });

};

export default ExpressTestStatements;
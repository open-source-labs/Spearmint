import React from 'react';
/* 
Add imports here. Ex: 
import Middleware from '../Middleware/Middleware'
*/;

const EndpointTestStatements = function endpointTestStatements({ endpointStatements, dispatchToendpointTestCase }) { 
    return endpointStatements.map((statement, i) => {
        switch (statement.type) {
          /* add statements here. Ex: */
          /*case 'middleware':
            return (
              <Middleware
                key={statement.id}
                middleware={statement}
                index={i}
                dispatchToendpointTestCase={dispatchToendpointTestCase}
              />
            );*/
        default:
            return <></>;
        }
     });

};

export default EndpointTestStatements;
import React from 'react';
import Endpoint from '../Endpoint/Endpoint';
import { EndpointTestStatementsProps } from '../../utils/endpointTypes';

const EndpointTestStatements = ({
  endpointStatements,
  dispatchToEndpointTestCase,
}: EndpointTestStatementsProps) => {
  return (
    <>
      {endpointStatements.map((statement, i) => {
        switch (statement.type) {
          /* add statements here. Ex: */
          case 'endpoint':
            return (
              <Endpoint
                key={statement.id}
                endpoint={statement}
                index={i}
                dispatchToEndpointTestCase={dispatchToEndpointTestCase}
              />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default EndpointTestStatements;

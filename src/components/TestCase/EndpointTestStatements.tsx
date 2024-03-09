import React, { useContext } from 'react';
import Endpoint from '../EndpointTestComponent/Endpoint';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import { EndpointObj } from '../../utils/endpointTypes';

const EndpointTestStatements = () => {
  const [{ endpointStatements }, dispatch] = useContext(EndpointTestCaseContext);

  return (
    <>
      {endpointStatements.map((statement: EndpointObj, i: number) => {
        switch (statement.type) {
          /* add statements here. Ex: */
          case 'endpoint':
            return (
              <Endpoint
                key={statement.id}
                endpoint={statement}
                index={i}
                dispatchToEndpointTestCase={dispatch}
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

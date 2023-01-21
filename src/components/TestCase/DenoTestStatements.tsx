import React, { useContext } from 'react';
import Deno from '../DenoTestComponent/Deno';
import { DenoTestCaseContext } from '../../context/reducers/denoTestCaseReducer';
import { DenoObj } from '../../utils/denoTypes';

const DenoTestStatements = () => {
  const [{ denoStatements }, dispatchToDenoTestCase] = useContext<any>(DenoTestCaseContext);

  return (
    <>
      {denoStatements.map((statement: DenoObj, i: number) => {
        switch (statement.type) {
          /* add statements here. Ex: */
          case 'endpoint':
            return (
              <Deno
                key={statement.id}
                endpoint={statement}
                index={i}
                dispatchToDenoTestCase={dispatchToDenoTestCase}
              />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default DenoTestStatements;

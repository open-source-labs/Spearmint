import React, { useContext } from 'react';
import Context from '../ReactHooksTestComponent/Context/Context';
import HookUpdates from '../ReactHooksTestComponent/HookUpdates/HookUpdates';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { HooksStatements } from '../../utils/hooksTypes';

const HooksTestStatements = () => {
  const [{ hooksStatements }] = useContext(HooksTestCaseContext);
  console.log(hooksStatements);
  return (
    <>
      {hooksStatements.map((statement: HooksStatements, i: number) => {
        switch (statement.type) {
          case 'context':
            return <Context key={statement.id} context={statement} index={i} />;
          case 'hook-updates':
            return <HookUpdates key={statement.id} hookUpdates={statement} index={i} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default HooksTestStatements;

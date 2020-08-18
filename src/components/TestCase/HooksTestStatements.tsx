import React, { useContext } from 'react';
import Context from '../ReactHooksTestComponent/Context/Context';
import HookUpdates from '../ReactHooksTestComponent/HookUpdates/HookUpdates';
import HookRender from '../ReactHooksTestComponent/HookRender/HookRender';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { HooksStatements } from '../../utils/hooksTypes';

const HooksTestStatements = () => {
  const [{ hooksStatements }] = useContext(HooksTestCaseContext);

  return (
    <>
      {hooksStatements.map((statement: HooksStatements, i: number) => {
        switch (statement.type) {
          case 'context':
            return <Context key={statement.id} context={statement} index={i} />;
          case 'hook-updates':
            return <HookUpdates key={statement.id} hookUpdates={statement} index={i} />;
          case 'hookRender':
            return <HookRender key={statement.id} hookRender={statement} index={i} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default HooksTestStatements;

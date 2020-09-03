import React, { useContext } from 'react';
import Context from '../ReactHooksTestComponent/Context/Context';
import HookUpdates from '../ReactHooksTestComponent/HookUpdates/HookUpdates';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { HooksStatements } from '../../utils/hooksTypes';
import importOptionsSwitch from './importOptions';
import SearchInput from '../SearchInput/SearchInput';
import { updateHooksFilePath } from '../../context/actions/hooksTestCaseActions';
import '../SearchInput/SearchInput.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';

const HooksTestStatements = () => {
  const [{ hooksStatements }, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  const { isHooksOn } = importOptionsSwitch(hooksStatements);
  const [{ filePathMap }] = useContext<any>(GlobalContext);

  let hImports = null;
  if (isHooksOn) {
    hImports = (
      <div className='flex-container'>
        <SearchInput
          label={'Import Hooks From'}
          type={null}
          reactTestCase={null}
          updateTypesFilePath={null}
          updateActionsFilePath={updateHooksFilePath}
          options={Object.keys(filePathMap)}
          dispatch={dispatchToHooksTestCase}
          action={null}
          filePathMap={filePathMap}
        />
      </div>
    );
  }
  return (
    <>
      {hImports}
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

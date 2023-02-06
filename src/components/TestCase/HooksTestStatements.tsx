import React, { useContext } from 'react';
import HookUpdates from '../ReactHooksTestComponent/HookUpdates/HookUpdates';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { HooksStatements } from '../../utils/hooksTypes';
import importOptionsSwitch from './importOptions';
import SearchInput from '../SearchInput/SearchInput';
import { updateHooksFilePath } from '../../context/actions/hooksTestCaseActions';
import styles from '../../components/TestCase/TestCase.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';


const HooksTestStatements = () => {
  const [{ hooksStatements }, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  const { isHooksOn } = importOptionsSwitch(hooksStatements);
  const [{ filePathMap, theme }] = useContext<any>(GlobalContext);

  let hImports = null;
  if (isHooksOn) {
    hImports = (
      <div id={styles[`testCaseHeader${theme}`]}>
            <SearchInput
              label={'Import Hooks From'}
              updateActionsFilePath={updateHooksFilePath}
              options={Object.keys(filePathMap)}
              dispatch={dispatchToHooksTestCase}
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
          case 'hooks':
            return <HookUpdates key={statement.id} hookUpdates={statement} index={i} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default HooksTestStatements;

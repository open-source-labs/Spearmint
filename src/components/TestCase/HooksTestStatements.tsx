import React, { useContext } from 'react';
import HookUpdates from '../ReactHooksTestComponent/HookUpdates/HookUpdates';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { HooksStatements } from '../../utils/hooksTypes';
import importOptionsSwitch from './importOptions';
import SearchInput from '../SearchInput/SearchInput';
import { updateHooksFilePath } from '../../context/actions/hooksTestCaseActions';
import styles from '../SearchInput/SearchInput.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';


const HooksTestStatements = () => {
  const [{ hooksStatements }, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  const { isHooksOn } = importOptionsSwitch(hooksStatements);
  const [{ filePathMap, theme }] = useContext<any>(GlobalContext);

  let hImports = null;
  if (isHooksOn) {
    hImports = (
      <div className={styles[`HooksTestCase${theme}`]}>
        <div className={styles.flexContainer}>
          <div style={{ width: '80%'}}>
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
        </div>
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

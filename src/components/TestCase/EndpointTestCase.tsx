import React, { useContext, ChangeEvent } from 'react';
import styles from './TestCase.module.scss';

import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import {
  updateServerFilePath,
  updateStatementsOrder,
  toggleDB,
  updateDBFilePath,
  addEndpoint,
} from '../../context/actions/endpointTestCaseActions';
import EndpointTestMenu from '../TestMenu/EndpointTestMenu';
import EndpointTestStatements from './EndpointTestStatements';
import { EndpointStatements } from '../../utils/endpointTypes';
import SearchInput from '../SearchInput/SearchInput';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { Button } from '@mui/material';
// import { DropResult, DroppableProvided } from '../../utils/reactBeautifulDndTypes';

const EndpointTestCase = () => {
  let [{ endpointStatements, addDB }, dispatchToEndpointTestCase] = useContext(
    EndpointTestCaseContext
  );
  const [{ filePathMap, theme }] = useContext(GlobalContext);

  const handleAddEndpoint = () => {
    dispatchToEndpointTestCase(addEndpoint());
  };

  const questionIcon = require('../../assets/images/help-circle.png');

  const reorder = (
    list: Array<EndpointStatements>,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  if (addDB === true) addDB = ' ';

  const handleSelectUpdateDatabase = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchToEndpointTestCase(toggleDB(e.target.value));
  };

  return (
    <div>
      <div id="head">
        <h2 id={styles[`testName${theme}`]}>Endpoint Testing</h2>
        <EndpointTestMenu />
      </div>
      <div id={styles[`testMockSection${theme}`]}>
        <section id={styles[`testCaseHeader${theme}`]}>
          <div className={styles.header}>
            <div className={styles.searchInput}>
              <SearchInput
                label="Import Server From"
                options={Object.keys(filePathMap)}
                filePathMap={filePathMap}
                dispatch={dispatchToEndpointTestCase}
                action={updateServerFilePath}
                //these are passed in to bypass typescript error for now...
                reactTestCase={null}
                updateTypesFilePath={null}
                updateActionsFilePath={null}
                type={null}
              />
            </div>
          </div>
          {addDB && (
            <>
              <div>
                <label htmlFor="endpointDB">Import Database From</label>{' '}
                <span id={styles.hastooltip} role="tooltip">
                  <img src={questionIcon} alt="help" />
                  <span id={styles.tooltip}>
                    If you're testing a route that involves querying a database,
                    you must import it here. See "Run Test" above for more
                    information.
                  </span>
                </span>
                <div id={styles.labelInput} style={{ width: '80%' }}>
                  <SearchInput
                    options={Object.keys(filePathMap)}
                    dispatch={dispatchToEndpointTestCase}
                    action={updateDBFilePath}
                    filePathMap={filePathMap}
                    //these are passed in to bypass typescript error for now...
                    reactTestCase={null}
                    updateTypesFilePath={null}
                    updateActionsFilePath={null}
                    type={null}
                    label={null}
                  />
                </div>
              </div>
              <div id={styles.dropdownWrapper} style={{ marginTop: '15px' }}>
                <label htmlFor="endpointDBType">Type of Database</label>
                <div id={styles.dropdownFlex}>
                  <select
                    id="method"
                    value={addDB}
                    onChange={(e) => handleSelectUpdateDatabase(e)}
                  >
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="MongoDB">MongoDB</option>
                    <option value="Mongoose">Mongoose</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
      <div id={styles[`Endpoint${theme}`]}>
        <Button
          variant="outlined"
          data-testid="endPointButton"
          size="medium"
          onClick={handleAddEndpoint}
        >
          Endpoint
        </Button>
      </div>
    </div>
  );
};

export default EndpointTestCase;

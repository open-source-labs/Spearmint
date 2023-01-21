import React, { useContext, ChangeEvent } from 'react';
import { DragDropContext, Droppable, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';

import { DenoTestCaseContext } from '../../context/reducers/denoTestCaseReducer';
import {
  updateServerFilePath,
  updateStatementsOrder,
  toggleDB,
  updateDBFilePath,
  addEndpoint,
} from '../../context/actions/denoTestCaseActions';
import DenoTestMenu from '../TestMenu/DenoTestMenu';
import DenoTestStatements from './DenoTestStatements';
import { DenoStatements } from '../../utils/denoTypes';
import SearchInput from '../SearchInput/SearchInput';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { Button } from '@mui/material';

const DenoTestCase = () => {
  type DropResult = typeof DropResult;
  type DroppableProvided = typeof DroppableProvided
  let [{ denoStatements, addDB }, dispatchToDenoTestCase] = useContext<any>(
    DenoTestCaseContext
  );
  const [{ filePathMap, theme }] = useContext<any>(GlobalContext);
  
  const handleAddEndpoint = () => {
    dispatchToDenoTestCase(addEndpoint());
  };

  const questionIcon = require('../../assets/images/help-circle.png');

  const reorder = (list: Array<DenoStatements>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reorderedStatements: Array<DenoStatements> = reorder(
      denoStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToDenoTestCase(updateStatementsOrder(reorderedStatements));
  };

  if (addDB === true) addDB = ' ';

  const handleSelectUpdateDatabase = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchToDenoTestCase(toggleDB(e.target.value));
  };

  return (
    <div>
      <div id='head'>
        <h2 id={styles[`testName${theme}`]}>Deno Testing</h2>
        <DenoTestMenu />
      </div>
      <div id={styles[`testMockSection${theme}`]}>
        <section id={styles[`testCaseHeader${theme}`]}>
          <div className={styles.header}>
            <div className={styles.searchInput}>
              <SearchInput
                label='Import Server From'
                options={Object.keys(filePathMap)}
                filePathMap={filePathMap}
                dispatch={dispatchToDenoTestCase}
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
                <label htmlFor='endpointDB'>Import Database From</label>{' '}
                <span id={styles.hastooltip} role='tooltip'>
                  <img src={questionIcon} alt='help' />
                  <span id={styles.tooltip}>
                    If you're testing a route that involves querying a database, you must import it
                    here. See "Run Test" above for more information.
                  </span>
                </span>
                <div id={styles.labelInput} style={{ width: '80%' }}>
                  <SearchInput
                    options={Object.keys(filePathMap)}
                    dispatch={dispatchToDenoTestCase}
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
                <label htmlFor='endpointDBType'>Type of Database</label>
                <div id={styles.dropdownFlex}>
                  <select id='method' value={addDB} onChange={(e) => handleSelectUpdateDatabase(e)}>
                    <option value='PostgreSQL'>PostgreSQL</option>
                    <option value='MongoDB'>MongoDB</option>
                    <option value='Mongoose'>Mongoose</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided :DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <DenoTestStatements />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div id={styles[`Endpoint${theme}`]}>
          <Button 
            variant='outlined'
            data-testid='endPointButton' 
            size='medium'
            onClick={handleAddEndpoint}>
            Endpoint
          </Button>
        </div>
    </div>
  );
};

export default DenoTestCase;

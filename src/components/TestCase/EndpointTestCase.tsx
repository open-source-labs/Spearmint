import React, { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import {
  updateServerFilePath,
  updateStatementsOrder,
} from '../../context/actions/endpointTestCaseActions';
import EndpointTestMenu from '../TestMenu/EndpointTestMenu';
import EndpointTestStatements from './EndpointTestStatements';
import { EndpointStatements } from '../../utils/endpointTypes';
import SearchInput from '../SearchInput/SearchInput';
import { GlobalContext } from '../../context/reducers/globalReducer';

const EndpointTestCase = () => {
  const [{ endpointStatements }, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);
  const [{ filePathMap }] = useContext<any>(GlobalContext);

  const reorder = (list: Array<EndpointStatements>, startIndex: number, endIndex: number) => {
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
    const reorderedStatements: Array<EndpointStatements> = reorder(
      endpointStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToEndpointTestCase(updateStatementsOrder(reorderedStatements));
  };

  return (
    <div>
      <div id='head'>
        <EndpointTestMenu />
      </div>
      <div id={styles.testMockSection}>
        <section id={styles.testCaseHeader}>
          <label htmlFor='endpointFile'>Import Server From</label>
          <div id={styles.labelInput} style={{ width: '80%' }}>
            <SearchInput
              options={Object.keys(filePathMap)}
              dispatch={dispatchToEndpointTestCase}
              action={updateServerFilePath}
              filePathMap={filePathMap}
              //these are passed in to bypass typescript error for now...
              reactTestCase={null}
              updateTypesFilePath={null}
              updateActionsFilePath={null}
              type={null}
            />
          </div>
        </section>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <EndpointTestStatements />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default EndpointTestCase;

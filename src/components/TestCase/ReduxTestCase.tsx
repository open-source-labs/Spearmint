import React, { useContext, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import { updateFile, setFilePath, toggleRightPanel } from '../../context/actions/globalActions';
import {
  updateReduxTestStatement,
  updateStatementsOrder,
} from '../../context/actions/reduxTestCaseActions';
import ReduxTestMenu from '../TestMenu/ReduxTestMenu';
import ReduxTestStatements from './ReduxTestStatements';
import { ReduxStatements, ReduxTestCaseState } from '../../utils/reduxTypes';
import ReduxHelpModal from '../TestHelpModals/ReduxHelpModal';
import useGenerateTest from '../../context/useGenerateTest.jsx';

const ReduxTestCase = () => {
  interface Ref {
    current: any;
  }

  const [{ reduxTestStatement, reduxStatements, modalOpen }, dispatchToReduxTestCase] = useContext(
    ReduxTestCaseContext
  );

  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const testDescription: Ref = useRef(null);

  useEffect(() => {
    testDescription.current.focus();
  }, []);

  const handleUpdateReduxTestStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchToReduxTestCase(updateReduxTestStatement(e.target.value));
  };

  const reorder = (list: ReduxStatements[], startIndex: number, endIndex: number) => {
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
    const reorderedStatements: Array<ReduxStatements> = reorder(
      reduxStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToReduxTestCase(updateStatementsOrder(reorderedStatements));
  };

  const generateTest = useGenerateTest('redux', projectFilePath);

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ reduxStatements, reduxTestStatement })));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
  };

  if (!file && exportBool)
    dispatchToGlobal(updateFile(generateTest({ reduxStatements, reduxTestStatement })));

  return (
    <div>
      <div id='head'>
        <ReduxTestMenu dispatchToReduxTestCase={dispatchToReduxTestCase} />
      </div>
      <button onClick={fileHandle}>Preview</button>

      <div id={styles.testMockSection}>
        <section id={styles.testCaseHeader}>
          <label htmlFor='test-statement'>Test</label>
          <input
            ref={testDescription}
            type='text'
            id={styles.testStatement}
            value={reduxTestStatement}
            onChange={handleUpdateReduxTestStatement}
          />
        </section>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ReduxTestStatements
                reduxStatements={reduxStatements}
                dispatchToReduxTestCase={dispatchToReduxTestCase}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ReduxTestCase;

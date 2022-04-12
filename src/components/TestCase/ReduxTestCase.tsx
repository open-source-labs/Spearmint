//not using useRef or useEffect which are both react hooks...
import React, { useContext, useRef, useEffect } from 'react';
// if react-beautiful-dnd is declared in declaration.d.ts then eslint becomes unhappy about DropResult
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';

import {
  addActionCreator,
  addAsync,
  addMiddleware,
  addReducer,
  updateReduxTestStatement,
  updateStatementsOrder,
} from '../../context/actions/reduxTestCaseActions';
import ReduxTestMenu from '../TestMenu/ReduxTestMenu';
import ReduxTestStatements from './ReduxTestStatements';
import { ReduxStatements } from '../../utils/reduxTypes';
import { Button, TextField } from '@material-ui/core';
import { GlobalContext } from '../../context/reducers/globalReducer';
import InputTextField from '../InputTextField';

const ReduxTestCase = () => {
  interface Ref {
    current: any;
  }

  const [{ reduxTestStatement, reduxStatements }, dispatchToReduxTestCase] = useContext(
    ReduxTestCaseContext
  );

  const [{theme}] = useContext(GlobalContext);

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

  const handleAddMiddleware = () => {
    dispatchToReduxTestCase(addMiddleware());
  };

  const handleAddActionCreator = () => {
    dispatchToReduxTestCase(addActionCreator());
  };

  const handleAddAsync = () => {
    dispatchToReduxTestCase(addAsync());
  };

  const handleAddReducer = () => {
    dispatchToReduxTestCase(addReducer());
  };

  return (
    <div>
        <div id='head'>
        <h2>Redux Testing</h2>
        <ReduxTestMenu />
      </div>
      <div id={styles.testMockSection}>
        <section id={styles[`testCaseHeader${theme}`]}>
          <InputTextField
            type='text'
            id={styles.testStatement}
            value={reduxTestStatement}
            onChange={handleUpdateReduxTestStatement}
            variant="outlined"
            label="Describe Block"
            size='medium'
          />
          <Button data-testid='reducerButton' onClick={handleAddReducer} variant="outlined">
            Reducer
          </Button>
          <Button data-testid='actionCreatorButton' onClick={handleAddActionCreator} variant="outlined">
            Action Creator
          </Button>
          <Button data-testid='asyncButton' onClick={handleAddAsync} variant="outlined">
            Async Action Creator
          </Button>
          <Button data-testid='middlewareButton' onClick={handleAddMiddleware} variant="outlined">
            Middleware
          </Button>
        </section>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided: any) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ReduxTestStatements />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ReduxTestCase;

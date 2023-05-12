import React, { useContext, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import {
  addHookUpdates,
  updateHooksTestStatement,
  updateStatementsOrder, 
} from '../../context/actions/hooksTestCaseActions';
import HooksTestMenu from '../TestMenu/HooksTestMenu';
import HooksTestStatements from './HooksTestStatements';
import { Button } from '@mui/material';
import { Hooks } from '../../utils/hooksTypes';
import { GlobalContext } from '../../context/reducers/globalReducer';
import InputTextField from '../InputTextField';

const HooksTestCase = (): JSX.Element => {
  
  // hooksStatements array of of objects of interface Hooks from hooksTestCaseState
  const [{ hooksStatements }, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  // extract theme from GlobalContext
  const [{theme}] = useContext(GlobalContext);

  // handle text input in Describe Block input field
  const handleUpdateHooksTestStatement = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatchToHooksTestCase(updateHooksTestStatement(e.target.value));
  };

  // reorder array of Hooks
  const reorder = (list: Hooks[], startIndex: number, endIndex: number): Hooks[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // after dropping draggable, update state with reorderd list of Hooks
  const onDragEnd = (result:typeof DropResult): void => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reorderedStatements: Array<Hooks> = reorder(
      hooksStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToHooksTestCase(updateStatementsOrder(reorderedStatements));
  };

  // create new Hook
  const handleAddHookUpdates = (): void => {
    dispatchToHooksTestCase(addHookUpdates());
  };

  return (
    <>
      <div id='head'>
      <h2 id={styles[`testName${theme}`]}>Hooks Testing</h2>
        <HooksTestMenu />
      </div>
      <div id={styles[`testMockSection${theme}`]}>
        <div className={styles.header}>
          <div className={styles.searchInput} style={{marginLeft: '16px'}}>
        <InputTextField
          size='small'
          variant='outlined'
          placeholder='+Describe Block'
          type='text'
          onChange={handleUpdateHooksTestStatement}/>
          </div>
        </div>
      </div>
              <HooksTestStatements />
      <div id={styles[`PaintTime${theme}`]}>
        <Button 
          className='hookUpdatesButton' 
          type='button' 
          variant='outlined'
          size='medium'
          onClick={handleAddHookUpdates}>
          Hooks
        </Button>
      </div>
    </>
  );
};

export default HooksTestCase;

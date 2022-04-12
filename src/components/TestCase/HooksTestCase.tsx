import React, { useContext, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import {
  addHookUpdates,
  updateHooksTestStatement,
  updateStatementsOrder,
} from '../../context/actions/hooksTestCaseActions';
import HooksTestMenu from '../TestMenu/HooksTestMenu';
import HooksTestStatements from './HooksTestStatements';
import { Button } from '@material-ui/core';
import { HooksStatements } from '../../utils/hooksTypes';
import { GlobalContext } from '../../context/reducers/globalReducer';
import InputTextField from '../InputTextField';

const HooksTestCase = () => {
  
  const [{ hooksStatements }, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  const [{theme}] = useContext<any>(GlobalContext);


  const handleUpdateHooksTestStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchToHooksTestCase(updateHooksTestStatement(e.target.value));
  };

  const reorder = (list: Array<HooksStatements>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reorderedStatements: Array<HooksStatements> = reorder(
      hooksStatements,
      result.source.index,
      result.destination.index
    );
    dispatchToHooksTestCase(updateStatementsOrder(reorderedStatements));
  };

  const handleAddHookUpdates = () => {
    dispatchToHooksTestCase(addHookUpdates());
  };
  return (
    <>
      <div id='head'>
      <h2>Hooks Testing</h2>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided: any) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <HooksTestStatements />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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

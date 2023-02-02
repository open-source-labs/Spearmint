import React, { Ref, useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import {
  updateDescribeText,
  updateItStatementText,
  updateDescribeOrder,
  updateItStatementOrder,
  updateDescribeStandardTag,
  updateItCatTag,
  updateFilePath,
  createPuppeteerUrl,
  addDescribeBlock,
} from '../../context/actions/accTestCaseActions';
import {
  AccTestCaseContext,
} from '../../context/reducers/accTestCaseReducer';
import { GlobalContext } from '../../context/reducers/globalReducer';

import styles from './TestCase.module.scss';
import AccTestMenu from '../TestMenu/AccTestMenu';
import AccTestTypes from '../AccTestComponent/AccTestTypes/AccTestTypes';
import PuppeteerUrl from '../AccTestComponent/PuppeteerUrl/PuppeteerUrl';
import SearchInput from '../SearchInput/SearchInput';
import DescribeRenderer from '../AccTestComponent/DescribeRenderer/DescribeRenderer';
import { Button } from '@mui/material';


const AccTestCase = () => {
  const [ accTestCase , dispatchToAccTestCase] = useContext(AccTestCaseContext);
  const [{ theme }] = useContext(GlobalContext);
  const { describeBlocks, itStatements } = accTestCase;
  const [{ filePathMap }] = useContext(GlobalContext);
  
  const reorder = (list: (Array<string> | string) , startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: typeof DropResult) => {
    // edge cases: dropped to a non-destination, or dropped where it was grabbed (no change)
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const list = result.draggableId.includes('describe') ? describeBlocks.allIds : itStatements.allIds[result.type];
    const func = result.draggableId.includes('describe') ? updateDescribeOrder : updateItStatementOrder;

    const reorderedStatements = reorder(list, result.source.index, result.destination.index);

    dispatchToAccTestCase(func(reorderedStatements, result.type));
  };

   // handle change to add a Describe Block
   const handleAddDescribeBlock = () => {
    dispatchToAccTestCase(addDescribeBlock());
  };

  return (
    <div>
      <div id="head">
      <h2 id={styles[`testName${theme}`]}>Accessibility Testing</h2>
        <AccTestMenu />
      </div>

      <section id={styles[`testCaseHeader${theme}`]}>
        <div id={styles.accTestDiv}>
          <AccTestTypes
            // handleAccChange={handleAccChange}
          />

            // <div style={{'alignSelf': 'right'}}>
              <div id={styles.labelInput} style={{'width': '50%', 'alignSelf': 'right', 'margin': '0'}}>
                <SearchInput
                  options={Object.keys(filePathMap)}
                  dispatch={dispatchToAccTestCase}
                  action={updateFilePath}
                  filePathMap={filePathMap}
                  label="Import File From"
                />
              </div>
            // </div>

        </div>
        <div id={styles.describeContainer}>
        <DragDropContext onDragEnd={onDragEnd} key={`acc-dnd-context`}>
          <Droppable
            droppableId="droppableAccDescribe"
            key="acc-droppable-context"
            type="describe"
          >
            {(provided:any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              > 
                <DescribeRenderer
                  key="describeRendererAcc"
                  dispatcher={dispatchToAccTestCase}
                  describeBlocks={describeBlocks}
                  itStatements={itStatements}
                  updateDescribeText={updateDescribeText}
                  updateItStatementText={updateItStatementText}
                  updateDescribeStandardTag={updateDescribeStandardTag}
                  updateItCatTag={updateItCatTag}
                  type="acc"
                  theme={theme}
                />
                {provided.placeholder}
              </div>

            )}
          </Droppable>
        </DragDropContext>
        </div>
        <Button style={{'width': '50vw'}} data-testid='addDescribeButton' onClick={handleAddDescribeBlock} variant="outlined">
            Add Describe Block
        </Button>
      </section>
    </div>
  );
};
export default AccTestCase;

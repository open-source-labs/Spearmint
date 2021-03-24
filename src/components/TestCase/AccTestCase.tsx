import React, { useContext, ChangeEvent } from 'react';
import cn from 'classnames';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TestCase.module.scss';
import {
  updateDescribeText,
  updateItStatementText,
  updateDescribeOrder,
  updateItStatementOrder,
  updateDescribeCatTag,
} from '../../context/actions/accTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import SearchInput from '../SearchInput/SearchInput';

import AccTestMenu from '../TestMenu/AccTestMenu';

import DecribeRenderer from '../AccTestComponent/DescribeRenderer/DescribeRenderer';
import { updateImportFilePath } from '../../context/actions/accTestCaseActions';
import {
  AccTestCaseContext,
} from '../../context/reducers/accTestCaseReducer';

const AccTestCase = () => {
  const [accTestCase, dispatchToAccTestCase] = useContext(
    AccTestCaseContext,
  );

  const { describeBlocks, itStatements } = accTestCase;

  const [{ filePathMap }] = useContext<any>(GlobalContext);

  const handleChangeDescribeText = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const describeId = e.target.id;
    dispatchToAccTestCase(updateDescribeText(text, describeId));
  };

  const handleChangeItStatementText = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const itId = e.target.id;
    dispatchToAccTestCase(updateItStatementText(text, itId));
  };

  const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // edge cases: dropped to a non-destination, or dropped where it was grabbed (no change)
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const list = result.draggableId.includes('describe') ? describeBlocks.allIds : itStatements.allIds[result.type];
    const func = result.draggableId.includes('describe') ? updateDescribeOrder : updateItStatementOrder;

    const reorderedStatements = reorder(list, result.source.index, result.destination.index);

    dispatchToAccTestCase(func(reorderedStatements, result.type));
  };

  return (
    <div id={styles.AccTestCase}>

      <div id="head">
        <AccTestMenu />
      </div>

      <section id={styles.testCaseHeader}>
        <label htmlFor="fileImport">Import File From</label>
        <div id={styles.labelInput} style={{ width: '80%' }}>
          <SearchInput
            options={Object.keys(filePathMap)}
            dispatch={dispatchToAccTestCase}
            action={updateImportFilePath}
            filePathMap={filePathMap}
          />
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="droppableAccDescribe"
            type="describe"
          >
            {(provided) => (
              <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              >
                <DecribeRenderer
                  dispatcher={dispatchToAccTestCase}
                  describeBlocks={describeBlocks}
                  itStatements={itStatements}
                  handleChangeDescribeText={handleChangeDescribeText}
                  handleChangeItStatementText={handleChangeItStatementText}
                  updateDescribeCatTag={updateDescribeCatTag}
                  type="acc"
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>

    </div>
  );
};
export default AccTestCase;

import React, { useRef, useEffect, ChangeEvent } from 'react';
import cn from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ItRenderer from '../ItRenderer/ItRenderer';
import CatTagFilter from '../CatTagFilter/CatTagFilter';
import StandardTagFilter from '../StandardTagFilter/StandardTagFilter';
import styles from './DescribeRenderer.module.scss';
import { deleteDescribeBlock, addItStatement } from '../../../context/actions/accTestCaseActions';
import { AccTestCaseState } from '../../../utils/accTypes';

const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  updateDescribeText,
  handleChangeItStatementText,
  updateDescribeCatTag,
  type,
}): AccTestCaseState => {
  const testDescription = useRef<HTMLInputElement>(null!);

  const deleteDescribeBlockHandleClick = (e: ChangeEvent) => {
    e.stopPropagation();
    const describeId = e.target.id;
    dispatcher(deleteDescribeBlock(describeId));
  };

  const addItStatementHandleClick = (e: ChangeEvent) => {
    const describeId = e.target.id;
    dispatcher(addItStatement(describeId));
  };

  return describeBlocks.allIds.map((id: string, i: number) => (
    <Draggable
      key={id}
      draggableId={id}
      index={i}
      type="describe"
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div id={styles.describeBlock} key={i}>
            <div id={styles.describeStatement}>
            <label htmlFor="describe-label" className={styles.describeLabel}>
              Describe Block
            </label>

            < CatTagFilter
              dispatch={dispatcher}
              tagAction={updateDescribeCatTag}
              textAction={updateDescribeText}
              describeId={id}
              catTag={describeBlocks.byId[id].catTag}
            />
            < StandardTagFilter
              dispatch={dispatcher}
              tagAction={updateDescribeCatTag}
              textAction={updateDescribeText}
              describeId={id}
              catTag={describeBlocks.byId[id].catTag}
            />
            </div>

            <i
              onClick={deleteDescribeBlockHandleClick}
              id={id}
              className={cn('far fa-window-close', styles.describeClose)}
            />


            {/* <input
              ref={testDescription}
              id={id}
              className={styles.describeInput}
              name="describe-label"
              type="text"
              placeholder="Component has basic accessibility"
              value={describeBlocks.byId[id].text || ''}
              onChange={handleChangeDescribeText}
            /> */}
            <p className={styles.describeInput}>{describeBlocks.byId[id].text}</p>
            <div className={styles.separator} />

            <Droppable
              droppableId={"droppableAccIt" + id}
              type={id}
            >
              {(innerProvided) => (
                <div
                  ref={innerProvided.innerRef}
                  {...innerProvided.droppableProps}
                >
                  <ItRenderer
                    type={type}
                    key={`it-${id}-${i}`}
                    itStatements={itStatements}
                    describeId={id}
                    handleChangeItStatementText={handleChangeItStatementText}
                  />
                  {innerProvided.placeholder}
                </div>
              )}
            </Droppable>

            <div className={styles.buttonContainer}>
              <button className={styles.addIt} id={id} onClick={addItStatementHandleClick}>
                +It Statement
              </button>
            </div>

          </div>
        </div>
      )}
    </Draggable>
  ));
};

export default DescribeRenderer;

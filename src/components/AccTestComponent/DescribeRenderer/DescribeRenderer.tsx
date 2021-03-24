import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ItRenderer from '../ItRenderer/ItRenderer';
import StandardTagFilter from '../StandardTagFilter/StandardTagFilter';
import styles from './DescribeRenderer.module.scss';
import { deleteDescribeBlock, addItStatement } from '../../../context/actions/accTestCaseActions';

const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  updateDescribeText,
  updateItStatementText,
  updateDescribeStandardTag,
  updateItCatTag,
  type,
}) => {
  const deleteDescribeBlockHandleClick = (e: ChangeEvent) => {
    e.stopPropagation();
    const describeId = e.target.id;
    dispatcher(deleteDescribeBlock(describeId));
  };

  const addItStatementHandleClick = (e: ChangeEvent) => {
    const describeId = e.target.id;
    dispatcher(addItStatement(describeId));
  };

  const deleteDescribeBlockOnKeyUp = (e: ChangeEvent) => {
    if (e.charCode === 13) {
      const describeId = e.target.id;
      dispatcher(deleteDescribeBlock(describeId));
    }
  };

  return describeBlocks.allIds.map((id: string , i: number) => (
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
            <label htmlFor="describe-label" className={styles.describeLabel}>
              Describe Block
            </label>

            <StandardTagFilter
              dispatch={dispatcher}
              tagAction={updateDescribeStandardTag}
              textAction={updateDescribeText}
              describeId={id}
              standardTag={describeBlocks.byId[id].standardTag}
            />

            <i
              tabIndex={0}
              onKeyPress={deleteDescribeBlockOnKeyUp}
              onClick={deleteDescribeBlockHandleClick}
              id={id}
              className={cn('far fa-window-close', styles.describeClose)}
            />

            <p className={styles.describeStatement}>{describeBlocks.byId[id].text}</p>
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
                    updateItStatementText={updateItStatementText}
                    updateItCatTag={updateItCatTag}
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

import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ItRenderer from '../ItRenderer/ItRenderer';
import styles from './DescribeRenderer.module.scss';
import { deleteDescribeBlock, addItStatement } from '../../../context/actions/accTestCaseActions';

const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  handleChangeDescribeText,
  handleChangeItStatementText,
  type,
}) => {
  // const testDescription = useRef(null);

  // useEffect(() => {
  //   testDescription.current.focus();
  // }, []);

  const deleteDescribeBlockHandleClick = (e) => {
    e.stopPropagation();
    const describeId = e.target.id;
    dispatcher(deleteDescribeBlock(describeId));
  };

  const addItStatementHandleClick = (e) => {
    const describeId = e.target.id;
    dispatcher(addItStatement(describeId));
  };

  return describeBlocks.allIds.map((id, i) => (
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
            
            <i
              onClick={deleteDescribeBlockHandleClick}
              id={id}
              className={cn('far fa-window-close', styles.describeClose)}
            />


            <input
              
              id={id}
              className={styles.describeInput}
              name="describe-label"
              type="text"
              placeholder="Component has basic accessibility"
              value={describeBlocks.byId[id].text || ''}
              onChange={handleChangeDescribeText}
            />

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

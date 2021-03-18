import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ItRenderer from '../ItRenderer/ItRenderer';
import styles from './DescribeRenderer.module.scss';
import { deleteDescribeBlock, addItstatement } from '../../../context/actions/reactTestCaseActions';

// const questionIcon = require('../../../assets/images/help-circle.png');

const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  statements,
  handleChangeDescribeText,
  handleChangeItStatementText,
  type,
}) => {
  const testDescription = useRef(null);

  useEffect(() => {
    testDescription.current.focus();
  }, []);

  const deleteDescribeBlockHandleClick = (e) => {
    e.stopPropagation();
    const describeId = e.target.id;
    dispatcher(deleteDescribeBlock(describeId));
  };

  const addItStatementHandleClick = (e) => {
    const describeId = e.target.id;
    dispatcher(addItstatement(describeId));
  };

  return describeBlocks.allIds.map((id, i) => {
    return (
      <Draggable
        key={id}
        draggableId={id}
        index={i}
        type="describe"
      >
        {(provided) => (
          <div
            id={styles.describeBlock}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <label htmlFor='describe-label' className={styles.describeLabel}>
              Describe Block
            </label>

            <i
              onClick={deleteDescribeBlockHandleClick}
              id={id}
              className={cn('far fa-window-close', styles.describeClose)}
            ></i>
            <input
              ref={testDescription}
              id={id}
              className={styles.describeInput}
              name='describe-label'
              type='text'
              placeholder={'The component has basic functionality'}
              value={describeBlocks.byId[id].text || ''}
              onChange={handleChangeDescribeText}
            />
            <div className={styles.separator}></div>

            <Droppable
              droppableId={"droppableReactIt" + id}
              type={id}
            >
              {(innerProvided) => (
                <div
                  ref={innerProvided.innerRef}
                  {...innerProvided.droppableProps}
                >
                  {/* {JSON.stringify(provided)} */}
                  <ItRenderer
                    type={type}
                    key={`it-${id}-${i}`}
                    itStatements={itStatements}
                    statements={statements}
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

        )}
      </Draggable>
    );
  });
};

export default DescribeRenderer;

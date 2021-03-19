// import React object and destructure useRef and useEffect hooks
import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';

// import It component
import ItRenderer from '../ItRenderer/ItRenderer';

// import styling
import styles from './DescribeRenderer.module.scss';

// import action types
import { deleteDescribeBlock, addItStatement } from '../../../context/actions/accTestCaseActions';

// import from accTypes - ### add after html structure is created?
// import { Assertion, AccObj, Header, Action, EventTarget } from '../../utils/accTypes';

// require in icons
// const closeIcon = require('../../../assets/images/close.png');
// const dragIcon = require('../../assets/images/drag-vertical.png');
// const minusIcon = require('../../assets/images/minus-box-outline.png');

const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  statements,
  draggableStatements,
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
    dispatcher(addItStatement(describeId));
  };

  return draggableStatements.map((id, i) => (
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
            {id}

            <i
              onClick={deleteDescribeBlockHandleClick}
              id={id}
              className={cn('far fa-window-close', styles.describeClose)}
            />

            <input
              ref={testDescription}
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
                    statements={statements}
                    describeId={id}
                    handleChangeItStatementText={handleChangeItStatementText}
                  />
                  {innerProvided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Implement Button For Stretch */}
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

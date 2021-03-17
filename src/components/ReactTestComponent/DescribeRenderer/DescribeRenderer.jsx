import React, { useRef, useEffect } from 'react';
import ItRenderer from '../ItRenderer/ItRenderer';
// import { Draggable } from 'react-beautiful-dnd';
import cn from 'classnames';
import styles from './DescribeRenderer.module.scss';
import { deleteDescribeBlock, addItstatement } from '../../../context/actions/reactTestCaseActions';

// const questionIcon = require('../../../assets/images/help-circle.png');

const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  statements,
  // draggableStatements,
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
      <div id={styles.describeBlock} key={i}>
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
        <ItRenderer
          type={type}
          key={`it-${id}-${i}`}
          itStatements={itStatements}
          statements={statements}
          describeId={id}
          handleChangeItStatementText={handleChangeItStatementText}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.addIt} id={id} onClick={addItStatementHandleClick}>
            +It Statement
          </button>
        </div>
      </div>
    );
  });
};

export default DescribeRenderer;

{
  /* <Draggable draggableId={`draggable-${id}-${i}`} index={i}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            id={styles.describeBlock}
            className={styles.describeBlock}
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
              id={id}
              className={styles.describeInput}
              name='describe-label'
              type='text'
              placeholder={'The component has basic functionality'}
              defaultValue={''}
              value={describeBlocks.byId[id].text || ''}
              onChange={handleChangeDescribeText}
            />
            <div className={styles.separator}></div>
            <ItRenderer
              type={type}
              key={`it-${id}-${i}`}
              itStatements={itStatements}
              statements={statements}
              describeId={id}
              handleChangeItStatementText={handleChangeItStatementText}
            />
            <div className={styles.buttonContainer}>
              <button className={styles.addIt} id={id} onClick={addItStatementHandleClick}>+It Statement</button>
            </div>
          </div>
        )}
      </Draggable> */
}

import React from 'react';
import ItRenderer from '../ItRenderer/ItRenderer';
import styles from './DescribeRenderer.module.scss';
import cn from 'classnames'
import { Draggable } from 'react-beautiful-dnd';

const DescribeRenderer = ({
  describeBlocks,
  itStatements,
  statements,
  draggableStatements,
  handleChangeDescribeText,
  handleChangeItStatementText,
  type
}) => {
  return draggableStatements.map((id, i) => {
    return (
      <Draggable draggableId={`draggable-${id}-${i}`} index={i}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            id={styles.describeBlock}
            className={styles.describeBlock}
          >
            <label htmlFor='describe-label' className={styles.describeLabel}>Describe Block</label>
            <i className={cn("far fa-window-close", styles.describeClose)}></i>
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
          </div>
        )}
      </Draggable>
    );
  });
};

export default DescribeRenderer;

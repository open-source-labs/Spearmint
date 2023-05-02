import React, { Dispatch } from 'react';
import cn from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ItRenderer from '../ItRenderer/ItRenderer';
import styles from './DescribeRenderer.module.scss';
import { deleteDescribeBlock, addItstatement } from '../../../context/actions/frontendFrameworkTestCaseActions';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Button, TextField } from '@mui/material';
import { DescribeBlocks, ItStatements, Statements } from '../../../utils/ReactTypes'

interface DescribeRendererProps {
  dispatcher: React.Dispatch<{ type: string, describeId: any }>,
  describeBlocks: DescribeBlocks,
  itStatements: ItStatements,
  statements: Statements,
  handleChangeDescribeText: React.ChangeEventHandler<HTMLInputElement>,
  handleChangeItStatementText: React.ChangeEventHandler<HTMLInputElement>,
  type: string,
  theme: string,
}

const DescribeRenderer = ({
  dispatcher, // React.Dispatch? or Dispatch<Action> created in useReducer in ReactTestCase file
  describeBlocks, // object which holds each describe block
  itStatements, // object which holds each it statement 
  statements, // object which holds all statements
  handleChangeDescribeText, // function which dispatches something
  handleChangeItStatementText, // function which dispatches something
  type, // string
  theme, // string
}: DescribeRendererProps) => {
  const deleteDescribeBlockHandleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const describeId = e.currentTarget.id;
    dispatcher(deleteDescribeBlock(describeId));
  };

  const deleteReactDescribeBlockOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.charCode === 13) {
      const describeId = e.currentTarget.id;
      dispatcher(deleteDescribeBlock(describeId));
    }
  };
  const addItStatementHandleClick = (e: React.MouseEvent) => {
    const describeId = e.currentTarget.id;
    dispatcher(addItstatement(describeId));
  };

  return (
  <>
    {describeBlocks.allIds.map((id: string, i: number) => (
      <Draggable key={id} draggableId={id} index={i} type='describe'>
        {(provided) => (
          <div
            id={styles[`describeBlock${theme}`]}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {/* <label htmlFor='describe-label' className={styles.describeLabel}>
              Describe Block
            </label> */}

            { i > 0 && <AiOutlineCloseCircle
              tabIndex={0}
              id={id} 
              onKeyPress={deleteReactDescribeBlockOnKeyUp}
              onClick={deleteDescribeBlockHandleClick}
              className={cn('far fa-window-close', styles.describeClose)}
            /> }
            
            {/* <input
              id={id}
              className={styles.describeInput}
              name='describe-label'
              type='text'
              placeholder={'The component has basic functionality'}
              value={describeBlocks.byId['describe0']?.text}
              onChange={handleChangeDescribeText}
            /> */}
            <div className={styles.describeInputContainer}>
              <TextField
                variant="standard"
                id={id}
                className={styles.describeInput}
                name='describe-label'
                type='text'
                placeholder="Describe name of test"
                value={describeBlocks.byId[id]?.text}
                onChange={handleChangeDescribeText}
                fullWidth />
            </div>

            <Droppable droppableId={'droppableReactIt' + id} type={id}>
              {(innerProvided) => (
                <div ref={innerProvided.innerRef} {...innerProvided.droppableProps}>
                  <ItRenderer
                    type={type}
                    key={`it-${id}-${i}`}
                    itStatements={itStatements}
                    statements={statements}
                    describeId={id}
                    handleChangeItStatementText={handleChangeItStatementText}
                    theme={theme}
                  />
                  {innerProvided.placeholder}
                </div>
              )}
            </Droppable>
            <Button className={styles.addIt} id={id} onClick={addItStatementHandleClick} variant="outlined">
              Add It Statement
            </Button>
          </div>
        )}
      </Draggable>
    ))
  }</>)
};

export default DescribeRenderer;

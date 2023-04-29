import React, { useContext, ChangeEvent } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import type { DraggableProvided } from 'react-beautiful-dnd';
import ReactTestStatements from '../../TestCase/ReactTestStatements';
import CustomInput from '../CustomInput/CustomInput';
import {
  addRender,
  addAction,
  addAssertion,
  deleteItStatement,
} from '../../../context/actions/frontendFrameworkTestCaseActions';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import styles from './ItRenderer.module.scss';
import { Button, TextField } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { ItStatements, Statements } from '../../../utils/ReactTypes';

interface ItRendererProps {
  type: string;
  itStatements: ItStatements;
  describeId: number;
  statements: Statements;
  handleChangeItStatementText: ChangeEvent<HTMLInputElement>;
  // handleChangeItStatementText: any;
  theme: 'light' | 'dark';
}

const ItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  handleChangeItStatementText,
  theme,
}: ItRendererProps) => {
  const [, dispatchToReactTestCase] = useContext(ReactTestCaseContext);

  const addRenderHandleClick = (e: React.MouseEvent) => {
    const itId = e.currentTarget.id;
    dispatchToReactTestCase(addRender(describeId, itId));
  };

  const deleteItStatementHandleClick = (e: React.MouseEvent) => {
    const itId = e.currentTarget.id;
    dispatchToReactTestCase(deleteItStatement(describeId, itId));
  };

  const deleteReactItStatementOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.charCode === 13) {
      const itId = e.currentTarget.id;
      dispatchToReactTestCase(deleteItStatement(describeId, itId));
    }
  }
  const addActionHandleClick = (e: React.MouseEvent) => {
    const itId = e.currentTarget.id;
    dispatchToReactTestCase(addAction(describeId, itId));
  };
  const addAssertionHandleClick = (e: React.MouseEvent) => {
    const itId = e.currentTarget.id;
    dispatchToReactTestCase(addAssertion(describeId, itId));
  };

  return itStatements.allIds[describeId].map((id: string, i) => (
    <Draggable
      key={id}
      draggableId={id}
      index={i}
    >
      {(provided: ResponderProvided) => (
        <div
          id={styles[`ItRenderer${theme}`]}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <AiOutlineClose
            tabIndex={0}
            id={id} 
            onKeyPress={deleteReactItStatementOnKeyUp}
            onClick={deleteItStatementHandleClick}
            className={cn(styles.itClose, 'far fa-window-close')}
          />
          {/* <CustomInput
            key={`input-${id}-${i}`}
            id={id}
            label={'The component should...'}
            placeholder={'Button component renders correctly...'}
            value={itStatements.byId[id].text}
            handleChange={handleChangeItStatementText}
          /> */}
          <div id={styles.itInputContainer}>
            <TextField
              key={`input-${id}-${i}`}
              id={id}
              className={styles.describeInput}
              name='describe-label'
              type='text'
              placeholder="Enter unit test name..."
              value={itStatements.byId[id].text}
              onChange={handleChangeItStatementText}
              fullWidth
              variant="filled"
              size='small'
            />
          </div>
          
          <ReactTestStatements
            key={`statement-${id}-${i}`}
            statements={statements}
            itId={id}
            describeId={describeId}
          />
          <div>
            {type === 'react' && (
              <div className={styles.buttonsContainer}>
                <Button id={id} onClick={addRenderHandleClick} className={styles.reactButton} variant="outlined">
                  Add Render
                </Button>
                <Button id={id} onClick={addActionHandleClick} className={styles.reactButton} variant="outlined">
                  Add Action
                </Button>
                <Button id={id} onClick={addAssertionHandleClick} className={styles.reactButton} variant="outlined">
                  Add Assertion
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  ));
};

export default ItRenderer;

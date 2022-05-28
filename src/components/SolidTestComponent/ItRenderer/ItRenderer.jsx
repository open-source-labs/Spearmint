import React, { useContext } from 'react';
import cn from 'classnames';
import styles from '../../ReactTestComponent/ItRenderer/ItRenderer.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import SolidTestStatements from '../../TestCase/SolidTestStatements';
import CustomInput from '../CustomInput/CustomInput';
import {
  addRender,
  addAction,
  addAssertion,
  deleteItStatement,
} from '../../../context/actions/frontendFrameworkTestCaseActions';
import { SolidTestCaseContext } from '../../../context/reducers/solidTestCaseReducer';
import { Button, TextField } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';

const SolidItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  handleChangeItStatementText,
  theme,
}) => {
  const [, dispatchToSolidTestCase] = useContext(SolidTestCaseContext);

  const addRenderHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToSolidTestCase(addRender(describeId, itId));
  };

  const deleteItStatementHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToSolidTestCase(deleteItStatement(describeId, itId));
  };

  const deleteSolidItStatementOnKeyUp = (e) => {
    if (e.charCode === 13) {
      const itId = e.currentTarget.id;
      dispatchToSolidTestCase(deleteItStatement(describeId, itId));
    }
  }
  const addActionHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToSolidTestCase(addAction(describeId, itId));
  };
  const addAssertionHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToSolidTestCase(addAssertion(describeId, itId));
  };

  return itStatements.allIds[describeId].map((id, i) => (
    <Draggable
      key={id}
      draggableId={id}
      index={i}
    >
      {(provided) => (
        <div
          id={styles[`ItRenderer${theme}`]}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <AiOutlineClose
            tabIndex={0}
            id={id} 
            onKeyPress={deleteSolidItStatementOnKeyUp}
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
          
          <SolidTestStatements
            key={`statement-${id}-${i}`}
            statements={statements}
            itId={id}
            describeId={describeId}
          />
          <div>
            {type === 'solid' && (
              <div className={styles.buttonsContainer}>
                <Button id={id} onClick={addRenderHandleClick} className={styles.solidButton} variant="outlined">
                  Add Render
                </Button>
                <Button id={id} onClick={addActionHandleClick} className={styles.solidButton} variant="outlined">
                  Add Action
                </Button>
                <Button id={id} onClick={addAssertionHandleClick} className={styles.solidButton} variant="outlined">
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

export default SolidItRenderer;
import React, { useContext } from 'react';
import cn from 'classnames';
import styles from '../../ReactTestComponent/ItRenderer/ItRenderer.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import SvelteTestStatements from '../../TestCase/SvelteTestStatements';
import CustomInput from '../CustomInput/CustomInput';
import {
  addRender,
  addAction,
  addAssertion,
  deleteItStatement,
} from '../../../context/actions/svelteTestCaseActions';
import { SvelteTestCaseContext } from '../../../context/reducers/svelteTestCaseReducer';
import { Button, TextField } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';

const SvelteItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  handleChangeItStatementText,
  theme,
}) => {
  console.log('styles: ', styles);
  console.log('type of styles: ', typeof styles);
  const [, dispatchToSvelteTestCase] = useContext(SvelteTestCaseContext);

  const addRenderHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToSvelteTestCase(addRender(describeId, itId));
  };

  const deleteItStatementHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToSvelteTestCase(deleteItStatement(describeId, itId));
  };

  const deleteSvelteItStatementOnKeyUp = (e) => {
    if (e.charCode === 13) {
      const itId = e.currentTarget.id;
      dispatchToSvelteTestCase(deleteItStatement(describeId, itId));
    }
  }
  const addActionHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToSvelteTestCase(addAction(describeId, itId));
  };
  const addAssertionHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToSvelteTestCase(addAssertion(describeId, itId));
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
            onKeyPress={deleteSvelteItStatementOnKeyUp}
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
          
          <SvelteTestStatements
            key={`statement-${id}-${i}`}
            statements={statements}
            itId={id}
            describeId={describeId}
          />
          <div>
            {type === 'svelte' && (
              <div className={styles.buttonsContainer}>
                <Button id={id} onClick={addRenderHandleClick} className={styles.svelteButton} variant="outlined">
                  Add Render
                </Button>
                <Button id={id} onClick={addActionHandleClick} className={styles.svelteButton} variant="outlined">
                  Add Action
                </Button>
                <Button id={id} onClick={addAssertionHandleClick} className={styles.svelteButton} variant="outlined">
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

export default SvelteItRenderer;
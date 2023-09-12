import React, { useContext } from 'react';
import cn from 'classnames';
import ReactTestStatements from '../../TestCase/UpdatedReactTestStatements';
import {
  addRender,
  addAction,
  addAssertion,
} from '../../../context/actions/updatedFrontendFrameworkTestCaseActions';
import { RTFsContexts } from '../../../context/RTFsContextsProvider';
import styles from './ItRenderer.module.scss';
import { Button, TextField } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { ItStatements, Statements } from '../../../utils/updatedReactTypes';

// This is tracking the it statements you have in a certain test, following the flow of data will
// help you better understand exactly how this works

interface ItBlockProps {
  type: string;
  itStatements: ItStatements;
  describeId: string;
  forKey: string;
  statements: Statements;
  handleChangeItStatementText: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  theme: string;
}

const TestBlock = ({ blockObjectsState, theme }) => {
  const thisBlockObjectsState = blockObjectsState;
  const { handleAddBlock, handleChange, handleDeleteBlock } =
    useContext(RTFsContexts);

  return (
    <>
      <div
        id={styles[`ItRenderer${theme}`]}
        key={thisBlockObjectsState.filepath}
      >
        <AiOutlineClose
          tabIndex={0}
          id={thisBlockObjectsState.filepath}
          onClick={(e) => handleDeleteBlock()}
          className={cn(styles.itClose, 'far fa-window-close')}
        />
        <div id={styles.itInputContainer}>
          <TextField
            key={thisBlockObjectsState.filepath}
            id={thisBlockObjectsState.filepath}
            className={styles.describeInput}
            name="describe-label"
            type="text"
            placeholder="Enter unit test name..."
            value={thisBlockObjectsState.text}
            onChange={(e) =>
              handleChange(e, 'text', thisBlockObjectsState.filepath)
            }
            fullWidth
            variant="filled"
            size="small"
          />
        </div>

        {/*<ReactTestStatements
            key={thisBlockObjectsState.filepath}
            statements={statements}
            itId={id}
            describeId={describeId}
              />*/}
        <div>
          {/*type === 'react' && (
              <div className={styles.buttonsContainer}>
                <Button
                  id={id}
                  onClick={addRenderHandleClick}
                  className={styles.reactButton}
                  variant="outlined"
                >
                  Add Render
                </Button>
                <Button
                  id={id}
                  onClick={addActionHandleClick}
                  className={styles.reactButton}
                  variant="outlined"
                >
                  Add Action
                </Button>
                <Button
                  id={id}
                  onClick={addAssertionHandleClick}
                  className={styles.reactButton}
                  variant="outlined"
                >
                  Add Assertion
                </Button>
              </div>
            )*/}
        </div>
      </div>
    </>
  );
};

export default TestBlock;

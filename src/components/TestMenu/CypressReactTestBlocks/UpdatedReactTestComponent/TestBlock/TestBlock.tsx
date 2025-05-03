import React, { useContext } from 'react';
import cn from 'classnames';
import ReactTestStatements from '../../TestCase/UpdatedReactTestStatements';
import {
  addRender,
  addAction,
  addAssertion,
} from '../../../context/actions/updatedFrontendFrameworkTestCaseActions';
import { GlobalContext } from '../../../context/reducers/globalReducer';

import { RTFsContexts } from '../../../context/RTFsContextsProvider'; // file path not resolved
import styles from './ItRenderer.module.scss';
import { Button, TextField } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { ItStatements, Statements } from '../../../utils/updatedReactTypes'; // all import declorations are not resolved

// This is tracking the it statements you have in a certain test, following the flow of data will
// help you better understand exactly how this works

interface ItBlockProps {}

const TestBlock = ({ blockObjectsState }) => {
  const [{ theme, testFramework }] = useContext(GlobalContext);
  const {
    handleAddBlock,
    handleChange,
    handleDeleteBlock,
    setChildrenComponents,
  } = useContext(RTFsContexts);

  const thisBlockObjectsState = blockObjectsState;
  const { setupTeardownBlock, arrayOfChildComponents } = setChildrenComponents(
    blockObjectsState,
    theme
  );

  return (
    <>
      <div id={styles[`ItRenderer${theme}`]} key={thisBlockObjectsState.key}>
        <AiOutlineClose
          tabIndex={0}
          id={thisBlockObjectsState.filepath}
          onClick={(e) => {
            handleDeleteBlock(
              thisBlockObjectsState.parentsFilepath,
              thisBlockObjectsState.key
            );
          }}
          className={cn(styles.itClose, 'far fa-window-close')}
        />
        <div>Test</div>
        {/*Code For implementing ${thisBlockObjectsState.filepath} as an input field. allow for people to make comments to go in their testfiles*/}
        <div id={styles.itInputContainer}>
          <TextField
            key={thisBlockObjectsState.filepath}
            id={thisBlockObjectsState.filepath}
            className={styles.describeInput}
            name="test-label"
            type="text"
            placeholder="Enter unit test name/description..."
            value={thisBlockObjectsState.text}
            onChange={(e) =>
              handleChange(
                thisBlockObjectsState.filepath,
                'text',
                e.target.value
              )
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
          {setupTeardownBlock}
          {arrayOfChildComponents}
          <div className={styles.buttonsContainer}>
          <Button
  id={`AddRenderTo${thisBlockObjectsState.key}`}
  onClick={() => {
    const describeId = thisBlockObjectsState.parentsFilepath;
    const itId = thisBlockObjectsState.filepath;

    const subType = testFramework === 'cypress' ? 'visit' : undefined;

    rTFDispatch(addRender(describeId, itId, subType));
  }}
  className={styles.reactButton}
  variant="outlined"
>
  Add Render
</Button>

            <Button
              id={`AddActionTo${thisBlockObjectsState.key}`}
              onClick={(e) => {
                handleAddBlock(e, 'action', thisBlockObjectsState.filepath);
              }}
              className={styles.reactButton}
              variant="outlined"
            >
              Add Action
            </Button>
            <Button
              id={`AddAssestionTo${thisBlockObjectsState.key}`}
              onClick={(e) => {
                handleAddBlock(e, 'assertion', thisBlockObjectsState.filepath);
              }}
              className={styles.reactButton}
              variant="outlined"
            >
              Add Assertion
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestBlock;

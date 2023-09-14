import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import describeBlockStyles from './DescribeRenderer.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
} from '@mui/material';
import { DescribeBlocks } from '../../../utils/reactTypes';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { RTFsContexts } from '../../../context/RTFsContextsProvider';

import styles from '../../Modals/Modal.module.scss';

// This is tracking your describe statements in a certain test, following the flow of data will help you
// better understand exactly how this is working

//needs updating
interface DescribeBlockProps {
  blockObjectsState: object;
  theme: string;
}

const DescribeBlock = ({ blockObjectsState, key }) => {
  const [{ theme }] = useContext(GlobalContext);

  const thisBlockObjectsState = blockObjectsState;
  //const [hasSetupTeardown, setHasSetupTeardown] = useState(false);
  const {
    handleAddBlock,
    handleChange,
    handleDeleteBlock,
    setChildrenComponents,
  } = useContext(RTFsContexts);

  // useEffect(() => {
  //   setHasSetupTeardown(false);
  // }, []);

  //only allow users to ask for 1 setup teardown per Block

  //function prepChildrenBlocksForRendering(stateObject){

  //}

  const { setupTeardownBlock, arrayOfChildComponents } = setChildrenComponents(
    blockObjectsState,
    theme
  );

  return (
    <>
      <div
        key={thisBlockObjectsState.key}
        className="describe-block"
        data-draggableid={thisBlockObjectsState.key}
        data-type="describe"
      >
        <div
          id={describeBlockStyles[`describeBlock${theme}`]}
          data-filepath={thisBlockObjectsState['filepath']}
        >
          {/* <label htmlFor='describe-label' className={describeBlockStyles.describeLabel}>
                Describe Block
              </label> */}

          <AiOutlineCloseCircle
            tabIndex={0}
            id={thisBlockObjectsState.filepath}
            onClick={(e) => {
              handleDeleteBlock(
                thisBlockObjectsState.parentsFilepath,
                thisBlockObjectsState.key
              );
            }}
            className={cn(
              'far fa-window-close',
              describeBlockStyles.describeClose
            )}
          />

          <div className={describeBlockStyles.describeInputContainer}>
            {/*<FormControl>
              <InputLabel>Describe:</InputLabel>
              <Input
                variant="standard"
                id={thisBlockObjectsState.filepath}
                className={describeBlockStyles.describeInput}
                name="describe-label"
                type="text"
                placeholder="What is the focus of your test(s)"
                value={thisBlockObjectsState.text}
                onChange={(e) => {
                  handleChange(e, 'text', thisBlockObjectsState.filepath);
                }}
                fullWidth={true}
              />
              </FormControl>*/}
            <div>Describe</div>
            {/*Code For implementing ${thisBlockObjectsState.filepath} as an input field. allow for people to make comments to go in their testfiles*/}

            <TextField
              variant="standard"
              id={`textFieldFor${thisBlockObjectsState}`}
              className={styles.describeInput}
              name="describe-label"
              type="text"
              placeholder="What is the focus of your test(s)"
              value={thisBlockObjectsState.text}
              onChange={(e) => {
                handleChange(e, 'text', thisBlockObjectsState.filepath);
              }}
              fullWidth
            />
          </div>

          <div className={describeBlockStyles.describeChildrenSection}>
            {setupTeardownBlock}

            <Button
              className={describeBlockStyles.addIt}
              id={thisBlockObjectsState.filepath}
              onClick={(e) => {
                handleAddBlock(
                  e,
                  'setupTeardown',
                  thisBlockObjectsState.filepath
                );
              }}
              variant="outlined"
            >
              Add Setup and Teardowns
            </Button>
          </div>
          <div className={describeBlockStyles.describeChildrenSection}>
            {arrayOfChildComponents}
          </div>
          <div className={describeBlockStyles.describeChildrenSection}>
            <Button
              className={describeBlockStyles.addIt}
              id={thisBlockObjectsState.filepath}
              onClick={(e) => {
                handleAddBlock(e, 'describe', thisBlockObjectsState.filepath);
              }}
              variant="outlined"
            >
              Add Nested Describe Block
            </Button>
          </div>
          <div className={describeBlockStyles.describeChildrenSection}>
            <Button
              className={describeBlockStyles.addIt}
              id={thisBlockObjectsState.filepath}
              onClick={(e) => {
                handleAddBlock(e, 'test', thisBlockObjectsState.filepath);
              }}
              variant="outlined"
            >
              Add It Statement
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescribeBlock;

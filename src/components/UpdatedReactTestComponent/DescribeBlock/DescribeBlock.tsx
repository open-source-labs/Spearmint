import React, { useContext } from 'react';
import cn from 'classnames';
import TestBlock from '../TestBlock/TestBlock';
import styles from './DescribeRenderer.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Button, TextField } from '@mui/material';
import { DescribeBlocks } from '../../../utils/reactTypes';
import { RTFsContexts } from '../../../context/RTFsContextsProvider';

// This is tracking your describe statements in a certain test, following the flow of data will help you
// better understand exactly how this is working

//needs updating
interface DescribeBlockProps {
  blockObjectsState: object;
  theme: string;
}

const DescribeBlock = ({ blockObjectsState, theme }) => {
  const thisBlockObjectsState = blockObjectsState;
  const { handleAddBlock, handleChange, handleDeleteBlock } =
    useContext(RTFsContexts);

  console.log('a new render');

  //function prepChildrenBlocksForRendering(stateObject){
  const childrenOfBlock = Object.values(thisBlockObjectsState.children).map(
    (childsStateObject) => {
      if (childsStateObject['objectType'] === 'describe') {
        return (
          <DescribeBlock
            blockObjectsState={childsStateObject}
            key={childsStateObject.filepath}
            theme={theme}
          />
        );
      } else if (childsStateObject['objectType'] === 'test') {
        return (
          <TestBlock
            blockObjectsState={childsStateObject}
            key={childsStateObject.filepath}
            theme={theme}
          />
        );
      }
    }
  );
  //}

  return (
    <>
      <div
        key={thisBlockObjectsState.filepath}
        className="describe-block"
        data-draggableid={thisBlockObjectsState.filepath}
        data-type="describe"
      >
        <div
          id={styles[`describeBlock${theme}`]}
          data-filepath={thisBlockObjectsState['filepath']}
        >
          {/* <label htmlFor='describe-label' className={styles.describeLabel}>
                Describe Block
              </label> */}

          <AiOutlineCloseCircle
            tabIndex={0}
            id={thisBlockObjectsState.filepath}
            onClick={(e) => {
              handleDeleteBlock(
                thisBlockObjectsState.filepath,
                thisBlockObjectsState.parentsFilepath
              );
            }}
            className={cn('far fa-window-close', styles.describeClose)}
          />

          {childrenOfBlock}
          <div className={styles.describeInputContainer}>
            <TextField
              variant="standard"
              id={thisBlockObjectsState.filepath}
              className={styles.describeInput}
              name="describe-label"
              type="text"
              placeholder="Describe name of test"
              value={thisBlockObjectsState.text}
              onChange={(e) => {
                handleChange(e, 'text', thisBlockObjectsState.filepath);
              }}
              fullWidth
            />
          </div>

          <Button
            className={styles.addIt}
            id={thisBlockObjectsState.filepath}
            onClick={(e) => {
              handleAddBlock(e, 'test', thisBlockObjectsState.filepath);
            }}
            variant="outlined"
          >
            Add It Statement
          </Button>
        </div>
        <p>POC</p>
        <Button
          className={styles.addIt}
          id={thisBlockObjectsState.filepath}
          onClick={(e) => {
            handleAddBlock(e, 'describe', thisBlockObjectsState.filepath);
          }}
          variant="outlined"
        >
          Add Nested Describe Block
        </Button>
      </div>
    </>
  );
};

export default DescribeBlock;

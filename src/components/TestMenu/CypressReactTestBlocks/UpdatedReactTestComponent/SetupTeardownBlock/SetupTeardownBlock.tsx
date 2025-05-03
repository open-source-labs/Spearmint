import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './SetupTeardownBlock.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Button } from '@mui/material';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { RTFsContexts } from '../../../context/RTFsContextsProvider';

interface SetupTeardownBlockProps {
  blockObjectsState: object;
  theme: string;
}
// using state like in the describe block

const SetupTeardownBlock: React.FC<SetupTeardownBlockProps> = ({
  blockObjectsState,
  key,
}) => {
  const [{ theme }] = useContext(GlobalContext);
  const { handleAddBlock, handleChange, handleDeleteBlock } =
    useContext(RTFsContexts);
  // ask donovan how to use the RTFsContexts
  return (
    <div
      key={blockObjectsState.key}
      className={styles.setupTeardownBlock}
      data-draggableid={blockObjectsState.key}
      data-type="setup-teardown"
    >
      <div
        id={styles[`setupTeardownBlock${theme}`]}
        data-filepath={blockObjectsState['filepath']}
      >
        <AiOutlineCloseCircle
          tabIndex={0}
          id={blockObjectsState.filepath}
          onClick={(e) => {
            handleDeleteBlock(
              blockObjectsState.filepath,
              blockObjectsState.parentsFilepath
            );
          }}
          className={styles.closeIcon}
        />

        <Button
          // creating buttons to add blocks

          className={styles.addButton}
          onClick={() =>
            handleAddBlock('beforeEach', blockObjectsState.filepath)
          }
          variant="outlined"
        >
          Add Before Each
        </Button>
        <Button
          className={styles.addButton}
          onClick={() =>
            handleAddBlock('afterEach', blockObjectsState.filepath)
          }
          variant="outlined"
        >
          Add After Each
        </Button>
        <Button
          className={styles.addButton}
          onClick={() =>
            handleAddBlock('beforeAll', blockObjectsState.filepath)
          }
          variant="outlined"
        >
          Add Before All
        </Button>
        <Button
          className={styles.addButton}
          onClick={() => handleAddBlock('afterAll', blockObjectsState.filepath)}
          variant="outlined"
        >
          Add After All
        </Button>
      </div>
    </div>
  );
};

export default SetupTeardownBlock;

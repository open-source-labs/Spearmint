import React from 'react';
import cn from 'classnames';
import ItRenderer from '../ItRenderer/ItRenderer';
import styles from './DescribeRenderer.module.scss';
import {
  deleteDescribeBlock,
  addItstatement,
} from '../../../context/actions/frontendFrameworkTestCaseActions';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Button, TextField } from '@mui/material';
import {
  DescribeBlocks,
  ItStatements,
  Statements,
} from '../../../utils/reactTestCase';

// This is tracking your describe statements in a certain test, following the flow of data will help you
// better understand exactly how this is working

interface DescribeRendererProps {
  dispatcher: React.Dispatch<{ type: string; describeId: any }>;
  describeBlocks: DescribeBlocks;
  itStatements: ItStatements;
  statements: Statements;
  handleChangeDescribeText: React.ChangeEventHandler<HTMLInputElement>;
  handleChangeItStatementText: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
  theme: string;
}

const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  statements,
  handleChangeDescribeText,
  handleChangeItStatementText,
  type,
  theme,
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
        <div key={id} data-draggableid={id} data-index={i} data-type="describe">
          <div id={styles[`describeBlock${theme}`]}>
            {/* <label htmlFor='describe-label' className={styles.describeLabel}>
                Describe Block
              </label> */}

            {i > 0 && (
              <AiOutlineCloseCircle
                tabIndex={0}
                id={id}
                onKeyPress={deleteReactDescribeBlockOnKeyUp}
                onClick={deleteDescribeBlockHandleClick}
                className={cn('far fa-window-close', styles.describeClose)}
              />
            )}

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
                name="describe-label"
                type="text"
                placeholder="Describe name of test"
                value={describeBlocks.byId[id]?.text}
                onChange={handleChangeDescribeText}
                fullWidth
              />
            </div>

            <ItRenderer
              type={type}
              forKey={`it-${id}-${i}`} //added by Cider to pass to key
              itStatements={itStatements}
              statements={statements}
              describeId={id}
              handleChangeItStatementText={handleChangeItStatementText}
              theme={theme}
            />

            <Button
              className={styles.addIt}
              id={id}
              onClick={addItStatementHandleClick}
              variant="outlined"
            >
              Add It Statement
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default DescribeRenderer;

import React from 'react';
import cn from 'classnames';
import ItRenderer from '../ItRenderer/ItRenderer';
import styles from './DescribeRenderer.module.scss';
import { deleteDescribeBlock, addItstatement } from '../../../context/actions/frontendFrameworkTestCaseActions';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Button, TextField } from '@mui/material';

const DescribeRenderer = ({
  dispatcher,
  describeBlocks,
  itStatements,
  statements,
  handleChangeDescribeText,
  handleChangeItStatementText,
  type,
  theme,
}) => {
  const deleteDescribeBlockHandleClick = (e) => {
    e.stopPropagation();
    const describeId = e.currentTarget.id;
    dispatcher(deleteDescribeBlock(describeId));
  };

  const deleteReactDescribeBlockOnKeyUp = (e) => {
    if (e.charCode === 13) {
      const describeId = e.target.id;
      dispatcher(deleteDescribeBlock(describeId));
    }
  };
  const addItStatementHandleClick = (e) => {
    const describeId = e.currentTarget.id;
    dispatcher(addItstatement(describeId));
  };

  return describeBlocks.allIds.map((id, i) => (
        <div
          id={styles[`describeBlock${theme}`]}
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
              value={describeBlocks.byId['describe'+i]?.text}
              onChange={handleChangeDescribeText}
              fullWidth />
          </div>

                <ItRenderer
                  type={type}
                  key={`it-${id}-${i}`}
                  itStatements={itStatements}
                  statements={statements}
                  describeId={id}
                  handleChangeItStatementText={handleChangeItStatementText}
                  theme={theme}
                />
          <Button className={styles.addIt} id={id} onClick={addItStatementHandleClick} variant="outlined">
            Add It Statement
          </Button>
        </div>
  ));
};

export default DescribeRenderer;

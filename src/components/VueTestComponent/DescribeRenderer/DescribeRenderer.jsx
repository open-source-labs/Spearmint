import React from 'react';
import cn from 'classnames';
import ItRenderer from '../ItRenderer/ItRenderer';
import styles from '../../ReactTestComponent/DescribeRenderer/DescribeRenderer.module.scss';
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

  const deleteVueDescribeBlockOnKeyUp = (e) => {
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
    <div key={id} draggableId={id} index={i} type='describe'>
        <div
          id={styles[`describeBlock${theme}`]}
        >

          { i > 0 && <AiOutlineCloseCircle
            tabIndex={0}
            id={id} 
            onKeyPress={deleteVueDescribeBlockOnKeyUp}
            onClick={deleteDescribeBlockHandleClick}
            className={cn('far fa-window-close', styles.describeClose)}
          /> }

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
    </div>
  ));
};

export default DescribeRenderer;

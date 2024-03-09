import React, { useContext } from 'react';
import cn from 'classnames';
import VueTestStatements from '../../TestCase/VueTestStatements';
import {
  addRender,
  addAction,
  addAssertion,
  deleteItStatement,
} from '../../../context/actions/frontendFrameworkTestCaseActions';
import { VueTestCaseContext } from '../../../context/reducers/vueTestCaseReducer';
import styles from '../../ReactTestComponent/ItRenderer/ItRenderer.module.scss';
import { Button, TextField } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

const ItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  handleChangeItStatementText,
  theme,
}) => {
  const [, dispatchToVueTestCase] = useContext(VueTestCaseContext);

  const addRenderHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToVueTestCase(addRender(describeId, itId));
  };

  const deleteItStatementHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToVueTestCase(deleteItStatement(describeId, itId));
  };

  const deleteVueItStatementOnKeyUp = (e) => {
    if (e.charCode === 13) {
      const itId = e.currentTarget.id;
      dispatchToVueTestCase(deleteItStatement(describeId, itId));
    }
  }
  const addActionHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToVueTestCase(addAction(describeId, itId));
  };
  const addAssertionHandleClick = (e) => {
    const itId = e.currentTarget.id;
    dispatchToVueTestCase(addAssertion(describeId, itId));
  };

  return itStatements.allIds[describeId].map((id, i) => (
    <div
      key={id}
      draggableId={id}
      index={i}
    >
        <div
          id={styles[`ItRenderer${theme}`]}
        >
          <AiOutlineClose
            tabIndex={0}
            id={id} 
            onKeyPress={deleteVueItStatementOnKeyUp}
            onClick={deleteItStatementHandleClick}
            className={cn(styles.itClose, 'far fa-window-close')}
          />
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
          <VueTestStatements
            key={`statement-${id}-${i}`}
            statements={statements}
            itId={id}
            describeId={describeId}
          />
          <div>
            {type === 'vue' && (
              <div className={styles.buttonsContainer}>
                <Button id={id} onClick={addRenderHandleClick} className={styles.reactButton} variant="outlined">
                  Add Render
                </Button>
                <Button id={id} onClick={addActionHandleClick} className={styles.reactButton} variant="outlined">
                  Add Action
                </Button>
                <Button id={id} onClick={addAssertionHandleClick} className={styles.reactButton} variant="outlined">
                Add Assertion
              </Button>
              </div>
            )}
          </div>
        </div>
      </div>
  ));
};

export default ItRenderer;

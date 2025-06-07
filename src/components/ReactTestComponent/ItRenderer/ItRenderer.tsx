import React, { useContext } from 'react';
import cn from 'classnames';
import ReactTestStatements from '../../TestCase/ReactTestStatements';
import {
  addRender,
  addAction,
  addAssertion,
  deleteItStatement,
} from '../../../context/actions/frontendFrameworkTestCaseActions';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import styles from './ItRenderer.module.scss';
import { Button, TextField } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { ItStatements, Statements } from '../../../utils/reactTestCase';

// This is tracking the it statements you have in a certain test, following the flow of data will
// help you better understand exactly how this works

interface ItRendererProps {
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

const ItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  forKey, //added by Cider to handle key
  handleChangeItStatementText,
  theme,
}: ItRendererProps) => {
  const [, dispatchToReactTestCase] = useContext(ReactTestCaseContext);

  const addRenderHandleClick = (e: React.MouseEvent) => {
    const itId = e.currentTarget.id;
    dispatchToReactTestCase(addRender(describeId, itId));
  };

  const deleteItStatementHandleClick = (e: React.MouseEvent) => {
    const itId = e.currentTarget.id;
    dispatchToReactTestCase(deleteItStatement(describeId, itId));
  };

  const deleteReactItStatementOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.charCode === 13) {
      const itId = e.currentTarget.id;
      dispatchToReactTestCase(deleteItStatement(describeId, itId));
    }
  };
  const addActionHandleClick = (e: React.MouseEvent) => {
    const itId = e.currentTarget.id;
    dispatchToReactTestCase(addAction(describeId, itId));
  };
  const addAssertionHandleClick = (e: React.MouseEvent) => {
    const itId = e.currentTarget.id;
    dispatchToReactTestCase(addAssertion(describeId, itId));
  };

  return (
    <>
      {itStatements.allIds[describeId].map((id: string, i: number) => (
        <div id={styles[`ItRenderer${theme}`]} key={forKey}>
          <AiOutlineClose
            tabIndex={0}
            id={id}
            onKeyPress={deleteReactItStatementOnKeyUp}
            onClick={deleteItStatementHandleClick}
            className={cn(styles.itClose, 'far fa-window-close')}
          />
          <div id={styles.itInputContainer}>
            <TextField
              key={`input-${id}-${i}`}
              id={id}
              className={styles.describeInput}
              name="describe-label"
              type="text"
              placeholder="Enter unit test name..."
              value={itStatements.byId[id].text}
              onChange={handleChangeItStatementText}
              fullWidth
              variant="filled"
              size="small"
            />
          </div>

          <ReactTestStatements
            key={`statement-${id}-${i}`}
            statements={statements}
            itId={id}
            describeId={describeId}
          />
          <div>
            {type === 'react' && (
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
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ItRenderer;

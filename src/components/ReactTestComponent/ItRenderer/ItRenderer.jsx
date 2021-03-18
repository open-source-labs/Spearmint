import React, { useContext } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import ReactTestStatements from '../../TestCase/ReactTestStatements';
import CustomInput from '../CustomInput/CustomInput';
import {
  addRender,
  addAction,
  addAssertion,
  deleteItStatement,
} from '../../../context/actions/reactTestCaseActions';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import styles from './ItRenderer.module.scss';

const ItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  handleChangeItStatementText,
}) => {
  const [, dispatchToReactTestCase] = useContext(ReactTestCaseContext);

  const addRenderHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToReactTestCase(addRender(describeId, itId));
  };

  const deleteItStatementHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToReactTestCase(deleteItStatement(describeId, itId));
  };
  const addActionHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToReactTestCase(addAction(describeId, itId));
  };
  const addAssertionHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToReactTestCase(addAssertion(describeId, itId));
  };

  return itStatements.allIds[describeId].map((id, i) => (
    <Draggable
      key={id}
      draggableId={id}
      index={i}
      // type={describeId} // passed down automatically
    >
      {(provided) => (
        <div
          id={styles.ItRenderer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <i
            onClick={deleteItStatementHandleClick}
            id={id}
            className={cn(styles.itClose, 'far fa-window-close')}
          ></i>
          <CustomInput
            key={`input-${id}-${i}`}
            id={id}
            label={'The component should...'}
            placeholder={'Button component renders correctly...'}
            value={itStatements.byId[id].text}
            handleChange={handleChangeItStatementText}
          />
          <hr />
          <ReactTestStatements
            key={`statement-${id}-${i}`}
            statements={statements}
            itId={id}
            describeId={describeId}
          />
          <div>
            {type === 'react' && (
              <div className={styles.buttonsContainer}>
                <button id={id} onClick={addRenderHandleClick} className={styles.reactButton}>
                  <i className='fas fa-plus'></i>
                  Render
                </button>
                <button id={id} onClick={addActionHandleClick} className={styles.reactButton}>
                  <i className='fas fa-plus'></i>
                  Action
                </button>
                <button id={id} onClick={addAssertionHandleClick} className={styles.reactButton}>
                  <i className='fas fa-plus'></i>
                  Assertion
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  ));
};

export default ItRenderer;

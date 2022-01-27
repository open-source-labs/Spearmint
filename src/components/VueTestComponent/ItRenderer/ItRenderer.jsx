import React, { useContext } from 'react';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import VueTestStatements from '../../TestCase/VueTestStatements';
import CustomInput from '../CustomInput/CustomInput';
import {
  addRender,
  addAction,
  addAssertion,
  deleteItStatement,
} from '../../../context/actions/vueTestCaseActions';
import { VueTestCaseContext } from '../../../context/reducers/vueTestCaseReducer';
import styles from './ItRenderer.module.scss';

const ItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  handleChangeItStatementText,
}) => {
  const [, dispatchToVueTestCase] = useContext(VueTestCaseContext);

  const addRenderHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToVueTestCase(addRender(describeId, itId));
  };

  const deleteItStatementHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToVueTestCase(deleteItStatement(describeId, itId));
  };

  const deleteVueItStatementOnKeyUp = (e) => {
    if (e.charCode === 13) {
      const itId = e.target.id;
      dispatchToVueTestCase(deleteItStatement(describeId, itId));
    }
  }
  const addActionHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToVueTestCase(addAction(describeId, itId));
  };
  const addAssertionHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToVueTestCase(addAssertion(describeId, itId));
  };

  return itStatements.allIds[describeId].map((id, i) => (
    <Draggable
      key={id}
      draggableId={id}
      index={i}
    >
      {(provided) => (
        <div
          id={styles.ItRenderer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <i
            tabIndex={0}
            onKeyPress={deleteVueItStatementOnKeyUp}
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
          <VueTestStatements
            key={`statement-${id}-${i}`}
            statements={statements}
            itId={id}
            describeId={describeId}
          />
          <div>
            {type === 'vue' && (
              <div className={styles.buttonsContainer}>
                <button id={id} onClick={addRenderHandleClick} className={styles.reactButton}>
                  <i className='fas fa-plus'></i>
                  Mount
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

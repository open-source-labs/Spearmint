import React, { useContext } from 'react';
import ReactTestStatements from '../../containers/LeftPanel/TestCase/ReactTestStatements';
import CustomInput from '../CustomInput/CustomInput';
import { addRender, addAction, addAssertion } from '../../context/reactTestCaseActions';
import { ReactTestCaseContext } from '../../context/reactTestCaseReducer';
import styles from './ItRenderer.module.scss';

const ItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  handleChangeItStatementText,
}) => {
  const [{}, dispatchToReactTestCase] = useContext(ReactTestCaseContext);

  // filter out ids not belonging to the correct describe block
  const filteredIds = itStatements.allIds.filter((id) => {
    return itStatements.byId[id].describeId === describeId;
  });

  const addRenderHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToReactTestCase(addRender(describeId, itId));
  };
  const addActionHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToReactTestCase(addAction(describeId, itId));
  };
  const addAssertionHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToReactTestCase(addRender(describeId, itId));
  };

  return filteredIds.map((id, i) => (
    <div id={styles.ItRenderer}>
      <CustomInput
        key={`input-${id}-${i}`}
        id={id}
        label={'The component should...'}
        placeholder={'Button component renders correctly...'}
        value={itStatements.byId[id].text}
        handleChange={handleChangeItStatementText}
      />
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
              <i class='fas fa-plus'></i>
              Render
            </button>
            <button id={id} onClick={addActionHandleClick} className={styles.reactButton}>
              <i class='fas fa-plus'></i>
              Action
            </button>
            <button id={id} onClick={addAssertionHandleClick} className={styles.reactButton}>
              <i class='fas fa-plus'></i>
              Assertion
            </button>
          </div>
        )}
      </div>
    </div>
  ));
};

export default ItRenderer;

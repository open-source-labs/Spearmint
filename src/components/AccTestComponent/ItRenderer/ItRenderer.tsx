import React, { useContext } from 'react';
import cn from 'classnames';
// ---> is this for mock data and not needed?
import { AccessibilityTestCaseContext } from '../../../context/reducers/accessibilityTestCaseReducer';

import AccessibilityTestStatements from '../../TestCase/AccessibilityTestStatements';

import {
  deleteItStatement,
} from '../../../context/actions/accessibilityTestCaseActions';

import CustomInput from '../CustomInput/CustomInput';
// import customStyles from './CustomInput.module.scss';
import styles from './ItRenderer.module.scss';

const ItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  handleChangeItStatementText,
}) => {
  const [, dispatchToAccessibilityTestCase] = useContext(AccessibilityTestCaseContext);

  // filter out ids not belonging to the correct describe block
  const filteredIds = itStatements.allIds.filter((id) => {
    return itStatements.byId[id].describeId === describeId;
  });

  const deleteItStatementHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToReactTestCase(deleteItStatement(describeId, itId));
  };

  return filteredIds.map((id, i) => (
    <div id={styles.ItRenderer} key={i}>
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
  
    </div>
  ));
};

export default ItRenderer;

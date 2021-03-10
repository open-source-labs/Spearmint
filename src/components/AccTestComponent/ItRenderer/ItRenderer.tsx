import React, { useContext } from 'react';
import cn from 'classnames';

import { accTestCaseContext } from '../../../context/reducers/accTestCaseReducer';

// test case statements are for action, assertion, and render options
// import AccTestStatements from '../../TestCase/AccTestStatements';

import {
  deleteItStatement,
} from '../../../context/actions/accTestCaseActions';

import CustomInput from '../CustomInput/CustomInput';

// ### i added this file... may not be necessary
// import customStyles from './CustomInput.module.scss';

import styles from './ItRenderer.module.scss';

const ItRenderer = ({
  type,
  itStatements,
  describeId,
  statements,
  handleChangeItStatementText,
}) => {

  const [, dispatchToAccTestCase] = useContext(accTestCaseContext);

  // filter out ids not belonging to the correct describe block
  // ### do we need this?
  const filteredIds = itStatements.allIds.filter((id) => {
    return itStatements.byId[id].describeId === describeId;
  });


  const deleteItStatementHandleClick = (e) => {
    const itId = e.target.id;
    dispatchToAccTestCase(deleteItStatement(describeId, itId));
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
        label={'The element should...'}
        placeholder={'The tested element should...'}
        value={itStatements.byId[id].text}
        handleChange={handleChangeItStatementText}
      />

      <hr />
 
    </div>
  ));
};

export default ItRenderer;


// ## stretch use?
// <ReactTestStatements
//   key={`statement-${id}-${i}`}
//   statements={statements}
//   itId={id}
//   describeId={describeId}
// /> 
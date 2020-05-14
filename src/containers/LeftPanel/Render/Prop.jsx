/**
 * ?
 */

import React from 'react';
import styles from '../Render/Prop.module.scss';
import { deleteProp, updateProp } from '../../../context/reactTestCaseActions';
import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';

const minusIcon = require('../../../assets/images/minus-box-outline.png');

const Prop = ({ statementId, propId, propKey, propValue, dispatchToTestCase }) => {
  const handleClickDeleteProp = e => {
    e.stopPropagation();
    dispatchToTestCase(deleteProp(statementId, propId));
  };

  const handleChangeUpdatePropKey = e => {
    e.stopPropagation();
    dispatchToTestCase(updateProp(statementId, propId, e.target.value, propValue));
  };

  return (
    <div id={styles.renderPropsFlexBox}>
      <input type='text' id='propKey' value={propKey} onChange={handleChangeUpdatePropKey} />
      <AutoCompleteMockData
        id='propValue'
        propType='prop'
        renderId={statementId}
        propId={propId}
        propKey={propKey}
        dispatchToTestCase={dispatchToTestCase}
      />
      <img src={minusIcon} alt='delete' onClick={handleClickDeleteProp} />
    </div>
  );
};

export default Prop;

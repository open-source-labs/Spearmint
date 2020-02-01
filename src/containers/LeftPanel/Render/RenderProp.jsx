/**
 * ?
 */

import React from 'react';
import styles from '../Render/RenderProp.module.scss';
import styles2 from '../AutoComplete/AutoCompleteMockData.module.scss';
import { deleteRenderProp, updateRenderProp } from '../../../context/testCaseActions';
import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';

const minusIcon = require('../../../assets/images/minus-box-outline.png');

const RenderProp = ({ renderId, propId, propKey, propValue, dispatchToTestCase }) => {
  const handleClickDeleteProp = e => {
    e.stopPropagation();
    dispatchToTestCase(deleteRenderProp(renderId, propId));
  };

  const handleChangeUpdatePropKey = e => {
    e.stopPropagation();
    dispatchToTestCase(updateRenderProp(renderId, propId, e.target.value, propValue));
  };

  return (
    <div id={styles.renderPropsFlexBox}>
      <input type='text' id='propKey' value={propKey} onChange={handleChangeUpdatePropKey} />
      <AutoCompleteMockData
        id='propValue'
        propType='prop'
        renderId={renderId}
        propId={propId}
        propKey={propKey}
        dispatchToTestCase={dispatchToTestCase}
      />
      {/* <input type='text' id='propValue' value={propValue} onChange={handleChangeUpdatePropValue} /> */}
      <img src={minusIcon} alt='delete' onClick={handleClickDeleteProp} />
    </div>
  );
};

export default RenderProp;

import React from 'react';
import styles from '../Render/RenderProp.module.scss';
import {
  addRenderProp,
  deleteRenderProp,
  updateRenderProp,
} from '../../../context/testCaseActions';
const minusIcon = require('../../../assets/images/minus-box-outline.png');
const plusIcon = require('../../../assets/images/plus.png');

const RenderProp = ({ dispatchToTestCase, renderId, propId, propKey, propValue }) => {
  const handleClickAddProp = () => {
    dispatchToTestCase(addRenderProp(renderId));
  };

  const handleClickDeleteProp = e => {
    e.stopPropagation();
    dispatchToTestCase(deleteRenderProp(renderId, propId));
  };

  const handleChangeUpdatePropKey = e => {
    e.stopPropagation();
    dispatchToTestCase(updateRenderProp(renderId, propId, e.target.value, propValue));
  };

  const handleChangeUpdatePropValue = e => {
    e.stopPropagation();
    dispatchToTestCase(updateRenderProp(renderId, propId, propKey, e.target.value));
  };

  return (
    <div id={styles.renderProp}>
      <div id={styles.renderPropHeader}>
        <h4>Props</h4>
        <img src={plusIcon} alt='add' onClick={handleClickAddProp} />
      </div>
      <div id={styles.renderPropsFlexBox}>
        <div>
          <label htmlFor='prop-key'>key</label>
          <input type='text' id='propKey' onChange={handleChangeUpdatePropKey} />
        </div>
        <div>
          <label htmlFor='prop-value'>value</label>
          <input type='text' id='propValue' onChange={handleChangeUpdatePropValue} />
        </div>
        <img src={minusIcon} alt='delete' onClick={handleClickDeleteProp} />
      </div>
    </div>
  );
};

export default RenderProp;

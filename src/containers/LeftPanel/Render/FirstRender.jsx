import React, { useState, useContext } from 'react';
import styles from './Render.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { setFilePath, setComponentName } from '../../../context/globalActions';
import { deleteRender, updateRender, addRenderProp } from '../../../context/testCaseActions';
import RenderProp from './RenderProp';

const plusIcon = require('../../../assets/images/plus.png');

const FirstRender = ({ render, dispatchToTestCase }) => {
  const [{ filePath, componentName }, dispatchToGlobal] = useContext(GlobalContext);
  const handleClickDelete = e => {
    e.stopPropagation();
    dispatchToTestCase(deleteRender(render.id));
  };

  const handleChangeComponentName = e => {
    dispatchToGlobal(setComponentName(e.target.value));
    dispatchToTestCase(updateRender(render.id, e.target.value, filePath));
    if (filePath) {
      dispatchToGlobal(setFilePath(null));
    }
  };

  const handleToggleProps = () => {
    dispatchToTestCase(addRenderProp(render.id));
  };

  const handleClickAddProp = () => {
    dispatchToTestCase(addRenderProp(render.id));
  };

  const propsJSX = render.props.map(prop => {
    return (
      <RenderProp
        key={prop.id}
        renderId={render.id}
        propId={prop.id}
        propKey={prop.propKey}
        propValue={prop.propValue}
        dispatchToTestCase={dispatchToTestCase}
      />
    );
  });

  return (
    <section id={styles.render}>
      <div id={styles.renderHeader}>
        <h3>{render.id === 0 ? 'Render' : 'Rerender'}</h3>
      </div>
      <div>
        <label htmlFor='render-input-box'>Component Name</label>
        <input
          type='text'
          id='render-input-box'
          value={componentName}
          onChange={handleChangeComponentName}
        />
        <label htmlFor='render-checkbox'>Props</label>
        <input
          type='checkbox'
          id='render-checkbox'
          disabled={propsJSX.length}
          onClick={handleToggleProps}
        />
      </div>
      {propsJSX.length !== 0 && (
        <div id={styles.renderProp}>
          {/* <div id={styles.propLabelHeader}> */}
          <label htmlFor='prop-key' id={styles.propKeyLabel}>
            Prop key
          </label>
          <label htmlFor='prop-value' id={styles.propValLabel}>
            Prop value
          </label>
          <br />
          <hr />
          {/* </div> */}
          {propsJSX}
          <button onClick={handleClickAddProp} id={styles.addPropBtn}>
            <img src={plusIcon} alt='add' />
            Add Prop
          </button>
        </div>
      )}
    </section>
  );
};

export default FirstRender;

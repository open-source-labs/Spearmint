import React, { useState, useContext } from 'react';
import styles from './Render.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { setFilePath, setComponentName } from '../../../context/globalActions';
import { deleteRender, updateRender, addRenderProp } from '../../../context/testCaseActions';
import RenderProp from './RenderProp';

const plusIcon = require('../../../assets/images/plus.png');
const closeIcon = require('../../../assets/images/close.png');

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
      {render.id !== 0 ? (
        <img src={closeIcon} id={styles.closeBtn} alt='close' onClick={handleClickDelete} />
      ) : (
        <p />
      )}
      <div id={styles.renderHeader}>
        <h3>{render.id === 0 ? 'Render' : 'Rerender'}</h3>
      </div>
      <div id={styles.renderBody}>
        <div>
          <label htmlFor='renderInputBox'>Component Name</label>
          <input
            type='text'
            id={styles.renderInputBox}
            value={componentName}
            onChange={handleChangeComponentName}
          />
        </div>
        <div id={styles.renderCheckbox}>
          <input
            type='checkbox'
            id='render-checkbox'
            disabled={propsJSX.length}
            onClick={handleToggleProps}
          />
          <label htmlFor='render-checkbox'>Do you pass props ? </label>
        </div>
      </div>
      {propsJSX.length !== 0 && (
        <div>
          <div id={styles.renderProp}>
            <label htmlFor='prop-key' id={styles.propKeyLabel}>
              Prop key
            </label>
            <label htmlFor='prop-value' id={styles.propValLabel}>
              Prop value
            </label>
          </div>
          <hr />
          {propsJSX}
          <div id={styles.props}>
            <button id={styles.addPropBtn} onClick={handleClickAddProp}>
              <img src={plusIcon} alt='add' />
              Add Prop
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FirstRender;

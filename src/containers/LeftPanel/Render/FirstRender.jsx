import React, { useState, useContext } from 'react';
import styles from './Render.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { setFilePath, setComponentName } from '../../../context/globalActions';
import { deleteRender, updateRender, addRenderProp } from '../../../context/testCaseActions';
import RenderProp from './RenderProp';

const minusIcon = require('../../../assets/images/minus-box.png');
const plusIcon = require('../../../assets/images/plus.png');

const FirstRender = ({ id, props, dispatchToTestCase }) => {
  const [{ filePath, componentName }, dispatchToGlobal] = useContext(GlobalContext);
  const [toggleProps, setToggleProps] = useState(false);
  const handleClickDelete = e => {
    dispatchToTestCase(deleteRender(id));
  };

  const handleChangeComponentName = e => {
    dispatchToGlobal(setComponentName(e.target.value));
    dispatchToTestCase(updateRender(id, e.target.value, filePath));
    if (filePath) {
      dispatchToGlobal(setFilePath(null));
    }
  };

  const handleToggleProps = () => {
    setToggleProps(!toggleProps);
    dispatchToTestCase(addRenderProp(id));
  };

  const handleClickAddProp = () => {
    dispatchToTestCase(addRenderProp(id));
  };

  const propsJSX = props.map(prop => {
    return (
      <RenderProp
        key={prop.id}
        renderId={id}
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
        <h3>{id === 0 ? 'Render' : 'Rerender'}</h3>
        {id !== 0 && <img src={minusIcon} alt='' onClick={handleClickDelete} />}
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
      {toggleProps && (
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
            <img src={plusIcon} />
            Add Prop
          </button>
        </div>
      )}
    </section>
  );
};

export default FirstRender;

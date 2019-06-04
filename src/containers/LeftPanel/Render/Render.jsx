import React, { useState, useContext } from 'react';
import styles from './Render.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { setFilePath, setComponentName } from '../../../context/globalActions';
import { deleteRender, updateRender, addRenderProp } from '../../../context/testCaseActions';
import RenderProp from './RenderProp';

const minusIcon = require('../../../assets/images/minus-box.png');

const Render = ({ id, dispatchToTestCase, props, isRerender }) => {
  const [{ filePath, componentName }, dispatchToGlobal] = useContext(GlobalContext);
  const [toggleProps, setToggleProps] = useState(false);

  const handleClickDelete = e => {
    dispatchToTestCase(deleteRender(id));
  };

  const handleChangeComponentName = e => {
    dispatchToGlobal(setComponentName(e.target.value));
    if (filePath) {
      dispatchToTestCase(updateRender(id, e.target.value, filePath));
      dispatchToGlobal(setFilePath(null));
    }
  };

  const handleToggleProps = () => {
    setToggleProps(!toggleProps);
    dispatchToTestCase(addRenderProp(id));
  };

  const propsJSX = props.map(prop => {
    return (
      <RenderProp
        key={id}
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
        <h3>{!isRerender ? 'Render' : 'Rerender'}</h3>
        <img src={minusIcon} alt='' onClick={handleClickDelete} />
      </div>
      <div id={styles.renderProp}>
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
      {toggleProps && propsJSX}
    </section>
  );
};

export default Render;

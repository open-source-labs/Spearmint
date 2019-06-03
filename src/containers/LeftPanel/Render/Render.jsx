import React, { useState, useContext } from 'react';
import styles from '../Render/Render.module.scss';
import RenderProp from './RenderProp';
import { ComponentNameContext, FilePathContext } from '../../../App';
import { deleteRender, updateRender, addRenderProp } from '../../../context/testCaseActions';
const minusIcon = require('../../../assets/images/minus-box-outline.png');

const Render = ({ id, dispatchTestCase, props, reRender }) => {
  const [toggleProps, setToggleProps] = useState(false);
  const [filePath, setFilePath] = useContext(FilePathContext);
  const [componentName, setComponentName] = useContext(ComponentNameContext);
  const handleClickDelete = e => {
    dispatchTestCase(deleteRender(id));
  };

  const handleChange = e => {
    setComponentName(e.target.value);
    if (filePath) {
      dispatchTestCase(updateRender(id, e.target.value, filePath));
      setFilePath(null);
    }
  };

  const handleToggleProps = () => {
    setToggleProps(!toggleProps);
    dispatchTestCase(addRenderProp(id));
  };

  const propsJSX = props.map(prop => {
    return (
      <RenderProp
        key={id}
        renderId={id}
        propId={prop.id}
        propKey={prop.propKey}
        propValue={prop.propValue}
        dispatchTestCase={dispatchTestCase}
      />
    );
  });
  return (
    <section id={styles.render}>
      <div id={styles.renderHeader}>
        <h3>{!reRender ? 'Render' : 'Rerender'}</h3>
        <img src={minusIcon} alt='' onClick={handleClickDelete} />
      </div>
      <div>
        <label htmlFor='render-input-box'>Component Name</label>
        <input type='text' id='render-input-box' value={componentName} onChange={handleChange} />
      </div>
      <div>
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

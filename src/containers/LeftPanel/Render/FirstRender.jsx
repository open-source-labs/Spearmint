import React, { useState, useContext } from 'react';
import styles from './Render.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { setFilePath, setComponentName } from '../../../context/globalActions';
import { deleteRender, updateRender, addRenderProp } from '../../../context/testCaseActions';
import RenderProp from './RenderProp';

const minusIcon = require('../../../assets/images/minus-box.png');

const FirstRender = ({ render, dispatchToTestCase }) => {
  const [{ filePath, componentName }, dispatchToGlobal] = useContext(GlobalContext);
  const [toggleProps, setToggleProps] = useState(false);
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
    setToggleProps(!toggleProps);
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
        {render.id !== 0 && <img src={minusIcon} alt='' onClick={handleClickDelete} />}
      </div>
      <div>
        <label htmlFor='render-input-box'>Component Name</label>
        <input
          type='text'
          id='render-input-box'
          value={componentName}
          onChange={handleChangeComponentName}
        />
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

export default FirstRender;

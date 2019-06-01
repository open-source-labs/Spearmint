import React, { useState, useContext } from 'react';
import RenderProp from './RenderProp';
import { ComponentNameContext, FilePathContext, ReceivedFilePathContext } from '../../../App';
import { deleteRender, updateRender, addRenderProp } from '../../../context/testCaseActions';
const minusIcon = require('../../../assets/images/minus-box.png');

const Render = ({ id, dispatchTestCase, props }) => {
  const [componentName, setComponentName] = useState('');
  const [toggleProps, setToggleProps] = useState(false);

  const getComponentName = useContext(ComponentNameContext);
  const [filePath, setFilePath] = useContext(FilePathContext);

  const handleClickDelete = e => {
    dispatchTestCase(deleteRender(id));
  };

  const handleChange = e => {
    setComponentName(e.target.value);
    getComponentName(e.target.value);
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
      />
    );
  });
  return (
    <section>
      <h3>Render</h3>
      <img src={minusIcon} onClick={handleClickDelete} />
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

import React, { useContext } from 'react';
import styles from './Render.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { TestCaseContext } from '../../../context/testCaseReducer';

import {
  deleteRender,
  updateRenderComponent,
  addRenderProp,
} from '../../../context/testCaseActions';
import RenderProp from './RenderProp';

const plusIcon = require('../../../assets/images/plus.png');

const FirstRender = ({ render }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);
  const [{ statements }, dispatchToTestCase] = useContext(TestCaseContext);

  const handleChangeComponentName = e => {
    const componentName = e.target.value;
    dispatchToTestCase(updateRenderComponent(componentName, filePathMap[componentName]));
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
          value={statements[0].componentName}
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
          <label htmlFor='prop-key' id={styles.propKeyLabel}>
            Prop key
          </label>
          <label htmlFor='prop-value' id={styles.propValLabel}>
            Prop value
          </label>
          <br />
          <hr />
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

/**
 * functionlity to add and update props for the render
 */

import React, { useContext } from 'react';
import styles from './Render.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import { ReactTestCaseContext } from '../../../context/reactTestCaseReducer';

import {
  deleteRender,
  updateRenderComponent,
  addRenderProp,
} from '../../../context/reactTestCaseActions';
import RenderProp from './RenderProp';

const plusIcon = require('../../../assets/images/plus.png');
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const Render = ({ statementId, describeId, itId }) => {
  const [{ filePathMap }] = useContext(GlobalContext);
  const [{ statements }, dispatchToReactTestCase] = useContext(ReactTestCaseContext);

  const handleToggleProps = () => {
    dispatchToReactTestCase(addRenderProp(statementId.id));
  };

  const handleClickAddProp = () => {
    dispatchToReactTestCase(addRenderProp(statementId));
  };

  const handleClickDeleteRender = () => {
    dispatchToReactTestCase(deleteRender(statementId));
  };

  return (
    <div id={styles.RenderContainer}>
      <div className={styles.renderHeader}>
        <span className={styles.header}>Rendering: <span>{statements.componentName}</span> </span>
        <button className={styles.addProps}>
          <i class='fas fa-plus'></i> Add Props
        </button>
        <i onClick={handleClickDeleteRender} className='far fa-window-close'></i>
      </div>
      <div className={styles.renderInputs}>
      </div>
    </div>
  );
};

export default Render;

// const propsJSX = statementId.props.map(prop => {
//   return (
//     <RenderProp
//       key={prop.id}
//       renderId={statementId.id}
//       propId={prop.id}
//       propKey={prop.propKey}
//       propValue={prop.propValue}
//       dispatchToTestCase={dispatchToTestCase}
//     />
//   );
// });

// <div>{statementId}</div>

// <section data-testid='renderCard' id={styles.render}>
//  {statementId.id !== 0 && (
//      <img src={closeIcon} id={styles.closeBtn} alt='close' onClick={handleClickDeleteRender} />
//    )}
//    <div id={styles.renderHeader}>
//      {statementId.id !== 0 && <img src={dragIcon} alt='drag' />}
//      <h3>{statementId.id === 0 ? 'Render' : 'Rerender'}</h3>
//    </div>
//    <div id={styles.renderBody}>
//     <div>
//        <label htmlFor='renderInputBox'>Component Name</label>
//        <input
//          type='text'
//          id={styles.renderInputBox}
//         //  value={statements[0].componentName}
//          onChange={handleChangeComponentName}
//        />
//      </div>
//      <div id={styles.renderCheckbox}>
//        <input
//          type='checkbox'
//          id='render-checkbox'
//          // disabled={propsJSX.length}
//          checked={hasProp}
//          onClick={handleToggleProps}
//        />
//        <label htmlFor='render-checkbox'>Do you need props? </label>
//      </div>
//    </div>
//  </section>

//    {propsJSX.length !== 0 && (
//     <div>
//       <div id={styles.renderProp}>
//         <label htmlFor='prop-key' id={styles.propKeyLabel}>
//           Prop key
//         </label>
//         <label htmlFor='prop-value' id={styles.propValLabel}>
//           Prop value
//         </label>
//       </div>
//       <hr />
//       {propsJSX}
//       <div id={styles.props}>
//         <button id={styles.addPropBtn} onClick={handleClickAddProp}>
//           <img src={plusIcon} alt='add' />
//           Add Prop
//         </button>
//       </div>
//     </div>
//   )}

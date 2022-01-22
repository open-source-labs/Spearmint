/**
 * functionlity to add and update props for the render
 */

import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './Render.module.scss';
import { VueTestCaseContext } from '../../../context/reducers/vueTestCaseReducer';

import { deleteRender, addProp } from '../../../context/actions/vueTestCaseActions';
import Prop from './Prop';

const Render = ({ statement, statementId, describeId, itId }) => {
  const [{ statements }, dispatchToVueTestCase] = useContext(VueTestCaseContext);

  const handleClickAddProp = () => {
    dispatchToVueTestCase(addProp(statementId));
  };

  const handleClickDeleteRender = () => {
    dispatchToVueTestCase(deleteRender(statementId));
  };

  return (
    <div id={styles.RenderContainer}>
      <div className={styles.renderHeader}>
        <span className={styles.header}>
          Rendering: <span style={{ color: 'black' }}>{statements.componentName}</span>
        </span>
        <button className={styles.addProps} onClick={handleClickAddProp}>
          <i className='fas fa-plus'></i> Add Props
        </button>
        <i
          onClick={handleClickDeleteRender}
          className={cn(styles.deleteRender, 'far fa-window-close')}
        ></i>
      </div>
      <div className={'props'}>
        {statement.props.length > 0 && (
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
            {statement.props.map((prop, i) => {
              return (
                <Prop
                  statementId={statementId}
                  key={`prop-${prop.id}-${i}`}
                  propId={prop.id}
                  propKey={prop.propKey}
                  propValue={prop.propValue}
                  dispatchToTestCase={dispatchToVueTestCase}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Render;

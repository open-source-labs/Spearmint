/**
 * functionlity to add and update props for the render
 */

import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './Render.module.scss';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';

import { deleteRender, addProp } from '../../../context/actions/reactTestCaseActions';
import Prop from './Prop';
import { Button } from '@material-ui/core';
const closeIcon = require('../../../assets/images/close.png');

const Render = ({ statement, statementId, describeId, itId }) => {
  const [{ statements }, dispatchToReactTestCase] = useContext(ReactTestCaseContext);

  const handleClickAddProp = () => {
    dispatchToReactTestCase(addProp(statementId));
  };

  const handleClickDeleteRender = () => {
    dispatchToReactTestCase(deleteRender(statementId));
  };

  return (
    <div id={styles.RenderContainer}>
      <div className={styles.renderHeader}>
        <span className={styles.header}>
          Rendering: <span style={{ color: 'black' }}>{statements.componentName}</span>
        </span>
        <Button className={styles.addProps} onClick={handleClickAddProp}>
          <i className='fas fa-plus'></i> Add Props
        </Button>
        <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteRender} />
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
                  dispatchToTestCase={dispatchToReactTestCase}
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

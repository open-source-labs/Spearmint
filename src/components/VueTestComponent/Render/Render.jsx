/**
 * functionlity to add and update props for the render
 */

import React, { useContext } from 'react';
import cn from 'classnames';
import styles from '../../ReactTestComponent/Render/Render.module.scss';
import { VueTestCaseContext } from '../../../context/reducers/vueTestCaseReducer';

import { deleteRender, addProp } from '../../../context/actions/frontendFrameworkTestCaseActions';
import Prop from './Prop';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@mui/material';
const closeIcon = require('../../../assets/images/close.png');

const Render = ({ statement, statementId, describeId, itId }) => {
  const [{ statements }, dispatchToVueTestCase] = useContext(VueTestCaseContext);
  const [{theme}] = useContext(GlobalContext)

  const handleClickAddProp = () => {
    dispatchToVueTestCase(addProp(statementId));
  };

  const handleClickDeleteRender = () => {
    dispatchToVueTestCase(deleteRender(statementId));
  };

  return (
    <div id={styles[`RenderContainer${theme}`]}>
      <div className={styles.renderHeader}>
        <span className={styles.header}>
          Mounting <span id={styles.componentName}>{statements.componentName}</span>
        </span>
        <Button className={styles.addProps} onClick={handleClickAddProp}>
          Add Props
        </Button>
        <AiOutlineClose id={styles.close} alt='close' onClick={handleClickDeleteRender} />

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

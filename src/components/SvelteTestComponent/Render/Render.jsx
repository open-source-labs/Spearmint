/**
 * functionlity to add and update props for the render
 */

import React, { useContext } from 'react';
import cn from 'classnames';
import styles from '../../ReactTestComponent/Render/Render.module.scss';
import { SvelteTestCaseContext } from '../../../context/reducers/svelteTestCaseReducer';

import { deleteRender, addProp } from '../../../context/actions/svelteTestCaseActions';
import Prop from './Prop';
import { Button } from '@material-ui/core';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';
const closeIcon = require('../../../assets/images/close.png');

const Render = ({ statement, statementId, describeId, itId }) => {
  const [{ statements }, dispatchToSvelteTestCase] = useContext(SvelteTestCaseContext);
  const [{theme}] = useContext(GlobalContext)

  const handleClickAddProp = () => {
    dispatchToSvelteTestCase(addProp(statementId));
  };

  const handleClickDeleteRender = () => {
    dispatchToSvelteTestCase(deleteRender(statementId));
  };

  return (
    <div id={styles[`RenderContainer${theme}`]}>
      <div className={styles.renderHeader}>
        <span className={styles.header}>
          Rendering: <span id={styles.componentName}>{statements.componentName}</span>
        </span>
        <Button onClick={handleClickAddProp} variant='outlined'>
          Add Props
        </Button>
        <AiOutlineClose id={styles.close} alt='close' onClick={handleClickDeleteRender} />
      </div>
      <div className={'props'}>
        {statement.props.length > 0 && (
          <div>
            <div id={styles.renderProp}>
              <label htmlFor='prop-key'>
                Prop key
              </label>
              <label htmlFor='prop-value' >
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
                  dispatchToTestCase={dispatchToSvelteTestCase}
                  theme={theme}
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

/**
 * functionlity to add and update props for the render
 */

import React, { useContext } from 'react';
import styles from './Render.module.scss';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';

import { deleteRender, addProp } from '../../../context/actions/frontendFrameworkTestCaseActions';
import Prop from './Prop';
import { Button } from '@mui/material';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';
import { RenderProps } from '../../../utils/reactTypes';

// this is the file that shows what component you are rendering in your test

const Render = ({ statement, statementId, describeId, itId }: RenderProps): JSX.Element => {
  const [{ statements }, dispatchToReactTestCase] = useContext(ReactTestCaseContext);
  const [{theme}] = useContext(GlobalContext)

  const handleClickAddProp = (): void => {
    dispatchToReactTestCase(addProp(statementId));
  };

  const handleClickDeleteRender = (): void => {
    dispatchToReactTestCase(deleteRender(statementId));
  };

  return (
    <div id={styles[`RenderContainer${theme}`]}>
      <div className={styles.renderHeader}>
        <span className={styles.header}>
          Rendering <span id={styles.componentName}>{statements.componentName}</span>
        </span>
        <Button onClick={handleClickAddProp} variant='outlined'>
          Add Props
        </Button>
        <AiOutlineClose id={styles.close} aria-label='close' onClick={handleClickDeleteRender} />
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
                  dispatchToTestCase={dispatchToReactTestCase}
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

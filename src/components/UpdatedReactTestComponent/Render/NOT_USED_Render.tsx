/**
 * functionlity to add and update props for the render
 */

import React, { useContext } from 'react';
import styles from './Render.module.scss';
import { RTFsContexts } from '../../../context/RTFsContextsProvider';

import Prop from './Prop';
import { Button } from '@mui/material';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';
import { RenderProps } from '../../../utils/reactTestCase';
// this is the file that shows what component you are rendering in your test

const Render = ({ blockObjectsState }) => {
  const thisBlockObjectsState = blockObjectsState;

  const [{ theme, testFramework }] = useContext(GlobalContext);
  const { handleAddBlock, handleChange, handleDeleteBlock } = useContext(
    RTFsContexts
  ) as any;

  console.log('=== ACTIVE RENDER: UpdatedReactTestComponent');

  return (
    <div id={styles[`RenderContainer${theme}`]}>
      <div className={styles.renderHeader}>
        <span className={styles.header}>
          {isVisitRender ? 'Cypress: cy.visit()' : 'Rendering'}
        </span>

        {!isVisitRender && (
          <Button
            onClick={(e) => {
              handleAddBlock(e, 'prop', thisBlockObjectsState.filepath);
            }}
            variant="outlined"
          >
            Add Props
          </Button>
        )}

        <AiOutlineClose
          id={styles.close}
          aria-label="close"
          onClick={(e) => {
            handleDeleteBlock(
              thisBlockObjectsState.parentsFilepath,
              thisBlockObjectsState.key
            );
          }}
        />
      </div>

      {isVisitRender ? (
        <div className={styles.visitInputWrapper}>
          <label htmlFor="visitUrl">URL to visit</label>
          <input
            type="text"
            id="visitUrl"
            placeholder="e.g., http://localhost:3000"
            value={thisBlockObjectsState.visitUrl || ''}
            onChange={(e) => {
              handleChange(
                thisBlockObjectsState.filepath,
                'visitUrl',
                e.target.value
              );
            }}
          />
        </div>
      ) : (
        <div className={'props'}>
          {Object.keys(blockObjectsState.children).length > 0 && (
            <div>
              <div id={styles.renderProp}>
                <label htmlFor="prop-key">Prop key</label>
                <label htmlFor="prop-value">Prop value</label>
              </div>
              <hr />
              {Object.values(blockObjectsState.children).map((prop) => {
                return <Prop blockObjectsState={prop} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Render;

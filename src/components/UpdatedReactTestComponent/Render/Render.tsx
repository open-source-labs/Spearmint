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
import { RenderProps } from '../../../utils/reactTypes';

// this is the file that shows what component you are rendering in your test

const Render = ({ blockObjectsState }) => {
  const thisBlockObjectsState = blockObjectsState;

  const [{ theme }] = useContext(GlobalContext);
  const { handleAddBlock, handleChange, handleDeleteBlock } =
    useContext(RTFsContexts);

  return (
    <div id={styles[`RenderContainer${theme}`]}>
      <div className={styles.renderHeader}>
        <span className={styles.header}>Rendering </span>
        <Button
          onClick={(e) => {
            handleAddBlock(e, 'prop', thisBlockObjectsState.filepath);
          }}
          variant="outlined"
        >
          Add Props
        </Button>
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
      <div className={'props'}>
        {Object.keys(blockObjectsState.children).length > 0 && (
          <div>
            <div id={styles.renderProp}>
              <label htmlFor="prop-key">Prop key</label>
              <label htmlFor="prop-value">Prop value</label>
            </div>
            <hr />
            {Object.values(blockObjectsState.children).forEach((prop) => {
              return <Prop blockObjectsState />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Render;

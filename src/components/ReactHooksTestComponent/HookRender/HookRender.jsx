import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './HookRender.module.scss';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { HooksTestCaseContext } from '../../../context/reducers/hooksTestCaseReducer';
import {
  deleteHookRender,
  updateHookRender,
  updateHooksFilePath,
} from '../../../context/actions/hooksTestCaseActions';
import SearchInput from '../../SearchInput/SearchInput';

const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const HookRender = ({ hookRender, index }) => {
  const [{ filePathMap }] = useContext(GlobalContext);
  const [, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);

  const handleChangeHookRenderFields = (e, field) => {
    let updatedHookRender = { ...hookRender };
    updatedHookRender[field] = e.target.value;
    // console.log(updateHookRender(updatedHookRender));
    dispatchToHooksTestCase(updateHookRender(updatedHookRender));
    console.log(updatedHookRender[field]);
  };

  const handleClickDeleteHookRender = (e) => {
    dispatchToHooksTestCase(deleteHookRender(hookRender.id));
  };
  console.log('rerender or not?');
  return (
    <Draggable draggableId={hookRender.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.hookRender}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteHookRender}
          />

          <div id={styles.hookRenderHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Hook: Rendering</h3>
          </div>

          <div id={styles.hookRenderFlexBox}>
            <div id={styles.hookRenderType}>
              <label htmlFor='hookFuncFolder'>Import Hook From</label>
              <SearchInput
                options={Object.keys(filePathMap)}
                dispatch={dispatchToHooksTestCase}
                action={updateHooksFilePath}
                filePathMap={filePathMap}
              />
            </div>
          </div>
          <div id={styles.hookRenderFlexBox}>
            <div id={styles.hookRenderType}>
              <label htmlFor='hook'>Hook</label>
              <input
                type='text'
                id='hook'
                placeholder='eg. useStringCounter'
                onChange={(e) => handleChangeHookRenderFields(e, 'hook')}
              />
            </div>

            <div id={styles.hookRenderType}>
              <label htmlFor='parameterOne'>Hook Parameters (optional)</label>
              <input
                type='text'
                id='parameterOne'
                placeholder='eg. 9000, "string"'
                onChange={(e) => handleChangeHookRenderFields(e, 'parameterOne')}
              />
            </div>
          </div>
          <div id={styles.hookRenderFlexBox}>
            <div id={styles.hookRenderType}>
              <label htmlFor='returnValue'>Expected State</label>
              <input
                type='text'
                id='returnValue'
                placeholder='eg. count'
                onChange={(e) => handleChangeHookRenderFields(e, 'returnValue')}
              />
            </div>
            <div id={styles.hookRenderType}>
              <label htmlFor='expectedReturnValue'>Current Value</label>
              <input
                type='text'
                id='expectedReturnValue'
                placeholder='eg. 0'
                onChange={(e) => handleChangeHookRenderFields(e, 'expectedReturnValue')}
              />
            </div>
            <button>+</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default HookRender;

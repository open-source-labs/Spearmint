import React, { useContext } from 'react';
import styles from './HookRender.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import {
  deleteHookRender,
  updateHookRender,
  updateHooksFilePath,
} from '../../../context/hooksTestCaseActions';
import { Draggable } from 'react-beautiful-dnd';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const HookRender = ({ hookRender, index, dispatchToHooksTestCase }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);

  const handleChangeHookRenderFields = (e, field) => {
    let updatedHookRender = { ...hookRender };
    updatedHookRender[field] = e.target.value;
    dispatchToHooksTestCase(updateHookRender(updatedHookRender));
  };

  const handleClickDeleteHookRender = e => {
    dispatchToHooksTestCase(deleteHookRender(hookRender.id));
  };

  const handleChangeHookFileName = e => {
    const hookFileName = e.target.value;
    const filePath = filePathMap[hookFileName] || '';
    dispatchToHooksTestCase(updateHooksFilePath(hookFileName, filePath));
  };
  return (
    <Draggable draggableId={hookRender.id.toString()} index={index}>
      {provided => (
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
            <h3>Hook : Rendering</h3>
          </div>

          <div id={styles.hookRenderFlexBox}>
            <div id={styles.hookRenderType}>
              <label htmlFor='hookFuncFolder' placeholder='File Name'>Import Hook From</label>
              <input type='text' id='hookFuncFolder' onChange={handleChangeHookFileName} />
            </div>
          </div>
          <div id={styles.hookRenderFlexBox}>
            <div id={styles.hookRenderType}>
              <label htmlFor='hook' placeholder='Hook Name'>Hook</label>
              <input
                type='text'
                id='hook'
                onChange={e => handleChangeHookRenderFields(e, 'hook')}
              />
            </div>

            <div id={styles.hookRenderType}>
              <label htmlFor='parameterOne' placeholder='Hook Function Parameter'>Parameter (optional)</label>
              <input
                type='text'
                id='parameterOne'
                onChange={e => handleChangeHookRenderFields(e, 'parameterOne')}
              />
            </div>
          </div>
          <div id={styles.hookRenderFlexBox}>
            <div id={styles.hookRenderType}>
              <label htmlFor='returnValue' placeholder='Return Value'>Return Value</label>
              <input
                type='text'
                id='returnValue'
                onChange={e => handleChangeHookRenderFields(e, 'returnValue')}
              />
            </div>
            <div id={styles.hookRenderType}>
              <label htmlFor='expectedReturnValue'>Expected Return Value</label>
              <input
                type='text'
                id='expectedReturnValue'
                placeholder='Expected Return Value'
                onChange={e => handleChangeHookRenderFields(e, 'expectedReturnValue')}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default HookRender;

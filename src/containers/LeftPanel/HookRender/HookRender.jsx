/**
 * functionlity to render a hook to test
 */
import React, { useContext } from 'react';
import styles from './HookRender.module.scss';
import { deleteHookRender, updateHookRender } from '../../../context/testCaseActions';
import { Draggable } from 'react-beautiful-dnd';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');


const HookRender = ({ hookRender, index, dispatchToTestCase }) => {
    const handleChangeHookRenderFields = (e, field) => {
        let updatedHookRender = { ...hookRender };
        updatedHookRender[field] = e.target.value;
        dispatchToTestCase(updateHookRender(updatedHookRender));
    };

    const handleClickDeleteHookRender = e => {
        dispatchToTestCase(deleteHookRender(hookRender.id));
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
                    {/* close icon, handle delete */}
                    <img
                        src={closeIcon}
                        id={styles.close}
                        alt='close'
                        onClick={handleClickDeleteHookRender}
                    />

                    {/* header / h3 name / drag icon */}
                    <div id={styles.hookRenderHeader}>
                        <img src={dragIcon} alt='drag' />
                        <h3>Hooks : Rendering</h3>
                    </div>

                    <div id={styles.hookRenderFlexBox}>
                        {/* file path input boxes */}

                        <div id={styles.hookRenderType}>
                            <label htmlFor='hookFuncFolder'>Import Hook From</label>
                            <input
                                type='text'
                                id='hookFuncFolder'
                                onChange={e => handleChangeHookRenderFields(e, 'hookFuncFolder')}
                            />
                        </div>
                    </div>
                    <div id={styles.hookRenderFlexBox}>
                        <div id={styles.hookRenderType}>
                            <label htmlFor='hookFunction'>Hook</label>
                            <input
                                type='text'
                                id='hookFunction'
                                onChange={e => handleChangeHookRenderFields(e, 'hookFunction')}
                            />
                        </div>

                        <div id={styles.hookRenderType}>
                            <label htmlFor='parameterOne'>1st Parameter</label>
                            <input
                                type='text'
                                id='parameterOne'
                                onChange={e => handleChangeHookRenderFields(e, 'parameterOne')}
                            />
                        </div>
                    </div>
                    <div id={styles.hookRenderFlexBox}>
                        <div id={styles.hookRenderType}>
                            <label htmlFor='returnValue'>Return Value</label>
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
                                onChange={e => handleChangeHookRenderFields(e, 'expectedReturnValue')}
                            />
                        </div>
                    </div>

                    {/* payload key
          <div id={styles.payloadFlexBox}>
            <div id={styles.payloadKey}>
              <label htmlFor='payloadKey'>Payload Key</label>
              <input
                type='text'
                id='payloadKey'
                onChange={e => handleChangeActionCreatorFields(e, 'payloadKey')}
              />
            </div>

            {/* payload type selector dropdown */}
                    {/* <div id={styles.payloadType}>
              <label htmlFor='payloadType'>Payload Type</label>
              <select
                id='payloadType'
                onChange={e => handleChangeActionCreatorFields(e, 'payloadType')}
              >
                <option value='' />
                <option value='word'>word</option>
                <option value='words'>words</option>
                <option value='number'>number</option>
                <option value='arrayElement'>arrayElement</option>
                <option value='objectElement'>objectElement</option>
              </select>
            </div> */}
                    {/* </div> */}
                </div>
            )
            }
        </Draggable >
    );
};

export default HookRender;

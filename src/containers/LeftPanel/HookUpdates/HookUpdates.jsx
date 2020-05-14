import React, { useContext } from 'react';
import styles from '../HookUpdates/HookUpdates.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import {
  deleteHookUpdates,
  updateHookUpdates,
  updateHooksFilePath,
} from '../../../context/hooksTestCaseActions';
import { Draggable } from 'react-beautiful-dnd';
import SearchInput from '../SearchInput/SearchInput';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const HookUpdates = ({ hookUpdates, index, dispatchToHooksTestCase }) => {
  const [{ filePathMap }] = useContext(GlobalContext);

  const handleChangeHookUpdatesFields = (e, field) => {
    let updatedHookUpdates = { ...hookUpdates };
    updatedHookUpdates[field] = e.target.value;
    dispatchToHooksTestCase(updateHookUpdates(updatedHookUpdates));
  };

  const handleClickDeleteHookUpdates = e => {
    dispatchToHooksTestCase(deleteHookUpdates(hookUpdates.id));
  };

  return (
    <Draggable draggableId={hookUpdates.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.hookUpdates}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeleteHookUpdates}
          />

          <div id={styles.hookUpdatesHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Hook: Updates</h3>
          </div>

          <div id={styles.hooksFlexBox}>
            <div id={styles.hooks}>
              <label htmlFor='hookFile'>Import Hook From</label>
              <SearchInput options={Object.keys(filePathMap)} dispatch={dispatchToHooksTestCase} action={updateHooksFilePath} filePathMap={filePathMap}/>
            </div>
          </div>

          <div id={styles.cbFlexBox}>
            <div id={styles.cb}>
              <label htmlFor='hook'>Hook</label>
              <input
                type='text'
                id='hook'
                onChange={e => handleChangeHookUpdatesFields(e, 'hook')}
                placeholder='e.g. useCounter'
              />
            </div>
            <div id={styles.cb}>
              <label htmlFor='callbackFunc'>Callback Function</label>
              <input
                type='text'
                id='callbackFunc'
                onChange={e => handleChangeHookUpdatesFields(e, 'callbackFunc')}
                placeholder='e.g. incrementCount'
              />
            </div>
          </div>

          <div id={styles.stateFlexBox}>
            <div id={styles.state}>
              <label htmlFor='managedState'>Managed State</label>
              <input
                type='text'
                id='managedState'
                onChange={e => handleChangeHookUpdatesFields(e, 'managedState')}
                placeholder='e.g. count'
              />
            </div>
            <div id={styles.state}>
              <label htmlFor='updatedState'>Updated Value</label>
              <input
                type='text'
                id='updatedState'
                onChange={e => handleChangeHookUpdatesFields(e, 'updatedState')}
                placeholder='e.g. 1'
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default HookUpdates;

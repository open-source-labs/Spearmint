import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './Thunk.module.scss';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { ReduxTestCaseContext } from '../../../context/reducers/reduxTestCaseReducer';
import { deleteAsync, updateAsync } from '../../../context/actions/reduxTestCaseActions';

const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');
const questionIcon = require('../../../assets/images/help-circle.png');

const Async = ({ async, index }) => {
  const [{ filePathMap }] = useContext(GlobalContext);
  const [, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);

  const handleChangeAsyncFields = (e, field) => {
    let updatedAsync = { ...async };
    updatedAsync[field] = e.target.value;
    dispatchToReduxTestCase(updateAsync(updatedAsync));
  };

  const handleClickDeleteAsync = (e) => {
    dispatchToReduxTestCase(deleteAsync(async.id));
  };

  return (
    <Draggable draggableId={async.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.modal}
        >
          <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteAsync} />

          <div id={styles.header}>
            <img src={dragIcon} alt='drag' />
            <h3>Asynchronous Action Creator</h3>
          </div>
          <div id={styles.groupFlexbox}>
            <div id={styles.labelInput}>
              <label htmlFor='it'>It should...</label>
              <input
                type='text'
                name='it'
                placeholder='eg/ should return expected action'
                onChange={(e) => handleChangeAsyncFields(e, 'it')}
              />
            </div>
          </div>

          <div id={styles.groupFlexbox}>
            <div id={styles.labelInput}>
              <label htmlFor='asyncFunction'>Thunk Action Creator</label>
              <input
                type='text'
                name='asyncFunction'
                onChange={(e) => handleChangeAsyncFields(e, 'asyncFunction')}
              />
            </div>

            <div id={styles.labelInput}>
              <label htmlFor='actionType'>Action Type Of Expected Action</label>
              <input
                type='text'
                id='actionType'
                onChange={(e) => handleChangeAsyncFields(e, 'actionType')}
                placeholder='e.g. ADD_TODO'
              />
            </div>
          </div>

          <div id={styles.groupFlexbox}>
            <div id={styles.labelInput}>
              <label htmlFor='expectedArg'>argument 1</label>
              <div id={styles.inputFlexBox}>
                <input
                  type='text'
                  name='expectedArg'
                  placeholder='e.g. response'
                  onChange={(e) => handleChangeAsyncFields(e, 'expectedArg')}
                />
              </div>
            </div>
            <div id={styles.dropdownWrapper}>
              <label htmlFor='responseType'>Type</label>
              <div id={styles.dropdownFlex}>
                <select
                  id='responseType'
                  value={async.responseType}
                  onChange={(e) => handleChangeAsyncFields(e, 'responseType')}
                >
                  <option value='' />
                  <option value='word'>word</option>
                  <option value='words'>words</option>
                  <option value='number'>number</option>
                  <option value='arrayElement'>arrayElement</option>
                  <option value='objectElement'>objectElement</option>
                </select>
              </div>
            </div>
            <div id={styles.labelInput}>
              <label htmlFor='payloadKey'>argument 2</label>
              <input
                type='text'
                id='payloadKey'
                onChange={(e) => handleChangeAsyncFields(e, 'payloadKey')}
                placeholder='e.g. todo'
              />
            </div>
            <div id={styles.dropdownWrapper}>
              <label htmlFor='payloadType'>Type</label>
              <div id={styles.dropdownFlex}>
                <select
                  id='payloadType'
                  onChange={(e) => handleChangeAsyncFields(e, 'payloadType')}
                >
                  <option value='' />
                  <option value='word'>word</option>
                  <option value='words'>words</option>
                  <option value='number'>number</option>
                  <option value='arrayElement'>arrayElement</option>
                  <option value='objectElement'>objectElement</option>
                </select>
              </div>
            </div>
          </div>

          <div id={styles.groupFlexbox}>
            <div id={styles.dropdownWrapper}>
              <label htmlFor='method'>Method</label>
              <div id={styles.dropdownFlex}>
                <select
                  id='method'
                  value={async.method}
                  onChange={(e) => handleChangeAsyncFields(e, 'method')}
                >
                  <option value='' />
                  <option value='get'>get</option>
                  <option value='post'>post</option>
                  <option value='put'>put</option>
                  <option value='delete'>delete</option>
                </select>
              </div>
            </div>
            <div id={styles.labelInput}>
              <label htmlFor='route'>Route</label>
              <div id={styles.inputFlexBox}>
                <input
                  type='text'
                  name='route'
                  placeholder='eg. /route'
                  onChange={(e) => handleChangeAsyncFields(e, 'route')}
                />
              </div>
            </div>
          </div>

          {async.responseType === 'object' ? (
            <div id={styles.groupFlexbox}>
              <div id={styles.labelInput}>
                <label htmlFor='responseKey'>Response Key</label>
                <div id={styles.inputFlexBox}>
                  <input
                    type='text'
                    name='responseKey'
                    onChange={(e) => handleChangeAsyncFields(e, 'responseKey')}
                  />
                </div>
              </div>
              <div id={styles.labelInput}>
                <label htmlFor='responseValue'>Response Value</label>
                <div id={styles.inputFlexBox}>
                  <input
                    type='text'
                    name='responseValue'
                    onChange={(e) => handleChangeAsyncFields(e, 'responseValue')}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Draggable>
  );
};

export default Async;

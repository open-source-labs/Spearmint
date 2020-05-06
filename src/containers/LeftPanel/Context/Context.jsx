import React, { useContext } from 'react';
import styles from '../Context/Context.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import {
  deleteContexts,
  updateContexts,
  updateContextFilePath,
} from '../../../context/hooksTestCaseActions';
import { Draggable } from 'react-beautiful-dnd';
import SearchInput from '../SearchInput/SearchInput';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const Context = ({ context, index, dispatchToHooksTestCase }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);

  const handleChangeContextFields = (e, field) => {
    let updatedContext = { ...context };
    updatedContext[field] = e.target.value;
    dispatchToHooksTestCase(updateContexts(updatedContext));
  };

  const handleClickDeleteContext = e => {
    dispatchToHooksTestCase(deleteContexts(context.id));
  };

  return (
    <Draggable draggableId={context.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.context}
        >
          <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteContext} />

          <div id={styles.contextHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Context</h3>
          </div>

          <div>
              <div id={styles.querySelector}>
                <div id={styles.contextBox}> 
                <label htmlFor='contextFile' className={styles.queryLabel}>Import Context From</label>
                <SearchInput options={Object.keys(filePathMap)} dispatch={dispatchToHooksTestCase} action={updateContextFilePath} filePathMap={filePathMap}/>
                </div>

                <div id={styles.dropdownFlex}>
                  {/* drop downs */}
                  <div id={styles.contextDrop}> 
                    <label htmlFor='queryVariant' className={styles.queryLabel}>
                    Test Type
                    </label>
                    <select
                      id='queryValue'
                      onChange={e => handleChangeContextFields(e, 'queryValue')}
                    >
                      <option value='' />
                      <option value='shows_default_value'>shows_default_value</option>
                      <option value='shows_value_from_provider'>shows_value_from_provider</option>
                      <option value='component_provides_context_value'>
                        component_provides_context_value
                      </option>
                      <option value='renders_providers_+_consumers_normally'>
                        renders_providers_+_consumers_normally
                      </option>
                    </select>
                  </div>

                  <div id={styles.contextDrop}> 
                    <label htmlFor='queryVariant' className={styles.queryLabel}>
                    Query Variant
                    </label>
                    <select
                      id='queryVariant'
                      onChange={e => handleChangeContextFields(e, 'queryVariant')}
                    >
                      <option value='' />
                      <option value='toHaveTextContext'>toHaveTextContext</option>
                      <option value='toBeInTheDocument'>toBeInTheDocument</option>
                      <option value='toBe'>toBe</option>
                    </select>
                  </div>

                  <div id={styles.contextDrop}> 
                    <label htmlFor='queryVariant' className={styles.queryLabel}>
                    Query Selector
                    </label>
                    <select
                      id='querySelector'
                      onChange={e => handleChangeContextFields(e, 'querySelector')}
                    >
                      <option value='' />
                      <option value='getByText'>getByText</option>
                    </select>
                  </div>
                </div>

                <div id={styles.queryFlexBox}>
                  {/* input boxes */}
                  <div id={styles.contextBox}> 
                    <label htmlFor='queryVariant' className={styles.queryLabel}>
                    Consumer Component
                    </label>
                    <input
                      id='consumerComponent'
                      placeholder='eg. nameOfConsumer'
                      onChange={e => handleChangeContextFields(e, 'consumerComponent')}
                    ></input>
                  </div>

                  <div id={styles.contextBox}> 
                    <label htmlFor='queryVariant' className={styles.queryLabel}>
                    Provider Component
                    </label>
                    <input
                      id='providerComponent'
                      placeholder='eg. nameOfProvider'
                      onChange={e => handleChangeContextFields(e, 'providerComponent')}
                    ></input>
                  </div>
                </div>

                <div id={styles.queryFlexBox}>
                <div id={styles.contextBox}> 
                  <label htmlFor='queryVariant' className={styles.queryLabel}>
                    Context
                  </label>
                  <input
                    id='context'
                    placeholder='eg. nameOfContext'
                    onChange={e => handleChangeContextFields(e, 'context')}
                  ></input>
                  </div>

                <div id={styles.contextBox}> 
                  <label htmlFor='queryVariant' className={styles.queryLabel}>
                  Value To Pass
                  </label>
                  <input 
                  id='values' 
                  placeholder='eg. theValueToPassWithContext'
                  onChange={e => handleChangeContextFields(e, 'values')}></input>
                </div>
                </div>
              </div>

            </div>
        </div>
      )}
    </Draggable>
  );
};

export default Context;

import React, { useContext, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './Endpoint.module.scss';
import style from '../ReactTestComponent/Render/Render.module.scss';
import styled from '../ReactTestComponent/Render/Prop.module.scss';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import {
  deleteEndpoint,
  updateEndpoint,
  addHeader,
  deleteHeader,
} from '../../context/actions/endpointTestCaseActions';

const closeIcon = require('../../assets/images/close.png');
const dragIcon = require('../../assets/images/drag-vertical.png');
const minusIcon = require('../../assets/images/minus-box-outline.png');

const Endpoint = ({ endpoint, index }) => {
  const [, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);
  console.log(endpoint);
  const handleChangeEndpointFields = (e, field) => {
    let updatedEndpoint = { ...endpoint };
    if (field === 'headerName' || field === 'headerValue')
      updatedEndpoint.headers[e.target.id][field] = e.target.value;
    else updatedEndpoint[field] = e.target.value;
    dispatchToEndpointTestCase(updateEndpoint(updatedEndpoint));
  };

  const handleClickDeleteEndpoint = () => {
    // delete endpoint returns action object {type: 'DELETE_ENDPOINT, id: endpoint.id}
    dispatchToEndpointTestCase(deleteEndpoint(endpoint.id));
  };

  const handleClickAddHeader = () => {
    dispatchToEndpointTestCase(addHeader(index));
  };

  const handleClickDeleteHeader = (i) => {
    dispatchToEndpointTestCase(deleteHeader(index, i));
  };

  const testDescription = useRef(null);

  useEffect(() => {
    if (testDescription && testDescription.current) {
      testDescription.current.focus();
    }
  }, []);

  return (
    <div>
      <Draggable draggableId={endpoint.id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            id={styles.modal}
          >
            <img
              src={closeIcon}
              id={styles.close}
              alt='close'
              onClick={handleClickDeleteEndpoint}
            />

            <div id={styles.header}>
              <img src={dragIcon} alt='drag' />
              <h3>Endpoint</h3>
            </div>

            <div id={styles.groupFlexbox}>
              <div id={styles.serverInput} style={{ width: '100%' }}>
                <label htmlFor='test-statement'>Test</label>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'spaceBetween',
                  }}
                >
                  <div id={styles.labelInputTest}>
                    <input
                      ref={testDescription}
                      type='text'
                      id={styles.testStatement}
                      value={endpoint.testName}
                      onChange={(e) => handleChangeEndpointFields(e, 'testName')}
                    />

                    {/* ------------------- edits------------ */}
                  </div>{' '}
                  <button
                    className={styles.addProps}
                    style={{ marginTop: '9px' }}
                    onClick={handleClickAddHeader}
                  >
                    <i className='fas fa-plus'></i> Add Header
                  </button>
                </div>
              </div>
            </div>

            <div id={styles.groupFlexbox}>
              <div id={styles.dropdownWrapper}>
                <label htmlFor='method'>Method</label>
                <div id={styles.dropdownFlex} style={{ width: '350%' }}>
                  <select
                    id='method'
                    value={endpoint.method}
                    onChange={(e) => handleChangeEndpointFields(e, 'method')}
                  >
                    <option value='' />
                    <option value='get'>get</option>
                    <option value='post'>post</option>
                    <option value='put'>put</option>
                    <option value='delete'>delete</option>
                  </select>
                </div>
              </div>

              <div id={styles.alignRight}>
                <label htmlFor='route'>Route</label>
                <div id={styles.inputFlexBox}>
                  <input
                    type='text'
                    name='route'
                    placeholder='eg. /route'
                    onChange={(e) => handleChangeEndpointFields(e, 'route')}
                  />
                </div>
              </div>
            </div>

            <div id={styles.groupFlexbox}>
              <div id={styles.labelInput}>
                <label htmlFor='requestBody'>Expected Response</label>
                <div id={styles.inputFlexBox}>
                  <input
                    type='text'
                    name='expectedResponse'
                    placeholder='eg. status'
                    onChange={(e) => handleChangeEndpointFields(e, 'expectedResponse')}
                  />
                </div>
              </div>

              <div id={styles.labelInput}>
                <label htmlFor='value'>Expected Value</label>
                <div id={styles.inputFlexBox}>
                  <input
                    type='text'
                    name='value'
                    placeholder='eg. 200'
                    onChange={(e) => handleChangeEndpointFields(e, 'value')}
                  />
                </div>
              </div>
            </div>

            {/* //// */}

            <div id={style.RenderContainer} style={{ margin: '10px 0 0 0' }}>
              <div className={'props'}>
                {endpoint.headers.length > 0 && (
                  <div>
                    <div id={style.renderProp} style={{ width: '56.5%', paddingBottom: '3px' }}>
                      <label htmlFor='Header' id={style.propKeyLabel}>
                        Header
                      </label>
                      <label htmlFor='Value' id={style.propValLabel}>
                        Value
                      </label>
                    </div>
                    <hr />
                    {endpoint.headers.map((header, i) => {
                      return (
                        <div id={styled.renderPropsFlexBox}>
                          <input
                            type='text'
                            id={i}
                            onChange={(e) => handleChangeEndpointFields(e, 'headerName')}
                            value={header.headerName}
                          />
                          <input
                            type='text'
                            id={i}
                            onChange={(e) => handleChangeEndpointFields(e, 'headerValue')}
                            value={header.headerValue}
                          />
                          <img
                            src={minusIcon}
                            alt='delete'
                            onClick={(e) => handleClickDeleteHeader(i)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ////         */}
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Endpoint;

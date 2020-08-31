import React, { useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './Endpoint.module.scss';
import style from '../ReactTestComponent/Render/Render.module.scss';
import styled from '../ReactTestComponent/Render/Prop.module.scss';
import {
  deleteEndpoint,
  updateEndpoint,
  addHeader,
  deleteHeader,
  togglePost,
  updatePost,
} from '../../context/actions/endpointTestCaseActions';

const closeIcon = require('../../assets/images/close.png');
const dragIcon = require('../../assets/images/drag-vertical.png');
const minusIcon = require('../../assets/images/minus-box-outline.png');

const Endpoint = ({ endpoint, index, dispatchToEndpointTestCase }) => {
  const jestMatchers = [
    'to Be',
    'to Equal (object)',
    'to Have Been Called',
    'to Have Been Called Times (number)',
    'to Have Been Called With (arg1,...)',
    'to Have Been Last Called With (arg1,...)',
    'to Have Been Nth Called With (nth call, arg1,...)',
    'to Have Length (number)',
    'to Have Property (keyPath, value[optional])',
    'to Be Close To (number, number of digits[optional])',
    'to Be Defined',
    'to Be Undefined',
    'to Be Falsy',
    'to Be Truthy',
    'to Be NaN',
    'to Be Greater Than (number)',
    'to Be Greater Than Or Equal (number)',
    'to Be Less Than (number)',
    'to Be Less Than Or Equal (number)',
    'to Be Instance Of (Class)',
    'to Contain (item in an array)',
    'to Contain Equal (an object in an array)',
    'to Match (regexp or string)',
    'to Match Object (object)',
    'to Srict Equal (object)',
    'to Throw (error[optional])',
  ];

  //for mock fuctions only:
  //   'to Have Returned',
  //   'to Have Returned __ Times (number)',
  //   'to Have Last Returned With',
  // ];

  const handleChangeEndpointFields = (e, field) => {
    let updatedEndpoint = { ...endpoint };

    field === 'headerName' || field === 'headerValue'
      ? (updatedEndpoint.headers[e.target.id][field] = e.target.value)
      : (updatedEndpoint[field] = e.target.value);
    dispatchToEndpointTestCase(updateEndpoint(updatedEndpoint));

    if (e.target.value === 'post') dispatchToEndpointTestCase(togglePost(index));
    else if (e.target.type === 'select-one' && endpoint.post)
      dispatchToEndpointTestCase(togglePost(index));
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

  const updatePostData = (e) => {
    dispatchToEndpointTestCase(updatePost(e.target.value, index));
    e.target.style.height = 'inherit';
    e.target.style.height = `${Math.max(Math.min(e.target.scrollHeight, 200), 102)}px`;
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
            {/* ------------------------------------------------------------------------      */}
            <div id={styles.groupFlexboxAssertion}>
              <div id={styles.labelInput}>
                <label htmlFor='requestBody'>Expect Response</label>
                <div id={styles.inputFlexBox}>
                  <input
                    type='text'
                    list='responseProperties'
                    value={endpoint.expectedResponse}
                    onChange={(e) => handleChangeEndpointFields(e, 'expectedResponse')}
                  />
                  <datalist id='responseProperties'>
                    <option value='Headers'></option>
                    <option value='Status'></option>
                    <option value='Body'></option>
                    <option value='Message'></option>
                    <option value='Length'></option>
                  </datalist>
                </div>
              </div>
              <div id={styles.dropdownWrapper}>
                <label htmlFor='value'>Assertion</label>
                <div id={styles.dropdownFlex}>
                  <select
                    id='method'
                    value={endpoint.assertion}
                    onChange={(e) => handleChangeEndpointFields(e, 'assertion')}
                  >
                    {jestMatchers.map((assertion) => (
                      <option value={assertion}>{assertion}</option>
                    ))}
                  </select>
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
            </div>{' '}
            {/* -------------------------------------------------------------------------------------------------- */}
            {endpoint.post && (
              <div id={style.RenderContainer} style={{ margin: '10px 0 0 0' }}>
                <label htmlFor='Header' id={styles.labelInputPost}>
                  Data To Send
                </label>
                <textarea
                  value={endpoint.postData}
                  onChange={(e) => updatePostData(e)}
                  style={{
                    display: 'block',
                    width: '90%',
                    overflow: 'scroll',
                    border: '1px solid rgb(205, 205, 205)',
                    margin: '10px auto',
                    height: '100px',
                    resize: 'none',
                    overflowX: 'hidden',
                    padding: '10px',
                  }}
                  placeholder={'Insert JSON data here... {  }'}
                />
              </div>
            )}
            {endpoint.headers.length > 0 && (
              <div id={style.RenderContainer} style={{ margin: '10px 0 0 0' }}>
                <div className={'props'}>
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
                            onClick={() => handleClickDeleteHeader(i)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}{' '}
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Endpoint;

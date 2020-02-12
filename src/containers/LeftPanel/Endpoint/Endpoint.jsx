import React, { useContext } from 'react';
import styles from '../Endpoint/Endpoint.module.scss';
import { GlobalContext } from '../../../context/globalReducer';
import {
  deleteEndpoint,
  updateEndpoint,
  updateServerFilePath,
} from '../../../context/endpointTestCaseActions';
import { Draggable } from 'react-beautiful-dnd';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const Endpoint = ({ endpoint, index, dispatchToEndpointTestCase }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);

  const handleChangeEndpointFields = (e, field) => {
    let updatedEndpoint = { ...endpoint };
    updatedEndpoint[field] = e.target.value;
    dispatchToEndpointTestCase(updateEndpoint(updatedEndpoint));
  };

  const handleClickDeleteEndpoint = e => {
    dispatchToEndpointTestCase(deleteEndpoint(endpoint.id));
  };

  const handleChangeServerFileName = e => {
    const serverFileName = e.target.value;
    const filePath = filePathMap[serverFileName] || '';
    dispatchToEndpointTestCase(updateServerFilePath(serverFileName, filePath));
  };

  return (
    <Draggable draggableId={endpoint.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.actionCreator}
        >
          <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteEndpoint} />

          <div id={styles.actionCreatorHeader}>
            <img src={dragIcon} alt='drag' />
            <h3>Endpoint</h3>
          </div>


          <div id={styles.filesFlexBox}>
            <div id={styles.files}>
              <label htmlFor='endpointFile'>Import Server From</label>
              <div id={styles.payloadFlexBox}>
                <input
                  type='text'
                  placeholder='File Name'
                  id={styles.renderInputBox}
                  value={endpoint.serverFile}
                  onChange={handleChangeServerFileName}
                />
              </div>
            </div>
          </div>

          <div id={styles.filesFlexBox}>
            <div id={styles.querySelector}>
              <label htmlFor='method'>
                Method
                </label>
              <div id={styles.dropdownFlex}>
                <select
                  id='method'
                  value={endpoint.method}
                  onChange={e => handleChangeEndpointFields(e, 'method')}
                >
                  <option value='' />
                  <option value='get'>get</option>
                  <option value='post'>post</option>
                  <option value='put'>put</option>
                  <option value='delete'>delete</option>
                </select>
              </div>
            </div>

            <div id={styles.files}>
              <label htmlFor='route'>
                Route
              </label>
              <div id={styles.payloadFlexBox}>
                <input
                  type='text'
                  name='route'
                  placeholder='eg. /route'
                  onChange={e => handleChangeEndpointFields(e, 'route')} />
              </div>
            </div>
          </div>

            <div id={styles.stateFlexBox}>
              <div id={styles.state}>
              <label htmlFor='requestBody'>
                Expected Response
              </label>
                <div id={styles.payloadFlexBox}>
                  <input
                    type='text'
                    name='expectedResponse'
                    placeholder="body.key or status"
                    onChange={e => handleChangeEndpointFields(e, 'expectedResponse')} />
                </div>
              </div>

            <span id={styles.matcher}>toBe</span>

                <div id={styles.state}>
                <label htmlFor='value'>
                  Value
              </label>
                <div id={styles.payloadFlexBox}>
                  <input
                    type='text'
                    name='value'
                    onChange={e => handleChangeEndpointFields(e, 'value')}
                  />
                </div>
              </div>
            </div>
 
        </div>

      )}
    </Draggable>
  );
};

export default Endpoint;

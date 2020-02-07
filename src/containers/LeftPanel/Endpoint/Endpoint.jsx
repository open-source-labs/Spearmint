// component to be rendered in the electron app

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

const Endpoint = ({ endpoint, index, dispatchToTestCase }) => {
  const [{ filePathMap }, _] = useContext(GlobalContext);

  const handleChangeEndpointFields = (e, field) => {
    let updatedEndpoint = { ...endpoint };
    updatedEndpoint[field] = e.target.value;
    dispatchToTestCase(updateEndpoint(updatedEndpoint));
  };

  const handleClickDeleteEndpoint = e => {
    dispatchToTestCase(deleteEndpoint(endpoint.id));
  };

  // Might need to uncomment if filepath does not update
  const handleChangeServerFileName = e => {
    const serverFileName = e.target.value;
    const filePath = filePathMap[serverFileName] || '';
    dispatchToTestCase(updateServerFilePath(serverFileName, filePath));
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
              <label htmlFor='endpointFile'>Server File Name</label>
              <div id={styles.payloadFlexBox}>
                <input
                  type='text'
                  id={styles.renderInputBox}
                  value={endpoint.serverFile}
                  onChange={handleChangeServerFileName}
                  // onChange={handleChangeEndpointFields}
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
                Server Response
              </label>
                <div id={styles.payloadFlexBox}>
                  <input
                    type='text'
                    name='serverResponse'
                    placeholder="json( {message: 'pass!'} )"
                    onChange={e => handleChangeEndpointFields(e, 'serverResponse')} />
                </div>
                </div>
             
                <div id={styles.state}>
                <label htmlFor='expectedResponse'>
                  Expected Response
              </label>
                <div id={styles.payloadFlexBox}>
                  <input
                    type='text'
                    name='expectedResponse'
                    onChange={e => handleChangeEndpointFields(e, 'expectedResponse')}
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

import React, { useContext } from 'react';
import styles from '../Endpoint/Endpoint.module.scss';
import {
  deletePuppeteerTest,
} from '../../../context/puppeteerTestCaseActions';
import { Draggable } from 'react-beautiful-dnd';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const PaintTiming = ({ paintTiming, index, dispatchToPuppeteerTestCase }) => {
  // const handleChangeEndpointFields = (e, field) => {
  //   let updatedEndpoint = { ...endpoint };
  //   updatedEndpoint[field] = e.target.value;
  //   dispatchToEndpointTestCase(updateEndpoint(updatedEndpoint));
  // };

  const handleClickDeletePaintTiming = e => {
    dispatchToPuppeteerTestCase(deletePuppeteerTest(paintTiming.id));
  };

  return (
    <Draggable draggableId={paintTiming.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={styles.modal}
        >
          <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeletePaintTiming} />

          <div id={styles.header}>
            <img src={dragIcon} alt='drag' />
            <h3>Paint Timing</h3>
          </div>

          <div id={styles.groupFlexbox}>
            <label htmlFor='first-paint'>
              Input
            </label>
            <div id={styles.inputFlexBox}>
              <input
                type='text'
                name='first-paint'
                placeholder='100'
                // onChange={e => handleChangeEndpointFields(e, 'route')} 
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default PaintTiming;

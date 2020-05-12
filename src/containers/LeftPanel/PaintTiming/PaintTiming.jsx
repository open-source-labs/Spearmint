import React, { useContext } from 'react';
import styles from './PaintTiming.module.scss';
import {
  deletePuppeteerTest,
  addBrowserOption,
  deleteBrowserOption,
  updatePaintTiming,
  updateBrowserOption,
} from '../../../context/puppeteerTestCaseActions';
import { Draggable } from 'react-beautiful-dnd';

const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');
const plusIcon = require('../../../assets/images/plus.png');
const minusIcon = require('../../../assets/images/minus-box-outline.png');

const PaintTiming = ({ paintTiming, index, dispatchToPuppeteerTestCase }) => {
  const handleChangePaintTimingFields = (e, field) => {
    dispatchToPuppeteerTestCase(updatePaintTiming(paintTiming.id, field, e.target.value));
  };

  const handleChangeBrowserOptionFields = (e, field, optionId) => {
    dispatchToPuppeteerTestCase(updateBrowserOption(paintTiming.id, field, e.target.value, optionId));
  };

  const handleClickDeletePaintTiming = e => {
    dispatchToPuppeteerTestCase(deletePuppeteerTest(paintTiming.id));
  };

  const handleAddBrowserOptions = e => {
    dispatchToPuppeteerTestCase(addBrowserOption(paintTiming.id));
  };

  const handleClickDeleteBrowserOption = e => {
    dispatchToPuppeteerTestCase(deleteBrowserOption(paintTiming.id, Number(e.target.id)));
  }


  const browserOptionsJSX = paintTiming.browserOptions.map(option => {
    return (
      <div id={styles.browserOptionsFlexBox} key={option.id}>
        <input 
          type='text' 
          key={`key${option.id}`} 
          id={`key${option.id}`} 
          onChange={e => handleChangeBrowserOptionFields(e, 'optionKey', option.id)} 
        />
        <input 
          type='text' 
          key={`value${option.id}`} 
          id={`value${option.id}`} 
          onChange={e => handleChangeBrowserOptionFields(e, 'optionValue', option.id)}  
        />
        <img src={minusIcon} alt='delete' id={option.id} onClick={handleClickDeleteBrowserOption} />
      </div>
    );
  });

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
            <label htmlFor='test'>
              Test
            </label>
            <div id={styles.inputFlexBox}>
              <input
                type='text'
                name='test'
                onChange={e => handleChangePaintTimingFields(e, 'test')} 
              />
            </div>
          </div>
          
          <div id={styles.groupFlexbox}>
            <label htmlFor='url'>
              URL
            </label>
            <div id={styles.inputFlexBox}>
              <input
                type='text'
                name='url'
                placeholder='http://localhost:8080/'
                onChange={e => handleChangePaintTimingFields(e, 'url')} 
              />
            </div>
            <div id={styles.renderCheckbox}>
              <input
                type='checkbox'
                id='render-checkbox'
                disabled={paintTiming.browserOptions.length}
                checked={paintTiming.hasBrowserOption}
                onChange={handleAddBrowserOptions}
              />
              <label htmlFor='render-checkbox'>Add Browser Options? </label>
            </div>
          </div>
          {paintTiming.browserOptions.length !== 0 && (
            <div>
              <div id={styles.browserOptions}>
                <label htmlFor='option-key'>
                  Option key
                </label>
                <label htmlFor='option-value'>
                  Option value
                </label>
              </div>
              <hr />
              {browserOptionsJSX}
              <div id={styles.options}>
                <button onClick={handleAddBrowserOptions}>
                  <img src={plusIcon} alt='add' />
                  Add Prop
                </button>
              </div>
            </div>
          )}

          {/* -------------------------------------- */}
          <div id={styles.groupFlexbox}>
            <label htmlFor='first-paint'>
              First Paint
            </label>
            <div id={styles.inputFlexBox}>
              <input
                type='text'
                name='first-paint-it'
                onChange={e => handleChangePaintTimingFields(e, 'firstPaintIt')} 
              />
              <input
                type='text'
                name='first-paint-benchmark'
                onChange={e => handleChangePaintTimingFields(e, 'firstPaintTime')} 
              />
            </div>
          </div>
          <div id={styles.groupFlexbox}>
            <label htmlFor='first-contentful-paint'>
              First Contentful Paint
            </label>
            <div id={styles.inputFlexBox}>
              <input
                type='text'
                name='first-contentful-paint-it'
                onChange={e => handleChangePaintTimingFields(e, 'FCPIt')} 
              />
              <input
                type='text'
                name='first-contentful-paint-benchmark'
                onChange={e => handleChangePaintTimingFields(e, 'FCPtTime')} 
              />
            </div>
          </div>
          <div id={styles.groupFlexbox}>
            <label htmlFor='largest-contentful-paint'>
              Largest Contentful Paint
            </label>
            <div id={styles.inputFlexBox}>
              <input
                type='text'
                name='largest-contentful-paint-it'
                onChange={e => handleChangePaintTimingFields(e, 'LCPPaint')} 
              />
              <input
                type='text'
                name='largest-contentful-paint-benchmark'
                onChange={e => handleChangePaintTimingFields(e, 'LCPTime')} 
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default PaintTiming;

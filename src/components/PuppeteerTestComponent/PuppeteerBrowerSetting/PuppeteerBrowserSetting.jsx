import React, { useContext } from 'react';
import styles from '../PaintTiming/PaintTiming.module.scss';
import {
  addBrowserOption,
  deleteBrowserOption,
  updateBrowserOption,
} from '../../../context/actions/puppeteerTestCaseActions';
import { PuppeteerTestCaseContext } from '../../../context/reducers/puppeteerTestCaseReducer';

const plusIcon = require('../../../assets/images/plus.png');
const minusIcon = require('../../../assets/images/minus-box-outline.png');

const PuppeteerBrowserSetting = ({ puppeteer, handleChangePuppeteerFields }) => {
  const [, dispatchToPuppeteerTestCase] = useContext(PuppeteerTestCaseContext);

  const handleChangeBrowserOptionFields = (e, field, optionId) => {
    dispatchToPuppeteerTestCase(updateBrowserOption(puppeteer.id, field, e.target.value, optionId));
  };

  const handleAddBrowserOptions = () => {
    dispatchToPuppeteerTestCase(addBrowserOption(puppeteer.id));
  };

  const handleClickDeleteBrowserOption = (e) => {
    dispatchToPuppeteerTestCase(deleteBrowserOption(puppeteer.id, Number(e.target.id)));
  };

  const browserOptionsJSX = puppeteer.browserOptions.map((option) => {
    return (
      <div id={styles.browserOptionsFlexBox} key={option.id}>
        <input
          type='text'
          key={`key${option.id}`}
          value={option.optionKey}
          id={`key${option.id}`}
          onChange={(e) => handleChangeBrowserOptionFields(e, 'optionKey', option.id)}
        />
        <input
          type='text'
          key={`value${option.id}`}
          value={option.optionValue}
          id={`value${option.id}`}
          onChange={(e) => handleChangeBrowserOptionFields(e, 'optionValue', option.id)}
        />
        <img src={minusIcon} alt='delete' id={option.id} onClick={handleClickDeleteBrowserOption} />
      </div>
    );
  });

  return (
    <div>
      <div id={styles.groupFlexbox}>
        <label htmlFor='test'>Describe</label>
        <div id={styles.inputFlexBox}>
          <input
            type='text'
            name='test'
            value={puppeteer.describe}
            placeholder='eg. Home page performance'
            onChange={(e) => handleChangePuppeteerFields(e, 'describe')}
          />
        </div>
      </div>

      <div id={styles.groupFlexbox}>
        <label htmlFor='url'>URL &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
        <div id={styles.inputFlexBox}>
          <input
            type='text'
            name='url'
            value={puppeteer.url}
            placeholder='http://localhost:8080/'
            onChange={(e) => handleChangePuppeteerFields(e, 'url')}
          />
        </div>
        <div id={styles.renderCheckbox}>
          <input
            type='checkbox'
            id='render-checkbox'
            disabled={puppeteer.browserOptions.length}
            checked={puppeteer.hasBrowserOption}
            onChange={handleAddBrowserOptions}
          />
          <label htmlFor='render-checkbox'>Add Browser Options? </label>
        </div>
      </div>

      {puppeteer.browserOptions.length !== 0 && (
        <div id={styles.optionBox}>
          <div id={styles.browserOptions}>
            <label htmlFor='option-key'>Option key</label>
            <label htmlFor='option-value'>Option value</label>
          </div>
          <hr />
          {browserOptionsJSX}
          <div id={styles.options}>
            <button onClick={handleAddBrowserOptions}>
              <img src={plusIcon} alt='add' />
              Add Option
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuppeteerBrowserSetting;

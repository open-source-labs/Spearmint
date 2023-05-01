import React, { useContext } from 'react';
import styles from './PaintTiming.module.scss';
import {
  deletePuppeteerTest,
  updatePaintTiming,
} from '../../../context/actions/puppeteerTestCaseActions';
import { PuppeteerTestCaseContext } from '../../../context/reducers/puppeteerTestCaseReducer';
import ToolTip from '../../ToolTip/ToolTip';
import PuppeteerBrowserSetting from '../PuppeteerBrowerSetting/PuppeteerBrowserSetting';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { PuppeteerStatements } from '../../../utils/puppeteerTypes';
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');
const questionIcon = require('../../../assets/images/help-circle.png');


const PaintTiming = ({ paintTiming, index }: { paintTiming: PuppeteerStatements, index: number }) => {
  const [ {theme} ] = useContext(GlobalContext)
  const [, dispatchToPuppeteerTestCase] = useContext(PuppeteerTestCaseContext);

  const handleChangePaintTimingFields = (e: React.SyntheticEvent, field: string) => {
    const target = e.target as HTMLButtonElement
    dispatchToPuppeteerTestCase(updatePaintTiming(paintTiming.id, field, target.value));
  };
  const handleClickDeletePaintTiming = (e: React.SyntheticEvent) => {
    dispatchToPuppeteerTestCase(deletePuppeteerTest(paintTiming.id));
  };

  return (
        <div
          id={styles[`modal${theme}`]}
        >
          <img
            src={closeIcon}
            id={styles.close}
            alt='close'
            onClick={handleClickDeletePaintTiming}
          />

          <div id={styles.header}>
            <h3>Paint Timing</h3>
          </div>

          <PuppeteerBrowserSetting
            puppeteer={paintTiming}
            handleChangePuppeteerFields={handleChangePaintTimingFields}
          />

          <div id={styles.groupFlexbox}>
            <label htmlFor='first-paint'>First Paint</label>
            <div id={styles.inputFlexBox}>
              <input
                type='text'
                name='first-paint-it'
                value={paintTiming.firstPaintIt}
                placeholder='should have its first paint in less than 100 ms'
                onChange={(e) => handleChangePaintTimingFields(e, 'firstPaintIt')}
              />
              <div id={styles.time}>
                <input
                  type='text'
                  name='first-paint-benchmark'
                  value={paintTiming.firstPaintTime}
                  placeholder={'100'}
                  onChange={(e) => handleChangePaintTimingFields(e, 'firstPaintTime')}
                />
              </div>
              <span id={styles.hastooltip} role='tooltip'>
                <img src={questionIcon} alt='help' />
                <span id={styles.tooltip}>
                  <ToolTip toolTipType={'FPTarget'} />
                </span>
              </span>
            </div>
          </div>
          <div id={styles.groupFlexbox}>
            <label htmlFor='first-contentful-paint'>First Contentful Paint</label>
            <div id={styles.inputFlexBox}>
              <input
                type='text'
                name='first-contentful-paint-it'
                value={paintTiming.FCPIt}
                placeholder='should have its first meaningful paint in less than 100 ms'
                onChange={(e) => handleChangePaintTimingFields(e, 'FCPIt')}
              />
              <div id={styles.time}>
                <input
                  type='text'
                  name='first-contentful-paint-benchmark'
                  value={paintTiming.FCPTime}
                  placeholder={'100'}
                  onChange={(e) => handleChangePaintTimingFields(e, 'FCPtTime')}
                />
              </div>
              <span id={styles.hastooltip} role='tooltip'>
                <img src={questionIcon} alt='help' />
                <span id={styles.tooltip}>
                  <ToolTip toolTipType={'FCPTarget'} />
                </span>
              </span>
            </div>
          </div>
          <div id={styles.groupFlexbox}>
            <label htmlFor='largest-contentful-paint'>Largest Contentful Paint</label>
            <div id={styles.inputFlexBox}>
              <input
                type='text'
                name='largest-contentful-paint-it'
                value={paintTiming.LCPIt}
                placeholder='should have its largest contentful paint in less than 250 ms'
                onChange={(e) => handleChangePaintTimingFields(e, 'LCPIt')}
              />
              <div id={styles.time}>
                <input
                  type='text'
                  name='largest-contentful-paint-benchmark'
                  value={paintTiming.LCPTime}
                  placeholder={'250'}
                  onChange={(e) => handleChangePaintTimingFields(e, 'LCPTime')}
                />
              </div>
              <span id={styles.hastooltip} role='tooltip'>
                <img src={questionIcon} alt='help' />
                <span id={styles.tooltip}>
                  <ToolTip toolTipType={'LCPTarget'} />
                </span>
              </span>
            </div>
          </div>
        </div>
  );
};

export default PaintTiming;

/**
 * question mark notes for matchers
 */

import React from 'react';
import styles from './ToolTip.scss';

const ToolTipAsync = ({ toolTipType }) => {
  if (toolTipType.includes('.')) {
    toolTipType = toolTipType.replace(/\./g, '');
  }
  const TOOLTIP_MAP_ASYNC = {
    '': 'Choose a matcher',
    object:
      "Must be an object.",
    expectedResponse: 'Must be an array of the expected action objects',

  };

  // changed id from styles.tooltip to the string: "styles.tooltip" 
  // As far as I can tell this isn't necessary
  return <span id={"styles.tooltip"}>{TOOLTIP_MAP_ASYNC[toolTipType]}</span>;
  // return <span id={styles.tooltip}>{TOOLTIP_MAP_ASYNC}</span>;
};

export default ToolTipAsync;

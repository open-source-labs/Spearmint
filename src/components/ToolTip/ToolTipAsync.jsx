/**
 * question mark notes for matchers
 */

import React from 'react';

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

  return <span id={"styles.tooltip"}>{TOOLTIP_MAP_ASYNC[toolTipType]}</span>;
};

export default ToolTipAsync;

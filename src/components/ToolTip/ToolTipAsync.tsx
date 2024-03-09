/**
 * Currently this is not being imported in other components. IT IS NOT IN USE.
 * This component provides additional notes for each Assertion matcher when you hover over the ? mark.
 * The object containing all tooltip matchers can be found in the utils folder under toolTipTypes.
 */

import React from 'react';
import { AsyncProps, ToolTipAsyncType, TOOLTIP_MAP_ASYNC } from '../../utils/toolTipTypes';

const ToolTipAsync = ({ toolTipType }: AsyncProps) => {
  if (toolTipType.includes('.')) {
    toolTipType = toolTipType.replace(/\./g, '') as ToolTipAsyncType;
  }

  return <span id={"styles.tooltip"}>{TOOLTIP_MAP_ASYNC[toolTipType]}</span>;
};

export default ToolTipAsync;

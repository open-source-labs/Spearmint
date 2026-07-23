/**
 * This component provides the notes for each Assertion matcher when you hover over the ? mark.
 * The object containing all tooltip matchers can be found in the utils folder under toolTipTypes.
 */

import React from 'react';
import { MatchersProps, TOOLTIP_MAP_MATCHERS, ToolTipMatcherType } from '../../utils/toolTipTypes';

const ToolTipMatcher = ({ toolTipType }: MatchersProps) => {
  if (toolTipType.includes('.')) {
    toolTipType = toolTipType.replace(/\./g, '') as ToolTipMatcherType;
  }

  return <span id={'styles.tooltip'}>{TOOLTIP_MAP_MATCHERS[toolTipType]}</span>;
};

export default ToolTipMatcher;
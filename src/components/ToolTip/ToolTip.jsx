/**
 * the question mark notes for selectors
 */

import React from 'react';
import styles from './ToolTip.scss';

const ToolTip = ({ toolTipType }) => {
  const TOOLTIP_MAP = {
    '': 'Choose a selector',
    getBy:
      'Returns the first matching node for a query, and throws an error if no elements match or if more than one match is found (use getAllBy instead).',
    getAllBy:
      'Returns an array of all matching nodes for a query, and throws an error if no elements match.',
    queryBy:
      'Returns the first matching node for a query, and return null if no elements match. This is useful for asserting an element is not present. This throws if more than one match is found (use queryAllBy instead).',
    queryAllBy:
      'Returns an array of all matching nodes for a query, and return an empty array ([]) if no elements match.',
    findBy:
      'Returns a promise which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a default timeout of 4500ms. If you need to find more than one element, then use findAllBy.',
    findAllBy:
      'Returns a promise which resolves to an array of elements when any elements are found which match the given query. The promise is rejected if no elements are found after a default timeout of 4500ms.',
    LabelText:
      'This will search for the label that matches the given TextMatch, then find the element associated with that label.',
    PlaceholderText:
      'This will search for all elements with a placeholder attribute and find one that matches the given TextMatch.',
    Text:
      'This will search for all elements that have a text node with textContent matching the given TextMatch.',
    AltText:
      "This will return the element (normally an <img>) that has the given alt text. Note that it only supports elements which accept an alt attribute: <img>, <input>, and <area> (intentionally excluding <applet> as it's deprecated).",
    Title: 'Returns the element that has the matching title attribute.',
    DisplayValue:
      'Returns the input, textarea, or select element that has the matching display value.',
    Role:
      'A shortcut to container.querySelector(`[role= "${yourRole}"]`) (and it also accepts a TextMatch).',
    TestId:
      'A shortcut to container.querySelector(`[data-testid="${yourId}"]`) (and it also accepts a TextMatch).',
    LCPTarget:
      'The Largest Contentful Paint (LCP) metric reports the render time of the largest content element visible within the viewport. Provide a target value in ms.',
    FPTarget:
      'The First Paint (FP) metric reports the time between navigation and when the browser renders the first pixels to the screen, rendering anything that is visually different from what was on the screen prior to navigation. Provide a target value in ms.',
    FCPTarget:
      "The First Contentful Paint (FCP) metric measures the time from when the page starts loading to when any part of the page's content is rendered on the screen. Provide a target value in ms.",
  };

  // changed id from styles.tooltip to the string: "styles.tooltip" 
  // As far as I can tell this isn't necessary
  return <span id={"styles.tooltip"}>{TOOLTIP_MAP[toolTipType]}</span>;
};

export default ToolTip;

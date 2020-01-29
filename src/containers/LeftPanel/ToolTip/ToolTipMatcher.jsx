/**
 * question mark notes for matchers
 */

import React from 'react';
import styles from '../ToolTip/ToolTip.scss';

const ToolTipMatcher = ({ toolTipType }) => {
  if (toolTipType.includes('.')) {
    toolTipType = toolTipType.replace(/\./g, '');
  }
  const TOOLTIP_MAP_MATCHERS = {
    '': 'Choose a matcher',
    toBeDisabled:
      "This allows you to check whether an element is disabled from the user's perspective.",
    toBeEnabled:
      "This allows you to check whether an element is not disabled from the user's perspective.",
    toBeEmpty: 'This allows you to assert whether an element has content or not.',
    toBeInTheDocument:
      'This allows you to assert whether an element is present in the document or not.',
    toBeInvalid: 'This allows you to check if a form element is currently invalid.',
    toBeRequired: 'This allows you to check if a form element is currently required.',
    toBeValid: 'This allows you to check if the value of a form element is currently valid.',
    toBeVisible: 'This allows you to check if an element is currently visible to the user.',
    toContainElement:
      'This allows you to assert whether an element contains another element as a descendant or not.',
    toContainHTML:
      'Assert whether a string representing a HTML element is contained in another element',
    toHaveAttribute: 'This allows you to check whether the given element has an attribute or not.',
    toHaveClass:
      'This allows you to check whether the given element has certain classes within its class attribute.',
    toHaveFocus: 'This allows you to assert whether an element has focus or not.',
    toHaveFormValues:
      'This allows you to check if a form or fieldset contains form controls for each given name, and having the specified value.',
    toHaveStyle:
      'This allows you to check if a certain element has some specific css properties with specific values applied.',
    toHaveTextContent:
      'This allows you to check whether the given element has a text content or not.',
    nottoBeDisabled:
      "This allows you to check whether an element is not disabled from the user's perspective.",
    nottoBeEnabled:
      "This allows you to check whether an element is disabled from the user's perspective.",
    nottoBeEmpty: 'This allows you to assert whether an element has content.',
    nottoBeInTheDocument:
      'This allows you to assert whether an element is not present in the document.',
    nottoBeInvalid: 'This allows you to check if a form element is currently valid.',
    nottoBeRequired: 'This allows you to check if a form element is currently not required.',
    nottoBeValid: 'This allows you to check if the value of a form element is currently invalid.',
    nottoBeVisible: 'This allows you to check if an element is not currently visible to the user.',
    nottoContainElement:
      'This allows you to assert whether an element does not contain another element as a descendant.',
    nottoContainHTML:
      'Assert whether a string representing a HTML element is not contained in another element',
    nottoHaveAttribute:
      'This allows you to check whether the given element does not have an attribute',
    nottoHaveClass:
      'This allows you to check whether the given element does not have certain classes within its class attribute.',
    nottoHaveFocus: 'This allows you to assert whether an element does not have focus.',
    nottoHaveFormValues:
      'This allows you to check if a form or fieldset does not contain form controls for each given name, and having the specified value.',
    nottoHaveStyle:
      'This allows you to check if a certain element does not have some specific css properties with specific values applied.',
    nottoHaveTextContent:
      'This allows you to check whether the given element does not have a text content.',
  };

  return <span id={styles.tooltip}>{TOOLTIP_MAP_MATCHERS[toolTipType]}</span>;
};

export default ToolTipMatcher;

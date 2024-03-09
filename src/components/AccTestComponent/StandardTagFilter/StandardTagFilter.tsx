import React from 'react';
import styles from './StandardTagFilter.module.scss';

/**
 * Renders the StandardTagFilter react component, this is a dropdown menu in the DescribeBlock accessibility standard
 * @property { } dispatch 
 * @property { } tagAction
 * @property { } textAction
 * @property { } describeID
 * @property { } standardTag
 * @returns { JSX.Element } Returns the StandardTagFilter react component
 */
const StandardTagFilter = ({ dispatch, tagAction, textAction, describeId, standardTag }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(tagAction(describeId, e.target.value));
    if (e.target.value === 'none') dispatch(textAction(`Component is accessible according to all standards enforced by axe-core.`, describeId));
    else dispatch(textAction(`Component is accessible according to ${e.target.value} standards.`, describeId));
  };

  return (
    <div id={styles.StandardTagFilter}>
      <label htmlFor='accTestStandardTypes'>Choose An Accessibility Standard:  </label>
      <select value={standardTag} id={styles.accTestStandardTypes} onChange={handleChange}>
        <option value='none'>No Tag</option>
        <option value='wcag2a'>WCAG 2.0 Level A</option>
        <option value='wcag2aa'>WCAG 2.0 Level AA</option>
        <option value='wcag21a'>WCAG 2.1 Level A</option>
        <option value='wcag21aa'>WCAG 2.1 Level AA</option>
        <option value='best-practice'>Common best practices</option>
        <option value='ACT'>ACT (by W3C)</option>
        <option value='section508'>Section 508</option>
        <option value='experimental'>Experimental (auto-disabled)</option>
      </select>
    </div>
  );
};

export default StandardTagFilter;

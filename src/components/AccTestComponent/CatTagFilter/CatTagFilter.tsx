import React from 'react';
import styles from './CatTagFilter.module.scss';

const CatTagFilter = ({ dispatch, tagAction, textAction, itId, catTag }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(tagAction(itId, e.target.value));
    if (e.target.value === 'none') dispatch(textAction(`Component is accessible regarding all axe-core categories.`, itId));
    else dispatch(textAction(`Component is accessible regarding ${e.target.value}.`, itId));
  };

  return (
    <div id={styles.CatTagFilter}>
      <label htmlFor='accTestCatTypes'>Choose A Content Filter: </label>
      <select value={catTag} id={styles.accTestCatTypes} onChange={handleChange}>
        <option value='none'>No Tag</option>
        <option value='aria'>ARIA</option>
        <option value='color'>Color</option>
        <option value='forms'>Forms</option>
        <option value='keyboard'>Keyboard</option>
        <option value='language'>Language</option>
        <option value='name-role-value'>Name role value</option>
        <option value='parsing'>Parsing</option>
        <option value='semantics'>Semantics</option>
        <option value='sensory-and-visual-cues'>Sensory and visual cues</option>
        <option value='structure'>Structure</option>
        <option value='tables'>Tables</option>
        <option value='text-alternatives'>Text alternatives</option>
        <option value='time-and-media'>Time and media</option>
      </select>
    </div>
  );
};

export default CatTagFilter;

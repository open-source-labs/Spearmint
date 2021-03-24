import React from 'react';
import styles from './CatTagFilter.module.scss';

const CatTagFilter = ({ dispatch, action, describeId, catTag }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(action(describeId, e.target.value));
  };

  return (
    <div id={styles.CatTagFilter}>
      <label for='accTestTypes'>Choose A Content Filter:  </label>
      <select value={catTag} id='accTestTypes' onChange={handleChange}>
        <option value=''>No Tag</option>
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

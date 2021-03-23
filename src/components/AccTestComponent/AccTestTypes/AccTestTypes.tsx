import React from 'react';

const AccTestTypes = ({ dispatch, action, currTypes }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(action(e.target.value));
  };

  return (
    <div id='sampleAccTest'>
      <label for='accTestTypes'>Choose Type of Accessibility Test:  </label>
      <select value={currTypes} id='accTestTypes' onChange={handleChange}>
        <option value='html'>HTML</option>
        <option value='react'>React</option>
        <option value='puppeteer'>Puppeteer</option>
      </select>
    </div>
  );
};

export default AccTestTypes;

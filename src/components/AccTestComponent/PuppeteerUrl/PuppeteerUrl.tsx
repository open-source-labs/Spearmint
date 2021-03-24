import React from 'react';

const AccTestTypes = ({ dispatch, action }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(action(e.target.value));
  };

  return (
    <div>
      <label>URL to be Tested:</label>
      <input onChange = { handleChange }>
      </input>
    </div>
  );
};

export default AccTestTypes;

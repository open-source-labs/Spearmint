import React, { useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { actionTypes } from '../../context/actions/globalActions';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TestFrameworkToggle = () => {
  const [globalState, dispatchToGlobal] = useContext(GlobalContext);
  const { testFramework } = globalState;

  const handleChange = (event) => {
    dispatchToGlobal({
      type: actionTypes.SET_TEST_FRAMEWORK,
      testFramework: event.target.value,
    });
  };

  return (
    <FormControl fullWidth size="small" variant="outlined">
      <InputLabel id="framework-select-label">Test Framework</InputLabel>
      <Select
        labelId="framework-select-label"
        id="framework-select"
        value={testFramework}
        onChange={handleChange}
        label="Test Framework"
      >
        <MenuItem value="jest">Jest</MenuItem>
        <MenuItem value="cypress">Cypress</MenuItem>
        <MenuItem value="mocha">Mocha</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TestFrameworkToggle;
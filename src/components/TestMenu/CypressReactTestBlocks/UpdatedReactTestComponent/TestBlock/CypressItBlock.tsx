import React, { useContext } from 'react';
import { CypressReactTestCaseContext } from '../../../../../context/CypressReactTestCaseProvider';
import { updateItStatementText, addRender, addAction, addAssertion } from '../../context/actions/frontendFrameworkTestCaseActions';
import { TextField, Button } from '@mui/material';

const ItBlock = ({ itId, describeId, text }) => {
  const [state, dispatch] = useContext(CypressReactTestCaseContext);

  const handleTextChange = (e) => {
    dispatch(updateItStatementText(e.target.value, itId));
  };

  return (
    <div style={{ border: '1px solid gray', padding: '1rem', marginBottom: '1rem' }}>
      <TextField
        label="Test Description"
        value={text}
        onChange={handleTextChange}
        fullWidth
        size="small"
      />
      <div style={{ marginTop: '1rem' }}>
        <Button variant="outlined" onClick={() => dispatch(addRender(describeId, itId))}>
          Add Render
        </Button>
        <Button variant="outlined" onClick={() => dispatch(addAction(describeId, itId))}>
          Add Action
        </Button>
        <Button variant="outlined" onClick={() => dispatch(addAssertion(describeId, itId))}>
          Add Assertion
        </Button>
      </div>
    </div>
  );
};

export default ItBlock;

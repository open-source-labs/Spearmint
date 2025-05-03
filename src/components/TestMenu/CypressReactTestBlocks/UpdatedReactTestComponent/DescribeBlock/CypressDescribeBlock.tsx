import React, { useContext } from 'react';
import { TextField, Button } from '@mui/material';
import { CypressReactTestCaseContext } from '../../../../../context/CypressReactTestCaseProvider';
import { updateDescribeText, addItstatement } from '../../../../../context/actions/frontendFrameworkTestCaseActions';
import ItBlock from '../TestBlock/CypressItBlock'; // Make sure this points to your ItBlock

interface Props {
  describeId: string;
}

const CypressDescribeBlock: React.FC<Props> = ({ describeId }) => {
  const [state, dispatch] = useContext(CypressReactTestCaseContext);
  const { describeBlock, itStatements } = state;

  const describeData = describeBlock.byId[describeId];
  const currentIts = itStatements.allIds[describeId] || [];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDescribeText(e.target.value, describeId));
  };

  const handleAddIt = () => {
    dispatch(addItstatement(describeId));
  };

  return (
    <div style={{ border: '2px solid black', padding: '1rem', marginBottom: '1rem' }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Describe"
        value={describeData?.text || ''}
        onChange={handleTextChange}
      />
      <Button variant="outlined" onClick={handleAddIt} style={{ marginTop: '1rem' }}>
        Add It Statement
      </Button>

      {currentIts.map((itId) => {
        const itBlockData = itStatements.byId[itId];
        return (
          <ItBlock
            key={itId}
            itId={itId}
            describeId={describeId}
            text={itBlockData?.text || ''}
          />
        );
      })}
    </div>
  );
};

export default CypressDescribeBlock;

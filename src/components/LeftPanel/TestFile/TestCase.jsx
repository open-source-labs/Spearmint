import React, { useReducer } from 'react';
import TestMenu from './TestCase/TestMenu';
import MockData from './TestCase/MockData';
import Action from './TestCase/Action';
import Assertion from './TestCase/Assertion';
import Render from './TestCase/Render';
import { testCaseReducer, initialState, updateTestStatement, toggleMockData, addMockData } from './TestCase/testCaseReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TestCase = () => {
  const [testCase, dispatch] = useReducer(testCaseReducer, initialState);
  
  const handleUpdateTestStatement = (e) => {
    dispatch(updateTestStatement(e.target.value));
  };

  const handleToggleMockData = () => {
    dispatch(toggleMockData());
  }

  const handleAddMockData = () => {
    dispatch(addMockData());
  }

  const mockData = testCase.mockData.map((mockDatum) => {
    if (mockDatum.type === 'mockData') {
      return <MockData key={mockDatum.id} mockDatumId={mockDatum.id} dispatch={dispatch} keys={mockDatum.keys} />
    }
  }).filter(Boolean);

  const statements = testCase.statements.map(statement => {
    switch (statement.type) {
      case 'action':
        return <Action key={statement.id} id={statement.id} dispatch={dispatch} />
        case 'assertion':
        return <Assertion key={statement.id} id={statement.id} dispatch={dispatch} />
        case 'render':
        return <Render key={statement.id} id={statement.id} dispatch={dispatch} />
        default:
        return
      }
    })
    
    return (
    <div>
      <TestMenu />
      <section>
        <label htmlFor='test-statement'>test:</label>
        <input type='text' id='test-statement' name='test-statement' value={testCase.testStatement} onChange={handleUpdateTestStatement} />
      </section>   
      
      <section>
        <label htmlFor='mock-data-checkbox'>Will you need mock data:</label>
        <input type='checkbox' id='mock-data-checkbox' name='mock-data' disabled={mockData.length} onClick={handleToggleMockData}/>
      </section>
      
      {testCase.mockDataCheckBox &&
      <section>
        <label htmlFor='mock-data'>Mock data</label>
        <FontAwesomeIcon id='mock-data' icon='plus' onClick={handleAddMockData} />
        {mockData}
      </section>
      }

      {statements}
    </div>
  )
}


export default TestCase; 
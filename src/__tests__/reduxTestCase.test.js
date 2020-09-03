import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ReactTestCaseContext } from '../context/reducers/reactTestCaseReducer';
import { MockDataContext } from '../context/reducers/mockDataReducer';
import ReduxTestCase from '../components/TestCase/ReduxTestCase';

describe('should render ReduxTestCase component', () => {
  const { getByRole, debug } = render(<ReduxTestCase />);

  screen.debug();
});

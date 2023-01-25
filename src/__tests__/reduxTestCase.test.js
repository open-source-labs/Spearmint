import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReduxTestCase from '../components/TestCase/ReduxTestCase';

xdescribe('should render ReduxTestCase component', () => {
  const { getByRole, debug } = render(<ReduxTestCase />);

  screen.debug();
});

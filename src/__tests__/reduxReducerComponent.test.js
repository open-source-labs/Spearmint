/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Reducer from '../components/ReduxTestComponent/Reducer/Reducer';

const props = {
  reducer: {
    id: 1,
    itStatement: '',
    reducerName: '',
    initialState: '',
    reducerAction: '',
    payloadKey: '',
    payloadValue: '',
    expectedKey: '',
    expectedValue: '',
  },
  index: 0
}
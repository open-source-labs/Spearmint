import React from 'react';
import LeftPanel from '../LeftPanel';
import { GlobalContext } from '../../../context/globalReducer';
import { render, fireEvent } from '@testing-library/react';
import { build, fake } from 'test-data-bot';
import '@testing-library/react/cleanup-after-each';
import 'jest-dom/extend-expect'

test('wipes existing test statements when new test button is clicked ', () => {
});
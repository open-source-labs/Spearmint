import React from "react";
import LeftPanel from '../src/containers/LeftPanel/LeftPanel.jsx';
import {
render,
fireEvent
} from 'react-testing-library';
import {
build,
fake
} from 'test-data-bot';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect'


test('new test button clears all data from left panel', () => {
const {
getByText,
TestId,
rerender
} = render( < LeftPanel /> );
    fireEvent.click(getByText('New Test +'));
    fireEvent.click(getByText('Continue'));
    rerender( < LeftPanel /> );
        expect(TestId(actionCard)).not.toBeInTheDocument()
        });
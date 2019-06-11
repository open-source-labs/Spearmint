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


test('creates a new assertion card when button is clicked', () => {
const {
getByTestId,
rerender
} = render( < LeftPanel /> );
    fireEvent.click(getByTestId('assertionButton'));
    rerender( < LeftPanel /> );
        expect(getByTestId(assertionCard)).toBeInTheDocument()
        });
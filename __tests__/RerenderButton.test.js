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


test('creates a new rerender card when rerender button is clicked', () => {
const {
getByTestId,
rerender
} = render( < LeftPanel /> );
    fireEvent.click(getByTestId('rerenderButton'));
    rerender( < LeftPanel /> );
        expect(getByTestId(renderCard)).toBeInTheDocument()
        });
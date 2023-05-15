/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';


const props = {
  async: {
    id: 0,
    field: 'string',
    actionType: 'string',
    actionsFileName: 'string',
    filePath: 'string',
    typesFileName: 'string',
    typesFilePath: 'string',
    asyncFunction: 'string',
    method: 'string',
    route: 'string',
    actionsFile: 'string',
    responseType: 'string',
    it: 'string',
    payloadKey: null,
    payloadType: null,
    expectedArg: 'string',
  },
  index: 0
}
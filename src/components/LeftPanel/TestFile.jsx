import React, { useState } from 'react';
import TestMenu from './TestFile/TestMenu';
import TestCase from './TestFile/TestCase';

const TestFile = ({ fileName }) => {
  return (
    <> 
      <TestMenu />
      <TestCase />
    </>
  )
}

export default TestFile; 
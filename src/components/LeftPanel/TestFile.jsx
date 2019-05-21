import React, { useState } from 'react';
import TestMenu from './TestCase/TestMenu';
import TestCase from './TestCase';

const TestFile = ({ fileName }) => {
  return (
    <> 
      <TestMenu />
      <TestCase />
    </>
  )
}

export default TestFile; 
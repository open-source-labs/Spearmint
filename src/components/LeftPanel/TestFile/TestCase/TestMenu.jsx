import React from 'react';

const TestMenu = () => (
  <div className='flex-container'>
    <div id='left-menu'>
      <button className='menu-btn'>New Test</button>
    </div>
    <div id='right-menu'>
      <button className='menu-btn'>Action</button>
      <button className='menu-btn'>Assertion</button>
      <button className='menu-btn'>Render</button>
    </div>
  </div>
)

export default TestMenu; 
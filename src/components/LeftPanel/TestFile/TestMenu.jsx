import React from 'react'
import { addAction, addAssertion, addRender } from '../../../context/testCaseActions'

const TestMenu = ({ dispatchTestCase }) => {
  const handleAddAction = e => {
    dispatchTestCase(addAction())
  }
  const handleAddAssertion = e => {
    dispatchTestCase(addAssertion())
  }
  const handleAddRender = e => {
    dispatchTestCase(addRender())
  }

  const panel = {
    display: 'flex',
    justifyContent: 'center',
  }

  return (
    <div className='flex-container' style={panel}>
      <div id='left-menu'>
        <button className='menu-btn'>New Test</button>
      </div>
      <div id='right-menu'>
        <button className='menu-btn' onClick={handleAddAction}>
          Action
        </button>
        <button className='menu-btn' onClick={handleAddAssertion}>
          Assertion
        </button>
        <button className='menu-btn' onClick={handleAddRender}>
          Render
        </button>
      </div>
    </div>
  )
}

export default TestMenu

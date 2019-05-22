import React from 'react';
import LeftPanel from './containers/LeftPanel';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faMinus, faTimes)

const App = () => (
  <>
    <LeftPanel />
  </>
)

export default App;

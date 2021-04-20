import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { GlobalContext } from '../../context/reducers/globalReducer';
const { Terminal } = require('xterm');

const term = new Terminal()


const TerminalGenerator = () => {
  const [{ url }, dispatchToGlobal] = useContext(GlobalContext);
  useEffect(() => {
    term.open(document.getElementsByClassName('terminal')[0])
    term.write('Hello, world')
  }, []);
  return <div></div>

}

export default TerminalGenerator

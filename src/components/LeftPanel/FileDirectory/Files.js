import React, { Component } from 'react';
import FileTree from './FileTree'
// const { ipcRenderer } = window.require('electron')


//WITH REMOTE
let remote = window.require('electron').remote;
let { dialog } = remote;




class App extends Component { 
  constructor(props){
    super(props);

    this.state = {
      fileTree: null
    }
  }
  
  render() {
    let filetree = this.state.fileTree
    ? this.state.fileTree.renderUnorderedList()
    : null;

    console.log(filetree, 'filetree in app')
    return (
      <div>
        <button onClick={this.handleOpenFolder}>Open Folder</button>
        <div id="filetree">
          {filetree}
        </div>
      </div>
    );
  }

  handleOpenFolder = () => {
    let directory = dialog.showOpenDialog({ properties: ['openDirectory']});

    if (directory && directory[0]){
      let fileTree = new FileTree(directory[0]);

      fileTree.build();

      this.setState({fileTree})
      
    }
    
  }
}

export default App;
























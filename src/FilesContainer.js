import React, { useState, useContext } from 'react';
import FileTree from './FileTree';
import { FileCodeContext } from './App';
let remote = window.require('electron').remote;
let electronFs = remote.require('fs')
let { dialog } = remote;

const FilesContainer = () => {
  const [fileTree, setFileTree] = useState(null);
  const setFileCode = useContext(FileCodeContext);

  const handleShowCode = (filepath) => {
    const content = electronFs.readFileSync(filepath, "utf8");
    setFileCode(content);
  }

  const handleOpenFolder = () => {
    let directory = dialog.showOpenDialog({
      properties: ['openDirectory'],
      filters: [
        {name: 'Javascript Files', extensions: ['js', 'jsx']},
        {name: 'Style', extensions: ['css']},
        {name: 'Html', extensions: ['html']}
      ]
    });
    if (directory && directory[0]){
      setFileTree(generateFileTreeObject(directory[0]));
    }
  }

  //reads contents within the selected directory and checks if it is a file/folder
  const generateFileTreeObject = (directoryPath) => {
    let fileArray = electronFs.readdirSync(directoryPath).map(fileName => {
      const file = {
        filePath: `${directoryPath}/${fileName}`,
        fileName,
        files: [],
      }
      //generateFileTreeObj will be recursively called if it is a folder
      const fileData = electronFs.statSync(file.filePath);
      if (fileData.isDirectory()) {
        file.files = generateFileTreeObject(file.filePath)
      }
      return file;
    })
    return fileArray;
  }

  return (
    <div>
      <button className="openBtn" onClick={handleOpenFolder}>
        Open Folder
      </button>
      <div id="filetree">
        <FileTree fileTree={fileTree} handleShowCode={handleShowCode} /> 
      </div>
    </div>
  );
}

export default FilesContainer;







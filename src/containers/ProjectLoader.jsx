import React, { useContext } from 'react';
import FileDirectory from '../components/NavBar/FileDirectory';
import { FileTreeContext } from '../App';

let remote = window.require('electron').remote;
let electronFs = remote.require('fs')
let { dialog } = remote;


const openBtnStyle = {
  width: "100px",
  height: "40px",
  borderRadius: "15px",
  border: "2px solid black",
  fontSize: "12px"
}

const ProjectLoader = () => {

  const setFileTree = useContext(FileTreeContext);

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
      <button className="openBtn" onClick={handleOpenFolder} style={openBtnStyle}>
        Open Folder
      </button>
      <div id="filetree">
      </div>
    </div>
  );
}

export default ProjectLoader;




import React, { useContext } from 'react';
// import styles from './ProjectLoader.module.scss';
import { GlobalContext } from '../../context/globalReducer';
import { setProjectUrl, loadProject, createFileTree } from '../../context/globalActions';

let remote = window.require('electron').remote;
let electronFs = remote.require('fs');
let { dialog } = remote;

const ProjectLoader = () => {
  const [_, dispatchToGlobal] = useContext(GlobalContext);

  const handleChangeUrl = e => {
    dispatchToGlobal(setProjectUrl(e.target.value));
  };

  const handleOpenFolder = () => {
    let directory = dialog.showOpenDialog({
      properties: ['openDirectory'],
      filters: [
        { name: 'Javascript Files', extensions: ['js', 'jsx'] },
        { name: 'Style', extensions: ['css'] },
        { name: 'Html', extensions: ['html'] },
      ],
    });
    if (directory && directory[0]) {
      dispatchToGlobal(loadProject());
      dispatchToGlobal(createFileTree(generateFileTreeObject(directory[0])));
    }
  };

  //reads contents within the selected directory and checks if it is a file/folder
  const generateFileTreeObject = directoryPath => {
    let fileArray = electronFs.readdirSync(directoryPath).map(fileName => {
      const file = {
        filePath: `${directoryPath}/${fileName}`,
        fileName,
        files: [],
      };
      //generateFileTreeObj will be recursively called if it is a folder
      const fileData = electronFs.statSync(file.filePath);
      if (file.fileName !== 'node_modules' && file.fileName !== '.git') {
        if (fileData.isDirectory()) {
          file.files = generateFileTreeObject(file.filePath);
        }
      }
      return file;
    });
    return fileArray;
  };

  return (
    <div>
      <span>
        <h1>
          spearmint
          <img src='https://img.icons8.com/ios/40/000000/natural-food.png' alt='' />
        </h1>
      </span>
      <h2>A FRESH TAKE ON TESTING </h2>
      <input
        type='text'
        id='url'
        placeholder="Enter test site's URL..."
        onChange={handleChangeUrl}
      />
      <button className='openBtn' onClick={handleOpenFolder}>
        Open Folder
      </button>
      <div id='filetree' />
    </div>
  );
};

export default ProjectLoader;

import React, { useContext } from 'react';
import styles from './ProjectLoader.module.scss';
import { FileTreeContext, LoadedContext, UrlContext } from '../../App';

const remote = window.require('electron').remote;
const electronFs = remote.require('fs');
const { dialog } = remote;

const ProjectLoader = () => {
  const setUrl = useContext(UrlContext);
  const setLoaded = useContext(LoadedContext);
  const setFileTree = useContext(FileTreeContext);

  const handleChangeUrl = e => {
    setUrl(e.target.value);
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
      setLoaded(!false);
      setFileTree(generateFileTreeObject(directory[0]));
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
    <div id={styles.projectLoader}>
      <section id={styles.upperPart}>
        <span id={styles.title}>spearmint </span>
        <svg
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          id={styles.leaf}
        >
          <path
            fill='#ffffff'
            d='M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z'
          />
        </svg>
      </section>
      <section id={styles.lowerPart}>
        <h3 id={styles.subText}>A simple way to test your React app </h3>
        <div id={styles.appBox}>
          <div class={styles.contentBox}>
            <span class={styles.number}>01</span>
            <span class={styles.text}> Enter the URL</span> <br />
            <input
              type='text'
              id={styles.url}
              placeholder="Enter test site's url"
              onChange={handleChangeUrl}
            />
          </div>
          <div class={styles.contentBox}>
            <span class={styles.number}>02</span>
            <span class={styles.text}>Select your application</span> <br />
            <button id={styles.openBtn} onClick={handleOpenFolder}>
              Open Folder
            </button>
          </div>
        </div>
      </section>
      <div id='filetree' />
    </div>
  );
};

export default ProjectLoader;

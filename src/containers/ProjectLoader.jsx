import React, { useContext } from "react";
import styles from "../assets/stylesheets/components/ProjectLoader/ProjectLoader.module.scss";
import { FileTreeContext, LoadedContext, UrlContext } from "../App";

const remote = window.require("electron").remote;
const electronFs = remote.require("fs");
const { dialog } = remote;
const leaf = require("../assets/images/leaf.png");

const ProjectLoader = () => {
  const setUrl = useContext(UrlContext);
  const setLoaded = useContext(LoadedContext);
  const setFileTree = useContext(FileTreeContext);

  const handleChangeUrl = e => {
    setUrl(e.target.value);
  };

  const handleOpenFolder = () => {
    let directory = dialog.showOpenDialog({
      properties: ["openDirectory"],
      filters: [
        { name: "Javascript Files", extensions: ["js", "jsx"] },
        { name: "Style", extensions: ["css"] },
        { name: "Html", extensions: ["html"] }
      ]
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
        files: []
      };
      //generateFileTreeObj will be recursively called if it is a folder
      const fileData = electronFs.statSync(file.filePath);
      if (file.fileName !== "node_modules" && file.fileName !== ".git") {
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
      <div id={styles.left}>
        <h1>
          spearmint <img src={leaf} />
        </h1>
        <h2>A FRESH TAKE ON TESTING </h2>
      </div>
      <div id={styles.right}>
        <p>Enter the URL</p>
        <input
          type="text"
          id="url"
          placeholder="Enter test site's URL..."
          onChange={handleChangeUrl}
        />
        <p>Select your application</p>
        <button className="openBtn" onClick={handleOpenFolder}>
          Open Folder
        </button>
      </div>
      <div id="filetree" />
    </div>
  );
};

export default ProjectLoader;

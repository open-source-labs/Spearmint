export interface GlobalActionTypes {
  type: string,
  url?: string,
  load?: string,
  fileTree?: string,
  display?: string,
  filePath?: string,
  fileName?: string,
  projectFilePath?: string,
  filePathMap?: string,
  testCase?: string,
  testString?: string,
  docsUrl?: string,
  validCode?: boolean,
  tabIndex?: number,
  testState?: Object,
  guestState?: string,
  theme?: string,
  fileDirectoryOpen?: string,
  testFramework?: 'jest' | 'cypress' | 'mocha' | 'sinon';
}

export interface GlobalStateTypes {
  url: string,
  projectUrl: (null | string),
  isProjectLoaded: boolean,
  fileTree: (null | File[]),
  isFileDirectoryOpen: boolean,
  isRightPanelOpen: boolean,
  rightPanelDisplay: string,
  isFolderOpen: isFolderOpenType,
  isFileHighlighted: string,
  projectFilePath: string,
  filePathMap: filePathMapType,
  file: string,
  testCase: string,
  docsOpen: boolean,
  isTestModalOpen: boolean,
  exportBool: boolean,
  fileName: string,
  filePath: string,
  validCode: boolean,
  tabIndex: number,
  isGuest: boolean,
  theme: any,
  testFramework: 'jest' | 'cypress' | 'mocha' | 'sinon'; //! added new global testframework
}

/**
 * Fixing input validation due to indexing errors.
 */
export interface extensionCheckerType {
    [key: string]: number,
}

export interface isFolderOpenType {
  [key: string]: boolean;
}


export interface filePathMapType {
  [key: string]: Object
}

/* Interface for Modal files and fileTree */
export interface File {
    fileName: string;
    filePath: string;
    files: File[];
}

//  Interface for filePathMap
export interface FilePathMap {
  [key: string]: string;
}
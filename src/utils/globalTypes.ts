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
}

export interface GlobalStateTypes {
  url: string,
  projectUrl: (null | string),
  isProjectLoaded: boolean,
  fileTree: (null | Object),
  isFileDirectoryOpen: boolean,
  isRightPanelOpen: boolean,
  rightPanelDisplay: string,
  isFolderOpen: isFolderOpenType,
  isFileHighlighted: string,
  projectFilePath: string,
  filePathMap: Object,
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

type Id = string
type TypeId = Id
type DraggableId = Id
type DroppableId = Id

type DraggableLocation = {
  droppableId: DroppableId
  index: number
}

export type DropResult = {
  draggableId: DraggableId,
  type: TypeId
  source: DraggableLocation
  destination?: DraggableLocation
}
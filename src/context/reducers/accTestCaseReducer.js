import { createContext } from 'react';
import { actionTypes } from '../actions/accTestCaseActions';

export const AccTestCaseContext = createContext([]);

export const accTestCaseState = {
  modalOpen: false,

  describeId: 1,
  itId: 1,
  statementId: 1,
  propId: 1,
  describeBlocks: {
    byId: {
      describe0: {
        id: 'describe0',
        text: '',
      },
    },
    allIds: ['describe0'],
  },
  itStatements: {
    byId: {
      it0: {
        id: 'it0',
        describeId: 'describe0',
        text: '',
      },
    },
    allIds: {
      describe0: ['it0'],
    },
  },
  fileName: '',
  filePath: '',
};

/* ---------------------------- Helper Functions ---------------------------- */

const createDescribeBlock = (describeId) => {
  return {
    id: describeId,
    text: '',
  };
};

const createItStatement = (describeId, itId) => ({
  id: itId,
  describeId,
  text: '',
});

/* ------------------------- Accessibility Test Case Reducer ------------------------ */

export const accTestCaseReducer = (state, action) => {
  Object.freeze(state);

  let describeBlocks;
  let itStatements;

  if (state && action) {
    describeBlocks = { ...state.describeBlocks };
    itStatements = { ...state.itStatements };
  }

  switch (action.type) {
    case actionTypes.ADD_DESCRIBE_BLOCK: {
      let updatedDescribeId = state.describeId;
      const describeId = `describe${state.describeId}`;

      return {
        ...state,
        describeId: ++updatedDescribeId,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...describeBlocks.byId,
            [describeId]: createDescribeBlock(describeId),
          },
          allIds: [...(describeBlocks.allIds || []), describeId],
        },
        itStatements: {
          ...itStatements,
          allIds: {
            ...itStatements.allIds,
            [describeId]: [],
          },
        },
      };
    }
    case actionTypes.DELETE_DESCRIBE_BLOCK: {
      const { describeId } = action;
      const newDescById = { ...describeBlocks.byId };
      const newItById = { ...itStatements.byId };
      const newItAllIds = { ...itStatements.allIds };

      // delete it from describeBlocks.byId
      delete newDescById[describeId];
      // delete it from describeBlocks.allIds
      const newDescAllIds = describeBlocks.allIds.filter((id) => id !== describeId);

      // delete from itStatements.byId
      itStatements.allIds[describeId].forEach((itId) => {
        delete newItById[itId];
      });
      // delete from itStatements.allIds
      delete newItAllIds[describeId];

      return {
        ...state,
        describeBlocks: {
          byId: newDescById,
          allIds: newDescAllIds,
        },
        itStatements: {
          byId: newItById,
          allIds: newItAllIds,
        },
      };
    }
    case actionTypes.UPDATE_DESCRIBE_TEXT: {
      const { describeId, text } = action;
      const byIds = { ...describeBlocks.byId };
      const block = { ...describeBlocks.byId[describeId] };
      return {
        ...state,
        describeBlocks: {
          ...describeBlocks,
          byId: {
            ...byIds,
            [describeId]: {
              ...block,
              text,
            },
          },
        },
      };
    }
    case actionTypes.UPDATE_DESCRIBE_ORDER: {
      const { reorderedDescribe } = action;

      return {
        ...state,
        describeBlocks: {
          ...describeBlocks,
          allIds: reorderedDescribe,
        },
      };
    }
    case actionTypes.ADD_ITSTATEMENT: {
      const { describeId } = action;
      const itId = `it${state.itId}`;
      let updatedItId = state.itId;

      return {
        ...state,
        itId: ++updatedItId,
        itStatements: {
          ...itStatements,
          byId: {
            ...itStatements.byId,
            [itId]: createItStatement(describeId, itId),
          },
          allIds: {
            ...itStatements.allIds,
            [describeId]: [...(itStatements.allIds[describeId]), itId],
          },
        },
      };
    }
    case actionTypes.DELETE_ITSTATEMENT: {
      const { itId, describeId } = action;
      const byId = { ...itStatements.byId };
      delete byId[itId];
      const newAllIds = itStatements.allIds[describeId].filter((id) => id !== itId);

      return {
        ...state,
        itStatements: {
          ...itStatements,
          byId: {
            ...byId,
          },
          allIds: {
            ...itStatements.allIds,
            [describeId]: [...newAllIds],
          },
        },
      };
    }
    case actionTypes.UPDATE_ITSTATEMENT_TEXT: {
      const { itId, text } = action;
      const byId = { ...itStatements.byId };
      const block = { ...itStatements.byId[itId] };
      return {
        ...state,
        itStatements: {
          ...itStatements,
          byId: {
            ...byId,
            [itId]: {
              ...block,
              text,
            },
          },
        },
      };
    }
    case actionTypes.UPDATE_ITSTATEMENT_ORDER: {
      const { reorderedIt, describeId } = action;

      return {
        ...state,
        itStatements: {
          ...itStatements,
          allIds: {
            ...itStatements.allIds,
            [describeId]: reorderedIt,
          },
        },
      };
    }
    case actionTypes.CREATE_NEW_TEST: {
      return { ...accTestCaseState };
    }
    case actionTypes.OPEN_INFO_MODAL: {
      return {
        ...state,
        modalOpen: true,
      };
    }
    case actionTypes.CLOSE_INFO_MODAL: {
      return {
        ...state,
        modalOpen: false,
      };
    }
    case actionTypes.UPDATE_FILE_PATH: {
      const { fileName, filePath } = action;
      return {
        ...state,
        fileName,
        filePath,
      };
    }
    default:
      return state;
  }
};

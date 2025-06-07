import { accTestCaseReducer } from "../context/reducers/accTestCaseReducer";

describe('Accessibility Reducer', () => {
    let initialState = {}

    beforeEach(() => {
        initialState = {
          modalOpen: false,
          describeId: 1,
          itId: 1,
          statementId: 1,
          propId: 1,
          describeBlocks: {
            byId: {
              describe0: {
                id: 'describe0',
                text: 'Component is accessible according to all standards enforced by axe-core.',
                standardTag: 'none',
              },
            },
            allIds: ['describe0'],
          },
          itStatements: {
            byId: {
              it0: {
                id: 'it0',
                describeId: 'describe0',
                text: 'Component is accessible regarding all axe-core categories.',
                catTag: 'none',
              },
            },
            allIds: {
              describe0: ['it0'],
            },
          },
          fileName: '',
          filePath: '',
          puppeteerUrl: 'sample.io',
          testType: '',
        };
    })

    it('should return the initial state', () => {
        expect(accTestCaseReducer(initialState, {})).toEqual(initialState)
    })

    it('should handle RESET_TESTS', () => {
        expect(accTestCaseReducer(initialState, { type: 'RESET_TESTS' })).toEqual(initialState)
    })

    it('should handle ADD_DESCRIBE_BLOCK', () => {
        expect(accTestCaseReducer(initialState, { type: 'ADD_DESCRIBE_BLOCK' })).toEqual({
          ...initialState,
          describeId: 2,
          describeBlocks: {
            byId: {
              ...initialState.describeBlocks.byId,
              describe1: {
                id: 'describe1',
                text: 'Component is accessible according to all standards enforced by axe-core.',
                standardTag: 'none',
              },
            },
            allIds: ['describe0', 'describe1'],
          },
          itStatements: {
            byId: { ...initialState.itStatements.byId },
            allIds: {
                ...initialState.itStatements.allIds,
                describe1: []
            }
          },
        });
    })

    it('should handle DELETE_DESCRIBE_BLOCK', () => {
        const action = {
            type: 'DELETE_DESCRIBE_BLOCK',
            describeId: 'describe0'
        };
        expect(accTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            describeBlocks: {
                byId: {},
                allIds: []
            },
            itStatements: {
                byId: {},
                allIds: {}
            },
        });
    });

    it('should handle UPDATE_DESCRIBE_TEXT', () => {
        const action = {
            type: 'UPDATE_DESCRIBE_TEXT',
            describeId: 'describe0',
            text: 'update describe text'
        };
        expect(accTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            describeBlocks: {
                ...initialState.describeBlocks,
                byId: {
                    describe0: {
                        id: 'describe0',
                        text: action.text,
                        standardTag: 'none'
                    },
                },
            },
        });
    });

    // Need to fix
    it('should handle UPDATE_DESCRIBE_STANDARD_TAG', () => {
      const action = {
        type: 'UPDATE_DESCRIBE_STANDARD_TAG',
        describeId: 'describe0',
        standardTag: 'WCAG 2.0 Level A',
      };
      expect(accTestCaseReducer(initialState, action)).toEqual({
        ...initialState,
        describeBlocks: {
          ...initialState.describeBlocks,
          byId: {
            describe0: {
              id: 'describe0',
              text: 'Component is accessible according to all standards enforced by axe-core.',
              standardTag: action.standardTag,
            },
          },
        },
      });
    });

    // Need to fix in accReducer
    it('should handle ADD_ITSTATEMENT', () => {
        const action = {
            type: 'ADD_ITSTATEMENT',
            describeId: 'describe0'
        };
        expect(accTestCaseReducer(initialState, action)).toEqual({
          ...initialState,
          itId: 2,
          itStatements: {
            byId: {
              ...initialState.itStatements.byId,
              it1: {
                id: 'it1',
                describeId: 'describe0',
                text: 'Component is accessible regarding all axe-core categories.',
                catTag: 'none',
              },
            },
            allIds: {
                describe0: ['it0', 'it1']
            },
          },
        });
    });

    it('should handle DELETE_ITSTATEMENT', () => {
        const action = {
            type:  'DELETE_ITSTATEMENT',
            describeId: 'describe0',
            itId: 'it0'
        };
        expect(accTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            itStatements: {
                byId: {},
                allIds: {
                    describe0: [],
                },
            },
        });
    });

    it('should handle UPDATE_ITSTATEMENT_TEXT', () => {
        const action = {
            type: 'UPDATE_ITSTATEMENT_TEXT', 
            itId: 'it0',
            text: 'update itStatement text',
        };
        expect(accTestCaseReducer(initialState, action)).toEqual({
          ...initialState,
          itStatements: {
            ...initialState.itStatements,
            byId: {
              it0: {
                id: 'it0',
                describeId: 'describe0',
                text: action.text,
                catTag: 'none',
              },
            },
          },
        });
    });

    it('should handle UPDATE_IT_CAT_TAG', () => {
        const action = {
            type: 'UPDATE_IT_CAT_TAG',
            itId: 'it0',
            catTag: 'color'
        };
        expect(accTestCaseReducer(initialState, action)).toEqual({
          ...initialState,
          itStatements: {
            ...initialState.itStatements,
            byId: {
              it0: {
                id: 'it0',
                describeId: 'describe0',
                text: 'Component is accessible regarding all axe-core categories.',
                catTag: action.catTag,
              },
            },
          },
        });
    });

    it('should handle OPEN_MODAL_INFO', () => {
        expect(accTestCaseReducer(initialState, { type: 'OPEN_MODAL_INFO' })).toEqual({
            modalOpen: true,
            ...initialState,
        });  
    });

    it('should handle CLOSE_MODAL_INFO', () => {
        expect(accTestCaseReducer(initialState, { type: 'CLOSE_MODAL_INFO' })).toEqual({
          modalOpen: false,
          ...initialState,
        });  
    })

    it('should handle UPDATE_FILE_PATH', () => {
        const action = {
            type: 'UPDATE_FILE_PATH',
            fileName: 'update fileName',
            filePath: 'update filePath',
        };
        expect(accTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            fileName: action.fileName,
            filePath: action.filePath,
        })
    })

    it('should handle CREATE_PUPPETEER_URL', () => {
        const action = {
            type: 'CREATE_PUPPETEER_URL',
            puppeteerUrl: 'created puppeteer url'
        };
        expect(accTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            puppeteerUrl: action.puppeteerUrl
        });
    });

    it('should handle REPLACE_TEST', () => {
        const action = {
            type: 'REPLACE_TEST',
            testState: initialState
        }
        expect(accTestCaseReducer(initialState, action)).toEqual(action.testState)
    })
})
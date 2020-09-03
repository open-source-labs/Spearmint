import { reactTestCaseReducer, reactTestCaseState } from '../context/reducers/reactTestCaseReducer';

describe('React Reducer', () => {
  let initialState = {};

  beforeEach(() => {
    initialState = {
      describeId: 1,
      itId: 1,
      statementId: 3,
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
        allIds: ['it0'],
      },
      statements: {
        byId: {
          statement0: {
            id: 'statement0',
            itId: 'it0',
            describeId: 'describe0',
            type: 'render',
            props: [
              {
                id: 'prop0',
                statementId: 'statement0',
                propKey: '',
                propValue: '',
              },
            ],
          },
          statement1: {
            id: 'statement1',
            itId: 'it0',
            describeId: 'describe0',
            type: 'action',
            eventType: '',
            eventValue: null,
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            suggestions: [],
          },
          statement2: {
            id: 'statement2',
            itId: 'it0',
            describeId: 'describe0',
            type: 'assertion',
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            isNot: false,
            matcherType: '',
            matcherValue: '',
            suggestions: [],
          },
        },
        allIds: ['statement0', 'statement1', 'statement2'],
        componentPath: '',
        componentName: '',
      },
    };
  });

  it('should return the initial state', () => {
    expect(reactTestCaseReducer(initialState, {})).toEqual(initialState);
  });

  it('should handle TOGGLE_REACT', () => {
    expect(reactTestCaseReducer(initialState, { type: 'TOGGLE_REACT' })).toEqual({
      ...initialState,
    });
  });

  it('should handle ADD_DESCRIBE_BLOCK', () => {
    expect(reactTestCaseReducer(initialState, { type: 'ADD_DESCRIBE_BLOCK' })).toEqual({
      ...initialState,
      describeId: 2,
      describeBlocks: {
        byId: {
          ...initialState.describeBlocks.byId,
          describe1: {
            id: 'describe1',
            text: '',
          },
        },
        allIds: ['describe0', 'describe1'],
      },
    });
  });

  it('should handle UPDATE_DESCRIBE_TEXT', () => {
    const action = {
      type: 'UPDATE_DESCRIBE_TEXT',
      describeId: 'describe0',
      text: 'update describe text',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      describeBlocks: {
        ...initialState.describeBlocks,
        byId: {
          describe0: {
            id: 'describe0',
            text: 'update describe text',
          },
        },
      },
    });
  });

  it('should handle DELETE_DESCRIBE_BLOCK', () => {
    const action = {
      type: 'DELETE_DESCRIBE_BLOCK',
      describeId: 'describe0',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      describeBlocks: {
        byId: {},
        allIds: [],
      },
      itStatements: {
        byId: {},
        allIds: [],
      },
      statements: {
        ...initialState.statements,
        byId: {},
        allIds: [],
      },
    });
  });

  it('should handle ADD_ITSTATEMENT', () => {
    const action = {
      type: 'ADD_ITSTATEMENT',
      describeId: 'describe0',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      itId: 2,
      itStatements: {
        byId: {
          ...initialState.itStatements.byId,
          it1: {
            id: 'it1',
            describeId: 'describe0',
            text: '',
          },
        },
        allIds: ['it0', 'it1'],
      },
    });
  });

  it('should handle UPDATE_ITSTATEMENT_TEXT', () => {
    const action = {
      type: 'UPDATE_ITSTATEMENT_TEXT',
      itId: 'it0',
      text: 'update itStatement text',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      itStatements: {
        ...initialState.itStatements,
        byId: {
          it0: {
            id: 'it0',
            describeId: 'describe0',
            text: 'update itStatement text',
          },
        },
      },
    });
  });

  it('should handle DELETE_ITSTATEMENT', () => {
    const action = {
      type: 'DELETE_ITSTATEMENT',
      itId: 'it0',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      itStatements: {
        byId: {},
        allIds: [],
      },
      statements: {
        ...initialState.statements,
        byId: {},
        allIds: [],
      },
    });
  });

  /* --------------------------------- Action --------------------------------- */
  it('should handle ADD_ACTION', () => {
    const action = {
      type: 'ADD_ACTION',
      describeId: 'describe0',
      itId: 'it0',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      statementId: 4,
      statements: {
        ...initialState.statements,
        byId: {
          ...initialState.statements.byId,
          statement3: {
            id: 'statement3',
            itId: 'it0',
            describeId: 'describe0',
            type: 'action',
            eventType: '',
            eventValue: null,
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            suggestions: [],
          },
        },
        allIds: [...initialState.statements.allIds, 'statement3'],
      },
    });
  });

  it('should handle UPDATE_ACTION', () => {
    const action = {
      type: 'UPDATE_ACTION',
      id: 'statement1',
      eventType: 'click',
      eventValue: null,
      queryVariant: 'getBy',
      querySelector: 'Role',
      queryValue: 'button',
      suggestions: [],
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      statements: {
        ...initialState.statements,
        byId: {
          ...initialState.statements.byId,
          statement1: {
            id: 'statement1',
            itId: 'it0',
            describeId: 'describe0',
            type: 'action',
            eventType: 'click',
            eventValue: null,
            queryVariant: 'getBy',
            querySelector: 'Role',
            queryValue: 'button',
            suggestions: [],
          },
        },
      },
    });
  });

  it('should handle DELETE_ACTION', () => {
    const action = {
      type: 'DELETE_ACTION',
      statementId: 'statement1',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      statementId: 3,
      statements: {
        ...initialState.statements,
        byId: {
          statement0: {
            id: 'statement0',
            itId: 'it0',
            describeId: 'describe0',
            type: 'render',
            props: [
              {
                id: 'prop0',
                statementId: 'statement0',
                propKey: '',
                propValue: '',
              },
            ],
          },
          statement2: {
            id: 'statement2',
            itId: 'it0',
            describeId: 'describe0',
            type: 'assertion',
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            isNot: false,
            matcherType: '',
            matcherValue: '',
            suggestions: [],
          },
        },
        allIds: ['statement0', 'statement2'],
      },
    });
  });

  /* -------------------------------- Assertion ------------------------------- */
  it('should handle ADD_ASSERTION', () => {
    const action = {
      type: 'ADD_ASSERTION',
      describeId: 'describe0',
      itId: 'it0',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      statementId: 4,
      statements: {
        ...initialState.statements,
        byId: {
          ...initialState.statements.byId,
          statement3: {
            id: 'statement3',
            itId: 'it0',
            describeId: 'describe0',
            type: 'assertion',
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            isNot: false,
            matcherType: '',
            matcherValue: '',
            suggestions: [],
          },
        },
        allIds: [...initialState.statements.allIds, 'statement3'],
      },
    });
  });

  it('should handle UPDATE_ASSERTION', () => {
    const action = {
      type: 'UPDATE_ASSERTION',
      id: 'statement2',
      queryVariant: 'getBy',
      querySelector: 'Role',
      queryValue: 'button',
      isNot: false,
      matcherType: 'toHaveTextContent',
      matcherValue: 'click me',
      suggestions: [],
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      statements: {
        ...initialState.statements,
        byId: {
          ...initialState.statements.byId,
          statement2: {
            id: 'statement2',
            itId: 'it0',
            describeId: 'describe0',
            type: 'assertion',
            queryVariant: 'getBy',
            querySelector: 'Role',
            queryValue: 'button',
            isNot: false,
            matcherType: 'toHaveTextContent',
            matcherValue: 'click me',
            suggestions: [],
          },
        },
      },
    });
  });

  it('should handle DELETE_ASSERTION', () => {
    const action = {
      type: 'DELETE_ASSERTION',
      statementId: 'statement2',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      statementId: 3,
      statements: {
        ...initialState.statements,
        byId: {
          statement0: {
            id: 'statement0',
            itId: 'it0',
            describeId: 'describe0',
            type: 'render',
            props: [
              {
                id: 'prop0',
                statementId: 'statement0',
                propKey: '',
                propValue: '',
              },
            ],
          },
          statement1: {
            id: 'statement1',
            itId: 'it0',
            describeId: 'describe0',
            type: 'action',
            eventType: '',
            eventValue: null,
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            suggestions: [],
          },
        },
        allIds: ['statement0', 'statement1'],
      },
    });
  });

  /* --------------------------------- Render --------------------------------- */
  it('should handle ADD_RENDER', () => {
    const action = {
      type: 'ADD_RENDER',
      describeId: 'describe0',
      itId: 'it0',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      statementId: 4,
      statements: {
        ...initialState.statements,
        byId: {
          ...initialState.statements.byId,
          statement3: {
            id: 'statement3',
            itId: 'it0',
            describeId: 'describe0',
            type: 'render',
            props: [],
          },
        },
        allIds: [...initialState.statements.allIds, 'statement3'],
      },
    });
  });

  it('should handle UPDATE_RENDER_COMPONENT', () => {
    const action = {
      type: 'UPDATE_RENDER_COMPONENT',
      componentName: 'Button',
      filePath:
        '/Users/charliemaloney/code/codesmith/projects/production-project/spearmint/src/components/Action/Action.jsx',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      statements: {
        ...initialState.statements,
        componentName: 'Button',
        componentPath:
          '/Users/charliemaloney/code/codesmith/projects/production-project/spearmint/src/components/Action/Action.jsx',
      },
    });
  });

  it('should handle DELETE_RENDER', () => {
    const action = {
      type: 'DELETE_RENDER',
      statementId: 'statement0',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      statementId: 3,
      statements: {
        ...initialState.statements,
        byId: {
          statement1: {
            id: 'statement1',
            itId: 'it0',
            describeId: 'describe0',
            type: 'action',
            eventType: '',
            eventValue: null,
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            suggestions: [],
          },
          statement2: {
            id: 'statement2',
            itId: 'it0',
            describeId: 'describe0',
            type: 'assertion',
            queryVariant: '',
            querySelector: '',
            queryValue: '',
            isNot: false,
            matcherType: '',
            matcherValue: '',
            suggestions: [],
          },
        },
        allIds: ['statement1', 'statement2'],
      },
    });
  });

  it('should handle ADD_PROP', () => {
    const action = {
      type: 'ADD_PROP',
      statementId: 'statement0',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      propId: 2,
      statements: {
        ...initialState.statements,
        byId: {
          ...initialState.statements.byId,
          statement0: {
            id: 'statement0',
            itId: 'it0',
            describeId: 'describe0',
            type: 'render',
            props: [
              ...initialState.statements.byId.statement0.props,
              {
                id: 'prop1',
                statementId: 'statement0',
                propKey: '',
                propValue: '',
              },
            ],
          },
        },
      },
    });
  });

  it('should handle UPDATE_PROP', () => {
    const action = {
      type: 'UPDATE_PROP',
      id: 'prop0',
      statementId: 'statement0',
      propKey: 'name',
      propValue: 'bob',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      propId: 1,
      statements: {
        ...initialState.statements,
        byId: {
          ...initialState.statements.byId,
          statement0: {
            id: 'statement0',
            itId: 'it0',
            describeId: 'describe0',
            type: 'render',
            props: [
              {
                id: 'prop0',
                statementId: 'statement0',
                propKey: 'name',
                propValue: 'bob',
              },
            ],
          },
        },
      },
    });
  });

  it('should handle DELETE_PROP', () => {
    const action = {
      type: 'DELETE_PROP',
      id: 'prop0',
      statementId: 'statement0',
    };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      propId: 1,
      statements: {
        ...initialState.statements,
        byId: {
          ...initialState.statements.byId,
          statement0: {
            id: 'statement0',
            itId: 'it0',
            describeId: 'describe0',
            type: 'render',
            props: [],
          },
        },
      },
    });
  });

  it('should handle CREATE_NEW_TEST', () => {
    const action = { type: 'CREATE_NEW_TEST' };
    expect(reactTestCaseReducer(initialState, action)).toEqual({
      ...initialState,
      describeBlocks: {
        byId: {},
        allIds: [],
      },
      itStatements: {
        byId: {},
        allIds: [],
      },
      statements: {
        byId: {},
        allIds: [],
      },
    });
  });
});

import { graphQLTestCaseReducer } from "../context/reducers/graphQLTestCaseReducer";

describe('GraphQL Reducer', () => {
    let initialState = {};

    const newAssertion = {
      id: 0,
      expectedResponse: '',
      value: '',
      matcher: '',
      not: false,
    };

    const newGraphQL = {
      id: 0,
      type: 'graphQL',
      testName: '',
      method: '',
      route: '',
      assertions: [
        {
          ...newAssertion,
        },
      ],
      headers: [],
      post: false,
      postData: '',
    };

    beforeEach(() => {
        initialState = {
          modalOpen: false,
          serverFilePath: '',
          serverFileName: '',
          dbFilePath: '',
          dbFileName: '',
          addDB: false,
          graphQLStatements: [
            { ...newGraphQL, headers: [], assertions: [{ ...newAssertion }] },
          ],
        };
    })

    it('should handle RESET_TESTS', () => {
        expect(graphQLTestCaseReducer(initialState, { type: 'RESET_TESTS' })).toEqual({
            ...initialState
        });
    });

    it('should handle ADD_GRAPHQL', () => {
        expect(graphQLTestCaseReducer(initialState, { type: 'ADD_GRAPHQL' })).toEqual({
            ...initialState,
            graphQLStatements: [
                ...initialState.graphQLStatements,
                {
                    ...newGraphQL,
                    id: 1,
                    headers: [],
                    assertions: [],
                }
            ]
        });
    });

    it('should handle DELETE_GRAPHQL', () => {
        const action = {
            type: 'DELETE_GRAPHQL',
            id: 0
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            graphQLStatements: []
        });
    });

    // Need to fix
    xit('should handle UPDATE_GRAPHQL', () => {
        const action = {
            type: 'UPDATE_GRAPHQL',
            graphQL: newGraphQL,
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            ...initialState, 
            graphQLStatements: [ action.graphQL ]
        });
    });

    it('should handle UPDATE_SERVER_FILEPATH', () => {
        const action = {
            type: 'UPDATE_SERVER_FILEPATH',
            serverFilePath: 'update server file path',
            serverFileName: 'update server file name'
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            serverFilePath: action.serverFilePath,
            serverFileName: action.serverFileName
        });
    });

    // This action is associated with uploading to the database, which has no current functionality
    xit('should handle CREATE_NEW_GRAPHQL_TEST', () => {
       expect(
         graphQLTestCaseReducer(initialState, { type: 'CREATE_NEW_GRAPHQL_TEST' })).toEqual(initialState);
    });

    it('should handle OPEN_INFO_MODAL', () => {
        expect(graphQLTestCaseReducer(initialState, { type: 'OPEN_MODAL_INFO' })).toEqual({
            modalOpen: true,
            ...initialState
        });
    });

    it('should handle CLOSE_INFO_MODAL', () => {
      expect(graphQLTestCaseReducer(initialState, { type: 'CLOSE_MODAL_INFO' })).toEqual({
        modalOpen: false,
        ...initialState,
      });
    });

    it('should handle ADD_HEADER', () => {
        const action = {
            type: 'ADD_HEADER', 
            index: 0
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            graphQLStatements: [ {...newGraphQL, headers: [action.index, 'header name', 'header value'], assertions: [{ ...newAssertion }] }],
            ...initialState,
        });
    });

    it('should handle DELETE_HEADER', () => {
        const action = {
            type: 'DELETE_HEADER', 
            index: 0,
            id: 0
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
          graphQLStatements: [
            { ...newGraphQL, headers: [], assertions: [{ ...newAssertion }] },
          ],
          ...initialState,
        });
    });

    it('should handle TOGGLE_POST', () => {
        const action = {
            type: 'TOGGLE_POST',
            index: 0
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            graphQLStatements: [
                {
                    ...newGraphQL,
                    post: true,
                    postData: '',
                    headers: [],
                    assertions: [{ ...newAssertion }]
                }
            ],
        });
    });

    it('should handle UPDATE_POST', () => {
        const action = {
            type: 'UPDATE_POST',
            text: 'update post',
            index: 0
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            graphQLStatements: [
                {
                    ...newGraphQL,
                    postData: action.text,
                    headers: [],
                    assertions: [{ ...newAssertion }]
                },
            ],
        });
    });

    it('should handle ADD_ASSERTION', () => {
        const action = {
            type: 'ADD_ASSERTION', 
            index: 0
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            graphQLStatements: [
                {
                    ...newGraphQL,
                    headers: [],
                    assertions: [
                        { ...newAssertion },
                        {
                            id: 1,
                            expectedResponse: '',
                            value: '',
                            matcher: '',
                            not: false,
                        }
                    ]
                },
            ],
        });
    });

    it('should handle DELETE_ASSERTION', () => {
        const action = {
            type: 'DELETE_ASSERTION', 
            index: 0,
            id: 0
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            graphQLStatements: [
                {
                    ...newGraphQL,
                    headers: [],
                    assertions: []
                },
            ],
        });
    });

    it('should handle UPDATE_ASSERTION', () => {
        const action = {
            type: 'UPDATE_ASSERTION', 
            index: 0,
            id: 0,
            assertion: newAssertion,
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            graphQLStatements: [
                {
                    ...newGraphQL,
                    headers: [],
                    assertions: [
                        action.assertion
                    ],
                },
            ],
        });
    });

    // Need to fix this test, also need to fix this action in reducer, it is taking in a string or a boolean?
    xit('should handle TOGGLE_DB', () => {
        const action = {
            type: 'TOGGLE_DB',
            db: 'test db'
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            addDb: true,
            ...initialState
        });
    });

    it('should handle UPDATE_DB_FILEPATH', () => {
        const action = {
            type: 'UPDATE_DB_FILEPATH',
            dbFilePath: 'update db file path',
            dbFileName: 'update db file name'
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            dbFilePath: action.dbFilePath,
            dbFileName: action.dbFileName
        });
    });

    it('should handle REPLACE_TEST', () => {
        const action = {
            type: 'REPLACE_TEST',
            testState: initialState
        };
        expect(graphQLTestCaseReducer(initialState, action)).toEqual(action.testState)
    })
})
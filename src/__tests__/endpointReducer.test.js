import { endpointTestCaseReducer } from "../context/reducers/endpointTestCaseReducer";

describe('Endpoint Reducer', () => {
    let initialState = {};

    const newAssertion = {
      id: 0,
      expectedResponse: '',
      value: '',
      matcher: '',
      not: false,
    };

    const newEndpoint = {
      id: 0,
      type: 'endpoint',
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
            endpointStatements: [{ ...newEndpoint, headers: [], assertions: [{ ...newAssertion }] }]
        };
    });

    it('should handle RESET_TESTS', () => {
        expect(endpointTestCaseReducer(initialState, { type: 'RESET_TESTS' })).toEqual(initialState)
    })

    it('should handle ADD_ENDPOINT', () => {
        expect(endpointTestCaseReducer(initialState, { type: 'ADD_ENDPOINT' })).toEqual({
            ...initialState, 
            endpointStatements: [
                ...initialState.endpointStatements,
                {
                    ...newEndpoint,
                    id: 1,
                    headers: [],
                    assertions: [],
                },
            ],
        });
    });

    it('should handle DELETE_ENDPOINT', () => {
        const action = {
            type: 'DELETE_ENDPOINT', 
            id: 0
        };
        expect(endpointTestCaseReducer(initialState, action)).toEqual({
            ...initialState, 
            endpointStatements: []
        });
    });

    // Need to add UPADTE_ENDPOINT

    it('should handle UPDATE_SERVER_FILEPATH', () => {
         const action = {
           type: 'UPDATE_SERVER_FILEPATH',
           serverFilePath: 'update server file path',
           serverFileName: 'update server file name',
         };
         expect(endpointTestCaseReducer(initialState, action)).toEqual({
            ...initialState, 
            serverFilePath: action.serverFilePath,
            serverFileName: action.serverFileName
         });
    });

    // Need to add CREATE_NEW_ENDPOINT_TEST but this is associated with adding to the database which has no current functionality

    it('should handle OPEN_INFO_MODAL', () => {
        expect(endpointTestCaseReducer(initialState, { type: 'OPEN_MODAL_INFO' })).toEqual({
        modalOpen: true,
        ...initialState,
        });
    });

    it('should handle CLOSE_INFO_MODAL', () => {
        expect(endpointTestCaseReducer(initialState, { type: 'CLOSE_MODAL_INFO' })).toEqual({
        modalOpen: false,
        ...initialState,
        });
    });

    it('should handle ADD_HEADER', () => {
        const action = {
            type: 'ADD_HEADER',
            index: 0
        };
        expect(endpointTestCaseReducer(initialState, action)).toEqual({
            endpointStatements: [
                {...newEndpoint, headers: [action.index, 'header name', 'header value'], assertions: [{...newAssertion}] }
            ],
            ...initialState
        });
    });

    it('should handle DELETE_HEADER', () => {
        const action = {
            type: 'DELETE_HEADER',
            index: 0,
            id: 0
        };
        expect(endpointTestCaseReducer(initialState, action)).toEqual({
          endpointStatements: [
            { ...newEndpoint, headers: [], assertions: [{ ...newAssertion }] },
          ],
          ...initialState,
        });
    });

    it('should handle TOGGLE_POST', () => {
      const action = {
        type: 'TOGGLE_POST',
        index: 0,
      };
      expect(endpointTestCaseReducer(initialState, action)).toEqual({
        ...initialState,
        endpointStatements: [
          {
            ...newEndpoint,
            post: true,
            postData: '',
            headers: [],
            assertions: [{ ...newAssertion }],
          },
        ],
      });
    });

    it('should handle UPDATE_POST', () => {
        const action = {
            type: 'UPDATE_POST',
            text: 'update post',
            index: 0,
        };
        expect(endpointTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            endpointStatements: [
            {
                ...newEndpoint,
                postData: action.text,
                headers: [],
                assertions: [{ ...newAssertion }],
            },
            ],
        });
    });

    it('should handle ADD_ASSERTION', () => {
        const action = {
            type: 'ADD_ASSERTION',
            index: 0,
        };
        expect(endpointTestCaseReducer(initialState, action)).toEqual({
            ...initialState,
            endpointStatements: [
            {
                ...newEndpoint,
                headers: [],
                assertions: [
                { ...newAssertion },
                {
                    id: 1,
                    expectedResponse: '',
                    value: '',
                    matcher: '',
                    not: false,
                },
                ],
            },
            ],
        });
    });
    it('should handle DELETE_ASSERTION', () => {
      const action = {
        type: 'DELETE_ASSERTION',
        index: 0,
        id: 0,
      };
      expect(endpointTestCaseReducer(initialState, action)).toEqual({
        ...initialState,
        endpointStatements: [
          {
            ...newEndpoint,
            headers: [],
            assertions: [],
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
      expect(endpointTestCaseReducer(initialState, action)).toEqual({
        ...initialState,
        endpointStatements: [
          {
            ...newEndpoint,
            headers: [],
            assertions: [action.assertion],
          },
        ],
      });
    });

    // Need to fix
    xit('should handle TOGGLE_DB', () => {
      const action = {
        type: 'TOGGLE_DB',
        db: 'test db',
      };
      expect(endpointTestCaseReducer(initialState, action)).toEqual({
        addDb: true,
        ...initialState,
      });
    });

     it('should handle UPDATE_DB_FILEPATH', () => {
       const action = {
         type: 'UPDATE_DB_FILEPATH',
         dbFilePath: 'update db file path',
         dbFileName: 'update db file name',
       };
       expect(endpointTestCaseReducer(initialState, action)).toEqual({
         ...initialState,
         dbFilePath: action.dbFilePath,
         dbFileName: action.dbFileName,
       });
     });

     it('should handle REPLACE_TEST', () => {
       const action = {
         type: 'REPLACE_TEST',
         testState: initialState,
       };
       expect(endpointTestCaseReducer(initialState, action)).toEqual(
         action.testState
       );
     });
})
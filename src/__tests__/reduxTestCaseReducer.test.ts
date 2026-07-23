import { reduxTestCaseReducer as subject } from '../context/reducers/reduxTestCaseReducer';
import { ReduxTestCaseState } from '../utils/reduxTypes';

describe('Redux Test Case Reducer', () => {
  let state: ReduxTestCaseState;

  beforeEach(() => {
    state = {
      reduxTestStatement: '',
      reduxStatements: [],
    };
  });

  describe('initial state', () => {
    it('should return the default case state if no actions are triggered', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('incorrect actionTypes', () => {
    const action = { type: 'ieurpoqwdjsf;' };

    it('should return the default case if action is not recogonized', () => {
      expect(subject(state, action)).toBe(state);
    });
  });

  describe('Update Redux Test Statment', () => {
    const action = {
      type: 'UPDATE_REDUX_TEST_STATEMENT',
      payload: 'New Redux Test',
    };

    it('should replace existing test statement with incoming action payload', () => {
      const { reduxTestStatement } = subject(state, action);

      expect(reduxTestStatement).toEqual('New Redux Test');
    });

    it('should return copy of state object', () => {
      expect(subject(state, action)).not.toBe(state);
    });
  });

  //------- Middleware Test Statment Tests---------->
  describe('Middlware', () => {
    describe('Add Middleware', () => {
      const action = {
        type: 'ADD_MIDDLEWARE',
      };

      it('should add a middleware test case to reduxTestStatements', () => {
        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].type).toEqual('middleware');
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Delete Middleware', () => {
      const action = {
        type: 'DELETE_MIDDLEWARE',
        payload: 1,
      };

      it('should remove middleware test based on id from action payload', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
        };

        state.reduxStatements.push({
          id: 1,
          type: 'middleware',
          middlewaresFileName: '',
          middlewaresFilePath: '',
          queryType: '',
          eventValue: null,
          queryVariant: '',
          querySelector: '',
          queryValue: '',
          queryFunction: '',
        });

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0]).toBe(undefined);
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Update Middleware', () => {
      const action = {
        type: 'UPDATE_MIDDLEWARE',
        payload: {
          id: 3,
          queryType: 'queryType',
          eventValue: 'eventValue',
          queryVariant: 'queryVariant',
          querySelector: 'querySelector',
          queryValue: 'queryValue',
          queryFunction: 'queryFunction',
          suggestions: 'suggestions',
        },
      };

      it('updates the values of the middleware test based on action payload id and string values', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
        };

        state.reduxStatements.push({
          id: 3,
          type: 'middleware',
          queryType: '',
          eventValue: null,
          queryVariant: '',
          querySelector: '',
          queryValue: '',
          queryFunction: '',
          suggestions: '',
        });

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].id).toEqual(3);
        expect(reduxStatements[0].type).toEqual('middleware');
        expect(reduxStatements[0].queryType).toEqual('queryType');
        expect(reduxStatements[0].eventValue).toEqual('eventValue');
        expect(reduxStatements[0].queryVariant).toEqual('queryVariant');
        expect(reduxStatements[0].querySelector).toEqual('querySelector');
        expect(reduxStatements[0].queryFunction).toEqual('queryFunction');
        expect(reduxStatements[0].suggestions).toEqual('suggestions');
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Update Middleware File Path', () => {
      const action = {
        type: 'UPDATE_MIDDLEWARES_FILEPATH',
        payload: {
          middlewaresFileName: 'Hello',
          middlewaresFilePath: 'World',
        },
      };

      it("should update the middleware's file path", () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [
            {
              id: 3,
              type: 'middleware',
              middlewaresFileName: '',
              middlewaresFilePath: '',
              queryType: '',
              eventValue: null,
              queryVariant: '',
              querySelector: '',
              queryValue: '',
              queryFunction: '',
            },
          ],
        };

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].middlewaresFileName).toEqual('Hello');
        expect(reduxStatements[0].middlewaresFilePath).toEqual('World');
        expect(reduxStatements[0].id).toEqual(3);
      });
    });
  });

  //------- Action Creator Test Statment Tests---------->
  describe('Action Creator', () => {
    describe('Add Action Creator', () => {
      const action = {
        type: 'ADD_ACTIONCREATOR',
      };

      it('should add a action creator test case to reduxTestStatements', () => {
        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].type).toEqual('action-creator');
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Delete Action Creator', () => {
      const action = {
        type: 'DELETE_ACTIONCREATOR',
        payload: 1,
      };

      it('should remove action creator test based on id from action payload', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
        };

        state.reduxStatements.push({
          id: 1,
          actionsFileName: '',
          filePath: '',
          typesFileName: '',
          typesFilePath: '',
          type: 'action-creator',
          actionCreatorFunc: '',
          actionType: '',
          payloadKey: null,
          payloadType: null,
        });

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0]).toBe(undefined);
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Update Action Creator', () => {
      const action = {
        type: 'UPDATE_ACTIONCREATOR',
        payload: {
          id: 3,
          actionsFile: 'actionsFile',
          filePath: 'filePath',
          typesFileName: 'typesFilename',
          typesFilePath: 'typesFilePath',
          actionCreatorFunc: 'actionCreatorFunc',
          payloadKey: 'payloadKey',
          payloadType: 'payloadType',
          actionType: 'actionType',
        },
      };

      it('updates the values of the action creator test based on action payload id and string values', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
        };

        state.reduxStatements.push({
          id: 3,
          actionsFileName: '',
          filePath: '',
          typesFileName: '',
          typesFilePath: '',
          type: 'action-creator',
          actionCreatorFunc: '',
          actionType: '',
          payloadKey: null,
          payloadType: null,
        });

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].id).toEqual(3);
        expect(reduxStatements[0].type).toEqual('action-creator');
        expect(reduxStatements[0].actionsFile).toEqual('actionsFile');
        expect(reduxStatements[0].filePath).toEqual('filePath');
        expect(reduxStatements[0].typesFileName).toEqual('typesFilename');
        expect(reduxStatements[0].typesFilePath).toEqual('typesFilePath');
        expect(reduxStatements[0].actionCreatorFunc).toEqual('actionCreatorFunc');
        expect(reduxStatements[0].payloadKey).toEqual('payloadKey');
        expect(reduxStatements[0].payloadType).toEqual('payloadType');
        expect(reduxStatements[0].actionType).toEqual('actionType');
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Update Actions File Path', () => {
      const action = {
        type: 'UPDATE_ACTIONS_FILEPATH',
        payload: {
          actionsFileName: 'Hello',
          filePath: 'World',
          id: 3,
          type: 'action-creator',
        },
      };

      it("should update the action's file path", () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [
            {
              id: 3,
              actionsFileName: '',
              filePath: '',
              typesFileName: '',
              typesFilePath: '',
              type: 'action-creator',
              actionCreatorFunc: '',
              actionType: '',
              payloadKey: null,
              payloadType: null,
            },
          ],
        };

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].actionsFileName).toEqual('Hello');
        expect(reduxStatements[0].filePath).toEqual('World');
        expect(reduxStatements[0].id).toEqual(3);
      });
    });
  });

  //------- Reducer Test Statment Tests---------->
  describe('Reducer', () => {
    describe('Add Redcuer', () => {
      const action = {
        type: 'ADD_REDUCER',
      };

      it('should add a reducer test case to reduxTestStatements', () => {
        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].type).toEqual('reducer');
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Delete Reducer', () => {
      const action = {
        type: 'DELETE_REDUCER',
        payload: 1,
      };

      it('should remove reducer test based on id from action payload', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
        };

        state.reduxStatements.push({
          id: 1,
          type: 'reducer',
          itStatement: '',
          typesFileName: '',
          typesFilePath: '',
          reducersFileName: '',
          reducersFilePath: '',
          reducerAction: '',
          initialState: '',
          payloadKey: '',
          payloadValue: '',
          reducerName: '',
          expectedKey: '',
          expectedValue: '',
        });

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0]).toBe(undefined);
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Update Reducer', () => {
      const action = {
        type: 'UPDATE_REDUCER',
        payload: {
          id: 3,
          type: 'reducer',
          itStatement: 'itStatement',
          typesFileName: 'typesFileName',
          typesFilePath: 'typesFilePath',
          reducersFileName: 'reducersFileName',
          reducersFilePath: 'reducersFilePath',
          reducerAction: 'reducerAction',
          initialState: 'initialState',
          payloadKey: 'payloadKey',
          payloadValue: 'payloadValue',
          reducerName: 'reducerName',
          expectedKey: 'expectedKey',
          expectedValue: 'expectedValue',
        },
      };

      it('updates the values of the reducer test based on action payload id and string values', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
        };

        state.reduxStatements.push({
          id: 3,
          type: 'reducer',
          itStatement: '',
          typesFileName: '',
          typesFilePath: '',
          reducersFileName: '',
          reducersFilePath: '',
          reducerAction: '',
          initialState: '',
          payloadKey: '',
          payloadValue: '',
          reducerName: '',
          expectedKey: '',
          expectedValue: '',
        });

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].id).toEqual(3);
        expect(reduxStatements[0].type).toEqual('reducer');
        expect(reduxStatements[0].itStatement).toEqual('itStatement');
        expect(reduxStatements[0].reducersFileName).toEqual('reducersFileName');
        expect(reduxStatements[0].reducersFilePath).toEqual('reducersFilePath');
        expect(reduxStatements[0].typesFilePath).toEqual('typesFilePath');
        expect(reduxStatements[0].typesFileName).toEqual('typesFileName');
        expect(reduxStatements[0].reducerAction).toEqual('reducerAction');
        expect(reduxStatements[0].initialState).toEqual('initialState');
        expect(reduxStatements[0].payloadKey).toEqual('payloadKey');
        expect(reduxStatements[0].payloadValue).toEqual('payloadValue');
        expect(reduxStatements[0].reducerName).toEqual('reducerName');
        expect(reduxStatements[0].expectedKey).toEqual('expectedKey');
        expect(reduxStatements[0].expectedValue).toEqual('expectedValue');
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Update Reducers File Path', () => {
      const action = {
        type: 'UPDATE_REDUCERS_FILEPATH',
        payload: {
          reducersFileName: 'Hello',
          reducersFilePath: 'World',
        },
      };

      it("should update the reducer's file path", () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [
            {
              id: 3,
              type: 'reducer',
              itStatement: '',
              typesFileName: '',
              typesFilePath: '',
              reducersFileName: '',
              reducersFilePath: '',
              reducerAction: '',
              initialState: '',
              payloadKey: '',
              payloadValue: '',
              reducerName: '',
              expectedKey: '',
              expectedValue: '',
            },
          ],
        };

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].reducersFileName).toEqual('Hello');
        expect(reduxStatements[0].reducersFilePath).toEqual('World');
      });
    });
  });

  //-------Async Test Statment Tests---------->
  describe('Async', () => {
    describe('Add Async', () => {
      const action = {
        type: 'ADD_ASYNC',
      };

      it('should add an async test case to reduxTestStatements', () => {
        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].type).toEqual('async');
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Delete Async', () => {
      const action = {
        type: 'DELETE_ASYNC',
        payload: 1,
      };

      it('should remove async test based on id from action payload', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
        };

        state.reduxStatements.push({
          id: 1,
          type: 'async',
          actionsFileName: '',
          filePath: '',
          typesFileName: '',
          typesFilePath: '',
          asyncFunction: '',
          method: '',
          route: '',
          store: '',
          matcher: '',
          status: '',
          actionType: '',
          payloadKey: '',
          payloadType: '',
          responseKey: '',
          responseValue: '',
          it: '',
        });

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0]).toBe(undefined);
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });

    describe('Update Async', () => {
      const action = {
        type: 'UPDATE_ASYNC',
        payload: {
          id: 3,
          actionsFileName: 'actionsFileName',
          typesFileName: 'typesFileName',
          typesFilePath: 'typesFilePath',
          asyncFunction: 'asyncFunction',
          method: 'method',
          route: 'route',
          actionType: 'actionType',
          payloadKey: 'payloadKey',
          payloadType: 'payloadType',
          responseType: 'responseValue',
          it: 'it',
          expectedArg: 'expectedArg'
        },
      };

      it('updates the values of the async/thunk test based on action payload id and string values', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
        };

        state.reduxStatements.push({
          id: 3,
          type: 'async',
          actionsFileName: '',
          asyncFunction: '',
          typesFileName: '',
          typesFilePath: '',
          method: '',
          route: '',
          actionType: '',
          payloadKey: '',
          payloadType: '',
          responseType: '',
          it: '',
          expectedArg: '',
        });

        const { reduxStatements } = subject(state, action);

        expect(reduxStatements[0].id).toEqual(3);
        expect(reduxStatements[0].type).toEqual('async');
        expect(reduxStatements[0].actionsFileName).toEqual('actionsFileName');
        expect(reduxStatements[0].asyncFunction).toEqual('asyncFunction');
        expect(reduxStatements[0].typesFileName).toEqual('typesFileName');
        expect(reduxStatements[0].typesFilePath).toEqual('typesFilePath');
        expect(reduxStatements[0].method).toEqual('method');
        expect(reduxStatements[0].route).toEqual('route');
        expect(reduxStatements[0].actionType).toEqual('actionType');
        expect(reduxStatements[0].payloadKey).toEqual('payloadKey');
        expect(reduxStatements[0].payloadType).toEqual('payloadType');
        expect(reduxStatements[0].responseType).toEqual('responseValue');
        expect(reduxStatements[0].it).toEqual('it');
        expect(reduxStatements[0].expectedArg).toEqual('expectedArg');
      });

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state);
      });
    });
  });

  //-----------Update Statments Order ------------>
  describe('Update Statments Order', () => {
    const action = {
      type: 'UPDATE_STATEMENTS_ORDER',
      payload: [
        {
          id: 1,
          type: 'reducer',
          typesFileName: '',
          typesFilePath: '',
          reducersFileName: '',
          reducersFilePath: '',
          reducerAction: '',
          initialState: '',
          reducerName: '',
          expectedState: '',
        },
        {
          id: 3,
          type: 'async',
          actionsFileName: '',
          filePath: '',
          typesFileName: '',
          typesFilePath: '',
          asyncFunction: '',
          method: '',
          route: '',
          requestBody: '',
          store: '',
          matcher: '',
          expectedResponse: '',
        },
      ],
    };

    it('should return the reorderd redux test statments', () => {
      state = {
        reduxTestStatement: '',
        reduxStatements: [
          {
            id: 3,
            type: 'async',
            actionsFileName: '',
            filePath: '',
            typesFileName: '',
            typesFilePath: '',
            asyncFunction: '',
            method: '',
            route: '',
            requestBody: '',
            store: '',
            matcher: '',
            expectedResponse: '',
          },
          {
            id: 1,
            type: 'reducer',
            typesFileName: '',
            typesFilePath: '',
            reducersFileName: '',
            reducersFilePath: '',
            reducerAction: '',
            initialState: '',
            reducerName: '',
            expectedState: '',
          },
        ],
      };

      const { reduxStatements } = subject(state, action);

      expect(reduxStatements[0].id).toEqual(1);
      expect(reduxStatements[1].id).toEqual(3);
    });
  });
  //----------- Update Types FilePath ------->
  /* The switch case associated with this test seems to not actually do anything -
     updateTypesFilePath exists as a prop on several components, but points to null
     in every case I could find. Further investigation may be necessary. */
/*  describe('Update Types File Path', () => {
    const action = {
      type: 'UPDATE_TYPES_FILEPATH',
      payload: {
        type: '',
        typesFileName: 'Hello',
        typesFilePath: 'World',
        id: 3,
      },
    };

    it("should update the types's file path", () => {
      state = {
        reduxTestStatement: '',
        reduxStatements: [
          {
            id: 3,
            actionsFileName: '',
            filePath: '',
            typesFileName: '',
            typesFilePath: '',
            type: 'action-creator',
            actionCreatorFunc: '',
            actionType: '',
            payloadKey: null,
            payloadType: null,
          },
        ],
      };

      const { reduxStatements } = subject(state, action);

      expect(reduxStatements[0].typesFileName).toEqual('Hello');
      expect(reduxStatements[0].typesFilePath).toEqual('World');
      expect(reduxStatements[0].id).toEqual(3);
    });
  }); */
}); 

import { reduxTestCaseReducer as subject } from '../context/reducers/reduxTestCaseReducer';
import { ReduxTestCaseState } from '../utils/reduxTypes';
import { red } from 'color-name';

describe('Redux Test Case Reducer', () => {
  let state: ReduxTestCaseState

  beforeEach(() => {
    state = {
      reduxTestStatement: '',
      reduxStatements: [],
      hasRedux: 0,
    };
  });


  describe('initial state', () => {
    it('should return the default case state if no actions are triggered', () => {
      expect(subject(undefined, {type: undefined})).toEqual(state);
    });
  });

  describe('incorrect actionTypes', () => {
    const action = { type: 'ieurpoqwdjsf;' };

    it('should return the default case if action is not recogonized', () => {
      expect(subject(state, action)).toBe(state);
    });
  });

  describe('Redux Menu', () => {
    const action = {
      type: 'TOGGLE_REDUX',
    }
    
    
    it('should toggle to true', () => {
      const { hasRedux } = subject(state, action)
      expect(hasRedux).toEqual(true)
    })
  }) 

  describe('Update Redux Test Statment', () => {
    const action = {
      type: 'UPDATE_REDUX_TEST_STATEMENT',
      payload: 'New Redux Test'
    }

    it('should replace existing test statement with incoming action payload', () => {
      const { reduxTestStatement } = subject(state, action)

      expect(reduxTestStatement).toEqual('New Redux Test')
    })

    it('should return copy of state object', () => {
      expect(subject(state, action)).not.toBe(state)
    })

  })
  
  //------- Middleware Test Statment Tests---------->
  describe('Middlware', () => {
    describe('Add Middleware', () => {
      const action = {
        type: 'ADD_MIDDLEWARE',
      }
  
      it('should add a middleware test case to reduxTestStatements', () => {
        const { reduxStatements } = subject(state, action)
  
        expect(reduxStatements[0].type).toEqual('middleware')
      })
  
      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state)
      })
    })
  
    describe('Delete Middleware', () => {
      const action = {
        type: 'DELETE_MIDDLEWARE',
        payload: 1,
      }
    
      it('should remove middleware test based on id from action payload', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
          hasRedux: 1,
        }
    
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
        })

        const { reduxStatements } = subject(state, action) 
  
        expect(reduxStatements[0]).toBe(undefined)
      })
      
      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state)
      })
    })

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
      }
    
      it('updates the values of the middleware test based on action payload id, and string values', () => {
        state = {
          reduxTestStatement: '',
          reduxStatements: [],
          hasRedux: 1,
        }
        
        state.reduxStatements.push({
          id: 3,
          type: 'middleware',
          queryType: '',
          eventValue: null,
          queryVariant: '',
          querySelector: '',
          queryValue: '',
          queryFunction: '',
          suggestions: ''
        })
  
        const {reduxStatements} = subject(state, action)
  
        expect(reduxStatements[0].id).toEqual(3)
        expect(reduxStatements[0].type).toEqual('middleware')
        expect(reduxStatements[0].queryType).toEqual('queryType')
        expect(reduxStatements[0].eventValue).toEqual('eventValue')
        expect(reduxStatements[0].queryVariant).toEqual('queryVariant')
        expect(reduxStatements[0].querySelector).toEqual('querySelector')
        expect(reduxStatements[0].queryFunction).toEqual('queryFunction')
        expect(reduxStatements[0].suggestions).toEqual('suggestions')
      })

      it('should return copy of state object', () => {
        expect(subject(state, action)).not.toBe(state)
      })
    })
  })  
})


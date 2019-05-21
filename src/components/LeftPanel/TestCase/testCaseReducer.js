export const actionTypes = {
  UPDATE_TEST_TITLE: 'UPDATE_TEST_TITLE',
  TOGGLE_MOCK_DATA: 'TOGGLE_MOCK_DATA',
  // ADD_TEST_STATEMENT: 'ADD_TEST_STATEMENT',  
}

export const updateTestTitle = (title) => ({
  type: actionTypes.UPDATE_TEST_TITLE,
  title: title,
})

export const toggleMockData = () => ({
  type: actionTypes.TOGGLE_MOCK_DATA
})

// export const addTestStatement = (content, testType) => ({
//   type: actionTypes.ADD_TEST_CASE,
//   testType: testType, 
//   content: content, 
// })

export const initialState = {
  testTitle: '',
  testStatements: [],
  mockDataCheckBox: false,
}

export const testCaseReducer = (state, action) => {
  Object.freeze(state);
  let id = 0;

  switch (action.type) {
    case 'UPDATE_TEST_TITLE':
      let testTitle = action.title;
      console.log(state.testTitle);
      return {
        ...state,
        testTitle,
      } 
    case 'TOGGLE_MOCK_DATA':
      console.log(state.mockDataCheckBox);
      return {
        ...state,
        mockDataCheckBox: !state.mockDataCheckBox
      } 
    // case 'ADD_TEST_STATEMENT':
    //   let testStatements = [...state.testStatements];
    //   let newtestStatement = {
    //     id: ++id,
    //     content: action.content,
    //   }
    //   testStatements.push(newtestStatement);
    //   return {
    //     ...state,
    //     testStatements,
    //   }
    default: 
      return state;
  }
}


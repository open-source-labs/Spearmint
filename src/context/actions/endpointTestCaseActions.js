export const actionTypes = {
    UPDATE_ENDPOINT_STATEMENTS_ORDER: 'UPDATE_ENDPOINT_STATEMENTS_ORDER',
    UPDATE_ENDPOINT_TEST_STATEMENT: 'UPDATE_ENDPOINT_TEST_STATEMENT',

    TOGGLE_ENDPOINT: 'TOGGLE_ENDPOINT',

    CREATE_NEW_ENDPOINT_TEST: 'CREATE_NEW_ENDPOINT_TEST',

    UPDATE_SERVER_FILEPATH: 'UPDATE_SERVER_FILEPATH',

    UPDATE_STATEMENTS_ORDER: 'UPDATE_STATEMENTS_ORDER',

    ADD_ENDPOINT: 'ADD_ENDPOINT',
    DELETE_ENDPOINT: 'DELETE_ENDPOINT',
    UPDATE_ENDPOINT: 'UPDATE_ENDPOINT',
    OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
    CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',
};


export const updateEndpointStatementsOrder = draggableStatements => ({
    type: actionTypes.UPDATE_ENDPOINT_STATEMENTS_ORDER,
    draggableStatements,
});

export const updateEndpointTestStatement = endpointTestStatement => ({
    type: actionTypes.UPDATE_ENDPOINT_TEST_STATEMENT,
    endpointTestStatement
})

export const toggleEndpoint = () => ({
    type: actionTypes.TOGGLE_ENDPOINT,
});

export const createNewEndpointTest = () => ({
    type: actionTypes.CREATE_NEW_ENDPOINT_TEST,
});

export const updateServerFilePath = (serverFileName, serverFilePath) => ({
    type: actionTypes.UPDATE_SERVER_FILEPATH,
    serverFileName,
    serverFilePath,
});

export const addEndpoint = () => ({
    type: actionTypes.ADD_ENDPOINT,
});

export const deleteEndpoint = id => ({
    type: actionTypes.DELETE_ENDPOINT,
    id,
});

export const updateEndpoint = ({
    id,
    serverFileName,
    serverFilePath,
    method,
    route,
    expectedResponse,
    value,
}) => ({
    type: actionTypes.UPDATE_ENDPOINT,
    id,
    serverFileName,
    serverFilePath,
    method,
    route,
    expectedResponse,
    value
});

export const updateStatementsOrder = draggableStatements => {
      return {
      type: actionTypes.UPDATE_STATEMENTS_ORDER,
      draggableStatements,
    }};
  
export const openInfoModal = () => {
    return {type: actionTypes.OPEN_INFO_MODAL,}
};

export const closeInfoModal = () => {
    return {type: actionTypes.CLOSE_INFO_MODAL,}
};
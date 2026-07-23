const { getTsBuildInfoEmitOutputFilePath } = require('typescript');

/*
Below is a suggested way of structuring the State found in the reducer.(e.g. 'initialState' found in 'reactTestCaseReducer')


To perform any action related to state, you'll just need 2 abilities
1. way to deep clone read-only state object(simple function)
2. a way to find the correct object in the state of nested objects to update/delete
After that, you can do what you need to based on the 'ACTION_TYPE'passed to the reducer along with the 'payload'obj that has the
necessary information like 'filePath' and the data to be reflected

*/

const nestedObject = {
  //essentially the state object
  // for Example, top level describe
  children: {
    describe1: {
      filePath: 'describe1', //filepath is a string, which in the UI, will be treated like the id for a block
      objectType: 'describe',
      objectInfo: 'comment for Object',
      children: {
        //e.g. describe/setup/teardown/it blocks that are direct children of describe block
        k23on32230h23: {
          //a uuid, or unique value that can be generated and used as id upon the adding of a new UI block
          filePath: 'describe1-k23on32230h23', //delimiter for levels deep represented by either a ',' or a'-'
          objectType: 'setupTeardown',
          objectInfo: 'comment for Object',
          children: {
            // since objectType is a 'setupTeardown', logically it's children will be things like 'beforeAll'
            ha23204802302: {
              filePath: 'describe1-k23on32230h23-ha23204802302', //
              objectType: 'beforeAll', // object type key exists to with future "generateTestFile" functionality
              mockData: {
                key1: 'value1',
                key2: 'value2',
                key3: 'value3',
              },
            },
          },
        },
        a23lki3h23: {
          //a uuid, or unique value that can be generated and used as id upon the adding of a new UI block
          filePath: 'describe1-a23lki3h23', //delimiter for levels deep represented by either a ',' or a'-'
          objectType: 'describe',
          objectInfo: 'comment for Object',
          children: {
            pa3onO22H0h2p: {
              filePath: 'describe1-a23lki3h23-pa3onO22H0h2p', //
              objectType: 'test', // object type key exists to with future "generateTestFile" functionality
              objectInfo: 'Comment Related to Test File',
              children: {}, //include objects for info on created 'Acts', and 'Assertions'***order shown in UI matters.
            },
          },
        },
      },
    },
  },
};

//console.log(nestedObject);

//traverse object and returns what's found at the end of filepath
//input:objectToTraverse(object), filePath(string)
//object wanted from objectToTraverse
// console.log('list of the objects keys', Object.keys(nestedObject));
// console.log('objects describe1CHild', nestedObject['describe1']);

/*
function traverseObject(objectToTraverse, filePath) {
  // for the app, 'state' would be the object to traverse
  const filePathFolders = filePath.split('-'); //The delimiter is removed and the keys that lead to your target object in the state are stored in array indexes, order kept
  let curObject = objectToTraverse;
  console.log('curObj', curObject);
  console.log('');
  console.log('filePathFolders', filePathFolders);
  console.log('');

  filePathFolders.forEach((folderToEnter) => {
    console.log('curObj before entering FOlder', curObject);
    console.log('');
    console.log('folderToENter', folderToEnter);
    console.log('');
    console.log('typeof foldertoenter', typeof folderToEnter);
    console.log('');
    curObject = curObject.children[folderToEnter]; //needs to be curObject.children bc every objects child blocks are found in that children property
    console.log('curAfter Entering FOlder', curObject);
    console.log('');
  });
  return curObject;
}
*/

function traverseObject(objectToTraverse, filePath) {
  const filePathFolders = filePath.split('-'); //The delimiter is removed and the keys that lead to your target object in the state are stored in array indexes, order kept
  let curObject = objectToTraverse; //let's us track how deep we've looked following path
  filePathFolders.forEach((folderToEnter) => {
    curObject = curObject.children[folderToEnter];
  }); //needs to be curObject.children bc every objects child blocks are found in that children property
  return curObject; //return the object we're targeting
}

//essentially what happens for switch statements with ACTION_TYPE names like 'ADD_DESCRIBE
function addToObjectsState(objectToTraverse, filepathToParent, objectType) {
  //these parameters paired arguments are passed via payload
  let parentObject = traverseObject(objectToTraverse, filepathToParent);
  const newUUid = 'mkhi22d4f225'; // won't be hard coded. will be a function like generateUUid();, can be obtained from a package
  if (objectType === 'describe') {
    parentObject.children[newUUid] = createDescribeObj(
      filepathToParent,
      newUUid
    );
  }
  return parentObject; // will have to doublecheck what makes sense, but the related Context is probably sent the parent/new object
}

function createDescribeObj(parentsFilePath, newUUid) {
  return {
    filePath: `${parentsFilePath}-${newUUid}`, //filepath is a string, which in the UI, will be treated like the id for a block
    objectType: 'describe',
    objectInfo: 'THis describe was appended for Object',
    children: {},
  };
}

/*
Also can be written this way, which is what you will see in the reducers for the app.
const createDescribeObj=>(parentsFilePath,newUUid)=>({
        filePath: 'describe1', //filepath is a string, which in the UI, will be treated like the id for a block
      objectType: 'describe',
      objectInfo: 'comment for Object',
      children: {
    }); //1 line of code allows you to do implicit returns with arrow functions. '()' may not be necessary bc object assignment is technically 1 line of code


*/

// console.log(
//   'run traverseObject method \n',
//   traverseObject(nestedObject, 'describe1-k23on32230h23')
// );

// console.log(
//   'nestedObject after adding an object deep inside it \n',
//   addToObjectsState(nestedObject, 'describe1-k23on32230h23', 'describe')
// );

/*
When testNeedsToBeGenerated,objectType will help properly create the syntax of test files.
there might need to be a little sorting done
e.g. so setupTeardowns are scripted right after the describe block in jest is created
e.g. listing of describes and tests are all in children property, and their order matters when written out in script, so just double
check how logic should be written out. e.g. describe(with it's own 'tests', sure), and then maybe an 'test'(which exists as a sibling
    the previously mentioned describe. 'possible due to nesting describes'. but this 'test' has nothing to do with the
    sibling 'describe' aside from existing under the same parent 'describe')

*/

function deepCopyOfObject(objectToCopy) {
  let deepCopy;
  //logic for deep copy for copying contents of Arrays vs Objects
  if (Array.isArray(objectToCopy)) {
    deepCopy = objectToCopy.map((element) => {
      console.log(element);
      if (typeof element === 'object') return deepCopyOfObject(element);
      else return element;
    });
  } else if (typeof objectToCopy === 'object') {
    deepCopy = {};
    Object.keys(objectToCopy).forEach((objToCopysKey) => {
      console.log(objToCopysKey, ' ', objectToCopy[objToCopysKey]);
      if (typeof objectToCopy[objToCopysKey] === 'object')
        deepCopy[objToCopysKey] = deepCopyOfObject(objectToCopy[objToCopysKey]);
      else deepCopy[objToCopysKey] = objectToCopy[objToCopysKey];
    });
  } else return objectToCopy;
  return deepCopy;
}

// const copyOfObject = deepCopyOfObject(nestedObject);

// console.log('copyOfObject\n', copyOfObject);

// console.log(
//   'comparison',
//   nestedObject['children']['describe1'] ===
//     copyOfObject['children']['describe1']
// );

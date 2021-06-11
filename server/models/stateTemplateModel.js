const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accTestState = new Schema({
  userId: String,
  modalOpen: Boolean,
  describeId: Number,
  itId: Number,
  statementId: Number,
  propId: Number,
  describeBlocks: Object,
  itStatements: Object,
  fileName: String,
  filePath: String,
  testType: String,
  puppeteerUrl: String,
});

const endpointTestState = new Schema({
  // we will have to save Assertion and EndpointObj
  userId: String,
  modalOpen: Boolean,
  serverFilePath: String,
  serverFileName: String,
  dbFilePath: '',
  addDB: false,
  endpointStatements: Array,
});

const hooksTestState = new Schema({
  userId: String,
  hooksTestStatement: String,
  hooksStatements: Array,
  statementId: Number,
  hookFileName: String,
  hookFilePath: String,
});

const puppeteerTestState = new Schema({
  userId: String,
  puppeteerStatements: Array,
  // [{ // we may need to make this into puppeteerStatements: Array
  //   id: Number,
  //   type: String,
  //   describe: String,
  //   url: String,
  //   browserOptions: Array,
  //   firstPaintIt: String,
  //   firstPaintTime: null, //null is a primitive, and in puppeteerTestCaseReducer.ts, firstPaintTime is declared as null
  //   FCPIt: String,
  //   FCPtTime: null, //same as firstPaintTime
  //   LCPIt: String,
  //   LCPTime: null // same here
  //   hasBrowserOption: Boolean,
  //   browserOptionId: Number,
  // },],
  statementId: Number,
  modalOpen: Boolean,
});

const reactTestState = new Schema({
  userId: String,
  modalOpen: Boolean,
  describeId: Number,
  itId: Number,
  propId: Number,
  describeBlocks: Object,
  itStatements: Object,
  statements: Object,
});

const reduxTestState = new Schema({
  userId: String,
  reduxTestStatement: String,
  reduxStatements: Array,
});

const accTestModel = mongoose.model('accTest', accTestState);
const endpointTestModel = mongoose.model('endpointTest', endpointTestState);
const hooksTestModel = mongoose.model('hooksTest', hooksTestState);
const puppeteerTestModel = mongoose.model('puppeteerTest', puppeteerTestState);
const reactTestModel = mongoose.model('reactTest', reactTestState);
const reduxTestModel = mongoose.model('reduxTest', reduxTestState);

module.exports = {
  accTestModel,
  endpointTestModel,
};

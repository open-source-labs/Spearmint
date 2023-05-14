import { Schema as SchemaType } from "mongoose";

// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');
// Schema constructor
const Schema = mongoose.Schema;

// Initialize a new schema object for collection 'testState'
const testStateSchema: SchemaType = new Schema({
  // Save ID of user that saves test
  userId: { type: String, required: true },
  // Save name of test as user input
  testName: { type: String, required: true },
  // Save corresponding type of test
  testType: { type: String, required: true },
  // Save test state object
  testState: { type: Object, required: true },
});

// Mongoose does not validate the types of the properties specified in schema
// It will only coerce the properties to equal the types specified above
// Therefore we use a pre-script to throw an error if any prop is the incorrect type,
  // preventing the uploading of documents with incorrect data type
testStateSchema.pre('save', function(next) {
  if (typeof userId !== 'string' ||
      typeof testName !== 'string' ||
      typeof testType !== 'string' ||
      typeof testState !== 'object') {
        return next('type failure');
      }
  else return next();
});

module.exports = mongoose.model('testState', testStateSchema);

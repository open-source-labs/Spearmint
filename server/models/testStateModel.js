// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');
// Schema constructor
const Schema = mongoose.Schema;

// Initialize a new schema object for collection 'testState'
const testStateSchema = new Schema({
  // Save ID of user that saves test
  userId: { type: String, require: true },
  // Save name of test as user input
  testName: { type: String, require: true },
  // Save corresponding type of test
  testType: { type: String, require: true },
  // Save test state object
  testState: { type: Object, require: true },
});

module.exports = mongoose.model('testState', testStateSchema);

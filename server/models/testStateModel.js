const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testStateSchema = new Schema({
  userId: { type: String, require: true },
  testName: { type: String, require: true },
  testType: { type: String, require: true },
  testState: { type: Object, require: true },
});
const TestState = mongoose.model('testState', testStateSchema);

module.exports = TestState;

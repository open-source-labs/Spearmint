const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testStateSchema = new Schema({
  userId: { type: mongoose.ObjectId, require: true },
  testState: { type: Object },
});
const TestState = mongoose.model('testState', testStateSchema);

module.exports = TestState;

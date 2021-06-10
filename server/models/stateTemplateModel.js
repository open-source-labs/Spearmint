const mongoost = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({});

const Template = mongoose.model('template', stateSchema);
module.exports = Template;

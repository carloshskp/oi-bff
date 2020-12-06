const mongoose = require('mongoose');

const UfSchema = new mongoose.Schema({
  name: String,
  cities: [String],
});

module.exports = mongoose.model('uf', UfSchema);

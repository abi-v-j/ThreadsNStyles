const mongoose = require('mongoose');

const maincategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
module.exports = MainCategory = mongoose.model(
  'maincategory',
  maincategorySchema
);

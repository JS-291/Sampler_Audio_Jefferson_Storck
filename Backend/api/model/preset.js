let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PresetSchema = Schema({
  name: String,
  type: String,
  isFactoryPresets: Boolean,
  samples: [
    {
      url: String,
      name: String
    }
  ]
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Preset', PresetSchema);

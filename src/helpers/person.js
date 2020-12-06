const PersonModel = require('../Models/Person');

const hasPerson = async id => {
  try {
    const person = await PersonModel.findOne({_id: id});

    return Boolean(person);
  } catch (error) {
    return false;
  }
};

module.exports = {
  hasPerson,
};

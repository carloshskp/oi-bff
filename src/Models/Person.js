const mongoose = require('mongoose');
const {makeCpf, makeCnpj, makePhone} = require('../helpers/mask');

const PersonSchema = new mongoose.Schema({
  name: String,
  type: String,
  cpf: String,
  cnpj: String,
  birthDate: Date,
  uf: String,
  city: String,
  phone: String,
});

PersonSchema.methods.paginate = async (page, limit) => {
  const total = await mongoose.model('People').countDocuments();
  const pageParsed = parseInt(page);
  const limitParsed = parseInt(limit);
  const pages = Math.ceil(total / limitParsed);
  const skip = pageParsed === 1 ? 0 : (pageParsed - 1) * limitParsed;
  const next = pages === 0 || pageParsed === pages ? null : pageParsed + 1;
  const previous = pages === 0 || pageParsed === 1 ? null : pageParsed - 1;
  const projection = ['name', 'type', 'cpf', 'cnpj', 'phone', 'city'];
  const options = {skip, limit: limitParsed};
  const data = await mongoose.model('People').find(null, projection, options);

  return {
    page: pageParsed,
    limit: limitParsed,
    total,
    pages,
    next,
    previous,
    data: data.map(person => ({...person._doc, phone: makePhone(person.phone), cpf: makeCpf(person.cpf), cnpj: makeCnpj(person.cnpj)})),
  };
};

module.exports = mongoose.model('People', PersonSchema);

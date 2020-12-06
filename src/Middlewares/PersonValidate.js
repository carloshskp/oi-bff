const validator = require('cpf-cnpj-validator');
const {clearCnpj, clearCpf} = require('../helpers/mask');

module.exports = (req, res, next) => {
  if (!req.body || typeof req.body !== 'object') {
    return res
      .status(400)
      .json({error: 'Body must be valid'});
  }

  const {
    name,
    type,
    cpf,
    cnpj,
    birthDate,
    uf,
    city,
    phone,
  } = req.body;

  if (!name || name.length < 5) {
    return res
      .status(400)
      .json({error: 'Insira o nome completo'});
  }

  if (!type || ['PJ', 'PF'].indexOf(type) === -1) {
    return res
      .status(400)
      .json({error: 'Selecione o tipo de pessoa'});
  }

  if (type === 'PJ' && (!cnpj || !validator.cnpj.isValid(clearCnpj(cnpj)))) {
    return res.status(400)
      .json({error: 'Preencha o campo CNPJ corretamente'});
  }

  if (type === 'PF' && (!cpf || !validator.cpf.isValid(clearCpf(cpf)))) {
    return res.status(400)
      .json({error: 'Preencha o campo CPF corretamente'});
  }

  if (!birthDate) {
    return res.status(400)
      .json({error: 'Preencha uma data de nascimento válida'});
  }

  if (!uf) {
    return res.status(400)
      .json({error: 'Selecione um estado'});
  }

  if (!city) {
    return res.status(400)
      .json({error: 'Selecione uma cidade'});
  }

  if (!phone) {
    return res.status(400)
      .json({error: 'Telefone inválido'});
  }

  next();
};
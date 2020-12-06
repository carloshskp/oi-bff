const clearCpf = cpf => {
  const regex = /(\.|-)/gm;

  return cpf.replace(regex, '');
};

const clearCnpj = cnpj => {
  const regex = /(\.|\/|-)/gm;

  return cnpj.replace(regex, '');
};

const clearPhone = phone => {
  const regex = /(\(|\)|\s|-)/gm;

  return phone.replace(regex, '');
};

const makeCpf = cpf => {
  const regex = /(\d{3})(\d{3})(\d{3})(\d{2})/;
  const subst = `$1.$2.$3-$4`;

  return cpf.replace(regex, subst);
};

const makeCnpj = cnpj => {
  const regex = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
  const subst = `$1.$2.$3/$4-$5`;

  return cnpj.replace(regex, subst);
};

const makePhone = phone => {
  const regex = /(\d{2})(\d{4,5})(\d{4})/;
  const subst = `($1) $2-$3`;

  return phone.replace(regex, subst);
};

module.exports = {
  clearCpf,
  clearCnpj,
  clearPhone,
  makeCpf,
  makeCnpj,
  makePhone,
};

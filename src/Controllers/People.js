const PersonModel = require('../Models/Person');
const {hasPerson} = require('../helpers/person');
const {clearCnpj, clearCpf, makeCpf, makePhone, makeCnpj} = require('../helpers/mask');

function People() {
  const index = async (req, res, next) => {
    try {
      const {
        page = 1,
        limit = 10,
      } = req.query;
      const person = new PersonModel();

      const data = await person.paginate(page, limit);

      res.json(data);
    } catch(error) {
      res.status(500)
        .json({error: error.message});
    }
  };

  const search = async (req, res, next) => {
    try {
      const {
        type,
        uf,
        city,
      } = req.query;

      const types = {
        PJ: {
          name: 'cnpj',
          clearFn: clearCnpj,
        },
        PF: {
          name: 'cpf',
          clearFn: clearCpf,
        }
      };

      const personType = types[type];

      const result = await PersonModel.find({
        type,
        uf,
        city,
        [personType.name]: personType.clearFn(req.query[personType.name])
      });

      if (!result.length) {
        return res.status(404)
          .json({error: 'Nenhuma pessoa encontrada'});
      }

      res.json(result.map(person => ({
        ...person._doc,
        cpf: makeCpf(person.cpf),
        cnpj: makeCnpj(person.cnpj),
        phone: makePhone(person.phone)
      })));
    } catch (error) {
      res.status(500)
        .json({error: error.message});
    }
  }

  const create = async (req, res, next) => {
    try {
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

      const person = new PersonModel({
        name,
        type,
        cpf: clearCpf(cpf),
        cnpj: clearCnpj(cnpj),
        birthDate,
        uf,
        city,
        phone
      });
      const result = await person.save();

      if (!result || result.phone !== phone) {
        return res.status(500)
          .json({error: 'Erro ao salvar pessoa, tente novamente mais tarde'});
      }

      res.status(201)
        .send();
    } catch (error) {
      res.status(500)
        .json({error: error.message});
    }
  };

  const update = async (req, res, next) => {
    try {
      const {
        name,
        type,
        cpf,
        cnpj,
        uf = '',
        city,
        phone,
      } = req.body;

      const person = {name, type, cpf, cnpj, uf, city, phone};

      const success = await PersonModel.updateOne({_id: req.params.id}, person);

      if (!success) {
        return res.status(500)
          .send();
      }

      res.json({
        message: 'Pessoa alterada com sucesso.'
      });
    } catch (error) {
      res.status(500)
        .json({error: error.message});
    }
  };

  const remove = async (req, res, next) => {
    try {
      const {id} = req.params;
      if (!await hasPerson(id)) {
        return res
          .status(404)
          .json({error: 'Pessoa não encontrada'});
      }

      const success = await PersonModel.deleteOne({_id: id});

      res.status(success ? 200 : 500)
        .json(success ? {message: 'Pessoa removida com sucesso!'} : {error: 'Erro ao remover pessoa'});
    } catch (error) {
      res.status(500)
        .json({error: error.message});
    }
  };

  const person = async (req, res, next) => {
    try {
      const {id} = req.params;

      const person = await PersonModel.findOne({_id: id});

      if (!person) {
        return res
          .status(404)
          .json({error: 'Pessoa não encontrada!'})
      }

      res.json(person);
    } catch (error) {
      res.status(500)
        .json({error: error.message});
    }
  };

  return {
    index,
    search,
    create,
    update,
    remove,
    person,
  }
};

module.exports = People();

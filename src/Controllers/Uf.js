const UfModel = require('../Models/Uf');

const Uf = function Uf() {
  const index = async (req, res, next) => {
    try {
      const data = await UfModel.find()
      const ufList = data.map(uf => uf.name);

      res.json(ufList);
    } catch (error) {
      res.status(500)
        .json({error: error.message});
    }
  };

  const cities = async (req, res, next) => {
    try {
      const uf = await UfModel.findOne({name: req.params.uf.toUpperCase()});

      res.json(uf.cities);
    } catch (error) {
      res.status(500)
        .json({error: error.message});
    }
  };

  return {
    index,
    cities,
  };
};

module.exports = Uf();

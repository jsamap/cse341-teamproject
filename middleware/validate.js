const validator = require('../helpers/validate');

const saveProduct = (req, res, next) => {
  const validationRule = {
    name: 'required|string|max:255',
    description: 'required|string|max:1000',
    image: 'required|string',
    price: 'required|numeric|min:0',
    stock: 'required|numeric|min:0',
    rating: 'numeric|min:0|max:5',
    reviews: 'required|numeric|min:0', 
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveRole = (req, res, next) => {
  const validationRule = {
    name: 'required|string|max:255',
    permissions: {
      '*': 'required|string|max:100'
    }
  };
      
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveProduct,
  saveRole,
};

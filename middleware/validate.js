const validator = require('../helpers/validate');

const saveProduct = (req, res, next) => {
  const validationRule = {
    name: 'required|string|max:255',
    description: 'required|string|max:1000',
    price: 'required|numeric|min:0',
    image: 'required|string|url',
    rating: 'numeric|min:0|max:5',
    reviews: 'required|numeric|min:0', 
    created: 'required|date'
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
  saveProduct
};

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

const saveUser = (req, res, next) => {
  const validationRule = {
    fname: 'required|string|min:2|max:50',
    lname: 'required|string|min:2|max:50',
    email: 'required|string|email|max:100',
    password: 'required|string|min:8|regex:^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&]).+$',
    role_id: 'required|string|regex:^[a-fA-F0-9]{24}$',
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

const saveReview = (req, res, next) => {
  const validationRule = {
    product_id: 'required|string|regex:^[a-fA-F0-9]{24}$',
    user_id: 'required|string|regex:^[a-fA-F0-9]{24}$',
    rating: 'required|numeric|min:0|max:5',
    comment: 'required|string|max:1000',
    created: 'required|date',
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
  saveUser,
  saveReview,
};

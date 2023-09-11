const Product = require('../models/product.js');
const mongodb = require('mongodb');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title, //title(left): title(right) --> title(left) refers to the keys you defined in model or Schema file
    imgUrl: imgUrl, // --> title(right) refers to the title that we get here i.e., from 'req.body.title'
    price: price,
    description: description,
    userId : req.user._id
  });
  product.save()
    .then(result => {
      //console.log(result);
      console.log("Product Added");
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedimgUrl = req.body.imgUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      product.title       = updatedTitle;
      product.imgUrl      = updatedimgUrl;
      product.price       = updatedPrice;
      product.description = updatedDesc;
      
      return product.save()
    })
    .then(result => {
      console.log("UPDATED Product: " + updatedTitle);
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err));

};

exports.getProducts = (req, res, next) => {
  Product.find()
  // .select('title price -_id')      //it helps us to show only selected items and after '-' whatever is written, it is excluded or neglected 
  // .populate('userId')             // helps to populate a field e.g., 'userId' here, with all info it has in its collection with
    .then(products => {
      console.log(products)
      res.render('admin/admin-products', {
        product: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err))


};
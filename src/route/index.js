const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

class Product {
  constructor(name, price, description) {
      this.id = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit random ID
      this.createDate = new Date().toISOString();
      this.name = name;
      this.price = price;
      this.description = description;
  }

  static #list = []; // Private field to hold list of products

  static getList() {
      return this.#list;
  }

  static add(product) {
      this.#list.push(product);
  }

  static getByID(id) {
      return this.#list.find(product => product.id === id);
  }

  static updateByID(id, data) {
      const product = this.getByID(id);
      if (product) {
          if (data.name) product.name = data.name;
          if (data.price) product.price = data.price;
          if (data.description) product.description = data.description;
          return true;
      }
      return false;
  }

  static deleteByID(id) {
      const index = this.#list.findIndex(product => product.id === id);
      if (index !== -1) {
          this.#list.splice(index, 1);
          return true;
      }
      return false;
  }
}

let productList = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET endpoint for /product-create
app.get('/product-create', (req, res) => {
    res.send('container/product-create');
});

// POST endpoint for /product-create
app.post('/product-create', (req, res) => {
    const { name, price, description } = req.body;
    const product = new Product(name, price, description);
    productList.push(product);
    Product.add(product);
    res.send('container/alert'); // Return success or error message
});

// GET endpoint for /product-list
app.get('/product-list', (req, res) => {
    const productList = Product.getList();
    res.send('container/product-list', { productList });
});

// GET endpoint for /product-edit
app.get('/product-edit', (req, res) => {
    const { id } = req.query;
    const product = productList.find(product => product.id === parseInt(id));
    if (product) {
        res.send('container/product-edit', { product });
    } else {
        res.send('container/alert', { message: 'Product not found' });
    }
});

// POST endpoint for /product-edit
app.post('/product-edit', (req, res) => {
    const { id, name, price, description } = req.body;
    const success = Product.updateByID(parseInt(id), { name, price, description });
    if (success) {
      res.send('container/alert', { message: 'Product updated successfully' });
  } else {
      res.send('container/alert', { message: 'Product not found' });
  }
    const productIndex = productList.findIndex(product => product.id === parseInt(id));
    if (productIndex !== -1) {
      productList[productIndex].name = name;
      productList[productIndex].price = price;
      productList[productIndex].description = description;
      res.send('container/alert', { message: 'Product updated successfully' });
  } else {
      res.send('container/alert', { message: 'Product not found' });
  }
});

// GET endpoint for /product-delete
app.get('/product-delete', (req, res) => {
    const { id } = req.query;
    const success = Product.deleteByID(parseInt(id));
    if (success) {
        res.send('container/alert', { message: 'Product deleted successfully' });
    } else {
        res.send('container/alert', { message: 'Product not found' });
    }
});
// GET endpoint for /product-delete
app.get('/product-delete', (req, res) => {
  const { id } = req.query;
  const productIndex = productList.findIndex(product => product.id === parseInt(id));
  if (productIndex !== -1) {
      productList.splice(productIndex, 1);
      res.send('container/alert', { message: 'Product deleted successfully' });
  } else {
      res.send('container/alert', { message: 'Product not found' });
  }
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
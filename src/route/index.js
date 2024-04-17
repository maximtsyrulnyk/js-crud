// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  getList() {
    return this.#list;
}
  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.random();
  }
  verifyDescription = (description) => this.description === description
  static add = (product) => {
    this.#list.push(product)
  }
  static getList = () => {
    return this.#list
  }

  static getById = (id) => this.#list.findIndex(product => product.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex((product) => product.id === id);
    if(index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, {data}) => {
    const product = this.getById(id);
    const { name, price, description }  = data;
    if (product) {
      if (name) {
        product.name = name
      }

      if(price){
        product.price = price
      }

      if(description){
        product.description = description
      }

      return true
    } else {
      return false
    }
  }
  static update = (product, {email}) => {
    if(email) {
      product.email = email
    }
  }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = Product.getList();

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const {name, price, description} = req.body
  const product = new Product(name, price, description);
  Product.add(product)
  console.log(Product.getList());
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('success-info', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'success-info',
    info: res ? 'Товар оновлений' : 'Сталася помилка'
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/product-list', (req, res) => {
  const list = Product.getList();
  console.log(list);
  res.render('product-list', { style: 'product-list',
  data: {
    products: {
      list,
      isEmpty: list.length === 0,
    },
  },
})
// сюди вводимо JSON дані
});
// ================================================================
router.get('/product-create', function(req, res) {
    console.log(req.body);
    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('product-create', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-create',
    })
      // ↑↑ сюди вводимо JSON дані
});
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-delete', function (req, res) {
  // res.render генерує нам HTML сторінку
  const {id} = req.query
  Product.deleteById(Number (id));

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('success-info', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'success-info',
    info: 'Товар видалений', 
  })
  // ↑↑ сюди вводимо JSON дані
})

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-update', function (req, res) {
  // res.render генерує нам HTML сторінку
  const {email, password, id} = req.body
  let  result = false

  const product = Product.getById(Number(id))
  if(product.verifyDescription(description)) {
    Product.update(product, {email})
    result = true
  }
  Product.deleteById(Number (id));
  console.log(email, password, id);
  // let result = false;

  // if()
  // ↙️ cюди вводимо назву файлу з сontainer
   
  res.render('success-info', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'success-info',
    info: 'Емайл пошта оновлена', 
  })
  // ↑↑ сюди вводимо JSON дані
})
router.get('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку

  const { id } = req.query

  const product = Product.getById(Number(id))

  // console.log(product)

  if (product) {
    // ↙️ cюди вводимо назву файлу з сontainer
    return res.render('product-edit', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-edit',

      data: {
        name: product.name,
        price: product.price,
        id: product.id,
        description: product.description,
      },
    })
  } else {
    return res.render('product-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-alert',
      info: 'Продукту за таким ID не знайдено',
    })
  }
})
// ↑↑ сюди вводимо JSON дані

// ================================================================

router.post('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id, name, price, description } = req.body

  const product = Product.updateById(Number(id), {
    name,
    price,
    description,
  })

  console.log(id)
  console.log(product)

  if (product) {
    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('product-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-alert',
      info: 'Інформація про товар оновлена',
    })
  } else {
    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('product-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-alert',
      info: 'Сталася помилка',
    })
  }
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-delete', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id } = req.query

  Product.deleteById(Number(id))

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-alert',
    info: 'Товар видалений',
  })
  // ↑↑ сюди вводимо JSON дані
})
// Підключаємо роутер до бек-енду
module.exports = router
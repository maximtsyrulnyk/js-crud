// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(img, title, description, category, price, amount=0) {
    this.id = ++Product.#count // Генеруємо унікальний id для товару
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount;
  }

  static add = (...data) => {
    const newProduct = new Product(...data)
    this.#list.push(newProduct)
  }
  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    // Фільтруємо товари, щоб вилучити той, з яким порівнюємо id
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )

    // Відсортуємо за допомогою  Math.random() та перемішаємо масив
    const shuffeledList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    // Повертаємо перші 3 елементи з перемішаного масиву
    return shuffeledList.slice(0, 3)
  }
}

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ/nVidia GeForce RTX 3050, 8 ГБ / без ОД`,
  [{id: 1, text:'Готовий до відправки'}],
  27000,
  10
)
Product.add(
  'https://picsum.photos/200/300',
  `2 Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ/nVidia GeForce RTX 3050, 8 ГБ / без ОД`,
  [{id: 1, text:'Готовий до відправки'}],
  20000,
  10,
)
Product.add(
  'https://picsum.photos/200/300',
  `3 Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ/nVidia GeForce RTX 3050, 8 ГБ / без ОД`,
  [{id: 1, text:'Готовий до відправки'}],
  40000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `4 Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ/nVidia GeForce RTX 3050, 8 ГБ / без ОД`,
  [{id: 1, text:'Готовий до відправки'}],
  40000,
)

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      list: Product.getList(), 
    },
  })
  // ↑↑ сюди вводимо JSON дані
})


router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id), 
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/purchase-create', function(req, res) {
  const id = Number(res.query.id)
  const amount = Number(req.body.amount)

  if(amount < 1) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link:`/purchase-product?id=${id}`,
      },
    })
  }

  const product = Product.getById(id);

  if(product.amount < 1) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такої кількості товару нема в наявності',
        link:`/purchase-product?id=${id}`,
      },
    })
  }

  console.log(product, amount);

  const productPrice = product.price * amount;


    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('purchase-product', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'purchase-product',

      data: {
        list: Product.getRandomList(id),
        product: Product.getById(id),
      },
    })
    // ↑↑ сюди вводимо JSON дані
})
router.post('/purchase--submit', function(req, res) {
  console.log(req.query);
  console.log(req.body);
  res.render('alert', {
    style: 'alert',
    data: {
      message: 'Успішно', 
      info: 'Замовлення створено',
      link: '/purchase-list',
    },
  })
}) 


// Підключаємо роутер до бек-енду
module.exports = router

// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class User {
  static #list = []

  static #count = 0

  constructor(img, title, description, category, price) {
    this.id = ++Product.#count // Генеруємо унікальний id для товару
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
  }

  static add = (
      img, 
      title,
      description,
      category,
      price,
  ) => {
    const newProduct = new Product(
      img,
      title,
      description,
      category, 
      price,
    )
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

// ================================================================
router.post('/user-create', function(req, res) {
  const {email, login, password} = req.body

  const user = new User(email, login, password)

  User.add(user)

  console.log(User.getList())

  res.render('user-success-info', {
    style: 'user-success-info',
    info: 'Користувач створений', 
  })
})

// ================================================================

router.get('/user-delete', function (req, res) {
  const {id} = req.query

  User.deleteById(Number(id))

  res.render('user-success-info', {
    style: 'user-success-info',
    info: 'Користувач видалений', 
  })
})


router.post('/user-update', function (req, res) {
  const {email, password, id} = req.body

  let result = false

  const user = User.getById(Number(id))

  if(user.verifyPassword(password)) {
    User.update(user, {email})
    result = true
  }

  res.render('user-success-info', {
    style: 'user-success-info',
    info: result
      ? 'Емайл пошта оновлена'
      : 'Сталася помилка', 
  })
})

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    data: {
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Purchase {

}

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      img: 'https://picsum.photos/200/300',
      title: `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
      description: `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ`,
      category: [
        {id: 1, text: 'Готовий до відправки'}, 
        {id: 2, text: 'Топ продажів'}, 
      ],
      price: 27000, 
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/purchase-index', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      img: 'https://picsum.photos/200/300',
      title: `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
      description: `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ`,
      category: [
        {id: 1, text: 'Готовий до відправки'}, 
        {id: 2, text: 'Топ продажів'}, 
      ],
      price: 27000, 
    },
  })
  // ↑↑ сюди вводимо JSON дані
})


router.get('/purchase-product', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      img: 'https://picsum.photos/200/300',
      title: `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
      description: `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ`,
      category: [
        {id: 1, text: 'Готовий до відправки'}, 
        {id: 2, text: 'Топ продажів'}, 
      ],
      price: 27000, 
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// Підключаємо роутер до бек-енду
module.exports = router

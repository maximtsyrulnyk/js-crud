// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-choose', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spatify-choose',

    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const isMix = !!req.query.isMix

  console.log(isMix);

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spatify-create',

    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// Підключаємо роутер до бек-енду
module.exports = router

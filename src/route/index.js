// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Track {
  // Статичне приватне поле для зберігання списку об'єктів Track 
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 9000) // Генеруємо випадкове id
    this.name = name
    this.author = author
    this.image = image
  }

  // Статичний метод для створення об'єкту Track і додавання його до списку #list
  static create(name, author, image) {
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }

  // Статичний метод для отримання всього списку треків
  static getList() {
    return this.#list.reverse()
  }
}

Track.create(
  'Інь Ян',
  'MONATIK і ROXOLANA',
  'https://picsum.photos/100/100',
)
Track.create(
  'Baila Conmigo (Remix)',
  'Selena Gomez і Rauw Alejandro',
  'https://picsum.photos/100/100',
)
Track.create(
  'Shameless',
  'Camila Cabello',
  'https://picsum.photos/100/100',
)
Track.create(
  'DÁKITI',
  'BAD BUNNY і JHAY',
  'https://picsum.photos/100/100',
)
Track.create(
  '11 PM',
  'Maluma',
  'https://picsum.photos/100/100',
)
Track.create(
  'Інша любов',
  'Enleo',
  'https://picsum.photos/100/100',
)

console.log(Track.getList());

class Playlist {
  // Статичне приватне поле для зберігання списку об'єктів Playlist
  static #list = []

  constructor(name) {
    this.id = Math.floor(1000 + Math.random() * 9000) // Генеруємо випадкове id
    this.name = name
    this.tracks = []
  }

  // Статичний метод для створення об'єкту Playlist і додавання його до списку #list
  static create(name) {
    const newPlaylist = new Playlist(name)
    this.#list.push(newPlaylist)
    return newPlaylist
  }

  // Статичний метод для отримання всього списку плейлістів
  static getList() {
    return this.#list.reverse()
  }

  static makeMix(playlist) {
    const allTracks = Track.getList()

    let randomTracks = allTracks
    .sort(() =>0.5 - Math.random())
    .slice(0,3)
    playlist.tracks.push(...randomTracks)
  }
}

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

  console.log(isMix)

  const name = req.body.name

  if(!name) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
  
      data: {
        message: 'Помилка',
        info: 'Введіть назву плейліста',
        link: isMix ? `/spotify-create?isMix=true` : '/spotify-create', 
      },
    })
  }

  const playlist = Playlist.create(name);

  if(isMix) {
    Playlist.makeMix(playlist)
  }

  console.log(playlist)

  res.render('spotify-create', {
    style: 'spotify-create',

    data: {},
  })

  // .....

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spatify-create',

    data: { },
  })
  // ↑↑ сюди вводимо JSON дані
})


router.post('/spotify-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const isMix = !!req.query.isMix

  const name = req.body.name

  if(!name) {
    res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'spatify-create',
  
      data: {
        message: 'Помилка',
        info: 'Введіть назву'
       },
    })
  }

  console.log(req.body, req.query);

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spatify-create',

    data: { },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
// Підключаємо роутер до бек-енду
module.exports = router

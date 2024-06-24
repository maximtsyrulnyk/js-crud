document.querySelector('.form__button').onclick = () => {
  const form = document.getElementById('form')

  const email = document.getElementById('email')

  console.log(email.checkValidity())

  if (!email.checkValidity()) {
    if (email.value.length === 0) {
      email.setCustomValidity('Помилка. Введіть значення!')
    }

    if (email.value.length > 10) {
      email.setCustomValidity(
        'Помилка. Введіть до 19 символів!',
      )
    }

    email.reportValidity()
  }
}

document
  .querySelectorAll('.form__button-add')
  .forEach((element) => {
    element.onclick = () => {
      if (element.getAttribute('operator') === '+') {
        return age.stepUp(
          Number(element.getAttribute('value')),
        )
      }
      if (element.getAttribute('operator') === '-') {
        return age.stepDown(
          Number(element.getAttribute('value')),
        )
      }
    }
  })

document.querySelector('.form__button-save').onclick =
  () => {
    const value = document.getElementById('username').value

    if (value.length === 0) alert('Даних немає')

    navigator.clipboard
      .writeText(value)
      .then(() => alert('Дані зберегли'))
  }

const form = document.querySelector('.form')
const inputs = form.querySelectorAll('.form-field > input')

inputs.forEach((input) => {
  const errorSpan = document.querySelector(`#${input.id} + span`)

  input.addEventListener('blur', () => {
    input.classList.toggle('input-invalid', !input.validity.valid)
    errorSpan.textContent = input.validity.valid
      ? ''
      : `* ${input.validationMessage}`
  })

  input.addEventListener('invalid', () => {
    input.classList.add('input-invalid')
    errorSpan.textContent = `* ${input.validationMessage}`
  })
})

form.addEventListener('submit', (event) => {
  event.preventDefault()

  if (form.checkValidity()) {
    form.submit()
  }
})

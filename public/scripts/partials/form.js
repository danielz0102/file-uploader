export function setUpForm(form, customValidator = null) {
  const inputs = form.querySelectorAll('.form-field > input')
  let timeout

  inputs.forEach((input) => {
    const errorSpan = document.querySelector(`#${input.id} + span`)

    input.addEventListener('input', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        input.classList.toggle('input-invalid', !input.validity.valid)
        errorSpan.textContent = input.validity.valid
          ? ''
          : `* ${input.validationMessage}`
      }, 500)
    })

    input.addEventListener('invalid', () => {
      input.classList.add('input-invalid')
      errorSpan.textContent = `* ${input.validationMessage}`
    })
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (customValidator) {
      customValidator()
    }

    if (form.checkValidity()) {
      form.submit()
    }
  })
}

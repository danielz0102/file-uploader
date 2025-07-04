export function setUpForm(formSelector, customValidator = null) {
  const form = document.querySelector(formSelector)
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
      setLoadingState(form)
      form.submit()
    }
  })
}

export function setLoadingState(form) {
  const button = form.querySelector('.button')
  const loader = document.createElement('span')
  loader.classList.add('spinner')
  button.disabled = true
  button.replaceChildren(loader)
}

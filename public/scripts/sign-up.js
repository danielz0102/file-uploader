import { setUpForm } from './partials/form.js'

const form = document.querySelector('#sign-up-form')

setUpForm(form, validatePasswords)

const passwordInput = document.querySelector('#password')
const confirmPasswordInput = document.querySelector('#confirm-password')

confirmPasswordInput.addEventListener('input', validatePasswords)

function validatePasswords() {
  const passwordsMatch = passwordInput.value === confirmPasswordInput.value
  confirmPasswordInput.setCustomValidity(
    !passwordsMatch ? 'Passwords do not match' : '',
  )
}

import './form.js'

const passwordInput = document.querySelector('#password')
const confirmPasswordInput = document.querySelector('#confirm-password')

confirmPasswordInput.addEventListener('input', () => {
  confirmPasswordInput.setCustomValidity(
    passwordInput.value !== confirmPasswordInput.value
      ? 'Passwords do not match'
      : '',
  )
})

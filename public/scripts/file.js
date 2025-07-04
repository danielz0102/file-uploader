import { setUpDialog } from './lib/setUpDialog.js'

setUpDialog('#deleteDialog', '#deleteDialogButton')

const deleteForm = document.querySelector('#deleteFileForm')

deleteForm.addEventListener('submit', () => {
  const button = document.querySelector('.button[form="deleteFileForm"]')
  const loader = document.createElement('span')

  loader.classList.add('spinner')
  button.disabled = true
  button.replaceChildren(loader)
})

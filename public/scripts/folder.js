import { setUpDialog } from './lib/setUpDialog.js'
import { setUpForm } from './lib/setUpForm.js'
import './partials/fileBtn.js'

setUpDialog('#newFolderDialog', '#newFolderDialogButton')
setUpDialog('#uploadDialog', '#uploadDialogButton')
setUpDialog('#deleteDialog', '#deleteDialogButton')

setUpForm('#new-folder-form')
setUpForm('#upload-form')

const deleteForm = document.querySelector('#deleteFolderForm')
deleteForm.addEventListener('submit', () => {
  const button = document.querySelector('.button[form="deleteFolderForm"]')
  const loader = document.createElement('span')

  loader.classList.add('spinner')
  button.disabled = true
  button.replaceChildren(loader)
})

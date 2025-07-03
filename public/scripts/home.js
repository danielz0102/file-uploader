import { setUpForm } from './partials/form.js'

const newFolderDialogButton = document.querySelector('#newFolderDialogButton')
const newFolderDialog = document.querySelector('#newFolderDialog')
const closeNewFolderDialogButton = document.querySelector(
  '#closeNewFolderDialogButton',
)
const newFolderForm = document.querySelector('#new-folder-form')

setUpForm(newFolderForm)

newFolderDialogButton.addEventListener('click', () => {
  newFolderDialog.showModal()
})

closeNewFolderDialogButton.addEventListener('click', () => {
  newFolderDialog.close()
})

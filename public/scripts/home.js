import { setUpForm } from './partials/form.js'
import { setUpDialog } from './lib/dialog.js'

setUp()

const fileBtn = document.querySelector('.file-button')
const fileInput = document.querySelector('#file')

fileBtn.addEventListener('click', () => {
  fileInput.click()
})
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0]
  fileBtn.textContent = file ? file.name : 'Select a file'
})

function setUp() {
  const newFolderDialogButton = document.querySelector('#newFolderDialogButton')
  const newFolderDialog = document.querySelector('#newFolderDialog')
  setUpDialog(newFolderDialog, newFolderDialogButton)

  const uploadDialog = document.querySelector('#uploadDialog')
  const uploadDialogButton = document.querySelector('#uploadDialogButton')
  setUpDialog(uploadDialog, uploadDialogButton)

  const newFolderForm = document.querySelector('#new-folder-form')
  setUpForm(newFolderForm)

  const uploadForm = document.querySelector('#upload-form')
  setUpForm(uploadForm)
}

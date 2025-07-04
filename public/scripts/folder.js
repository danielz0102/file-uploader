import { setUpDialog } from './lib/dialog.js'
import { setUpForm } from './partials/form.js'

setUp()

const fileBtn = document.querySelector('.file-button')
const fileSpan = fileBtn.querySelector('span')
const fileInput = document.querySelector('#file')
const DEFAULT_FILE_NAME = 'Select a file'

fileBtn.addEventListener('click', () => {
  fileInput.click()
})
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0]
  fileSpan.textContent = file ? file.name : DEFAULT_FILE_NAME

  if (file.size > 50 * 1024 * 1024) {
    fileInput.value = ''
    fileSpan.textContent = DEFAULT_FILE_NAME
    fileInput.setCustomValidity('The file cannot be larger than 50MB.')
  } else {
    fileInput.setCustomValidity('')
  }
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

  const deleteDialog = document.querySelector('#deleteDialog')
  const deleteDialogButton = document.querySelector('#deleteDialogButton')
  setUpDialog(deleteDialog, deleteDialogButton)
}

import './partials/form.js'

const newFolderDialogButton = document.querySelector('#newFolderDialogButton')
const newFolderDialog = document.querySelector('#newFolderDialog')
const closeNewFolderDialogButton = document.querySelector(
  '#closeNewFolderDialogButton',
)

newFolderDialogButton.addEventListener('click', () => {
  newFolderDialog.showModal()
})

closeNewFolderDialogButton.addEventListener('click', () => {
  newFolderDialog.close()
})

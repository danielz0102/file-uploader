export function setUpDialog(dialogSelector, openButtonSelector) {
  const dialog = document.querySelector(dialogSelector)
  const openButton = document.querySelector(openButtonSelector)
  const closeButton = dialog.querySelector('.close-btn')

  openButton.addEventListener('click', () => {
    dialog.showModal()
  })

  closeButton.addEventListener('click', () => {
    dialog.close()
  })
}

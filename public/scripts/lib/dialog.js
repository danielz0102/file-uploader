export function setUpDialog(dialog, openButton) {
  const closeButton = dialog.querySelector('.close-btn')

  openButton.addEventListener('click', () => {
    dialog.showModal()
  })

  closeButton.addEventListener('click', () => {
    dialog.close()
  })
}

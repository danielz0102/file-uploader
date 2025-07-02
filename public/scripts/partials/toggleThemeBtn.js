const toggleThemeBtn = document.querySelector('#toggleThemeBtn')
const root = document.querySelector(':root')
const lightIcon = document.querySelector('#sunIcon')
const darkIcon = document.querySelector('#moonIcon')

toggleThemeBtn.addEventListener('click', () => {
  root.classList.toggle('dark')
  localStorage.setItem(
    'theme',
    root.classList.contains('dark') ? 'dark' : 'light',
  )
  setToggleThemeBtn()
})

setToggleThemeBtn()

function setToggleThemeBtn() {
  const isDarkMode = root.classList.contains('dark')

  lightIcon.style.display = isDarkMode ? 'none' : 'block'
  darkIcon.style.display = isDarkMode ? 'block' : 'none'
  toggleThemeBtn.setAttribute(
    'aria-label',
    isDarkMode ? 'Switch to light mode' : 'Switch to dark mode',
  )
}

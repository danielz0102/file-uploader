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

setPreferredTheme()
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

function setPreferredTheme() {
  const themeSaved = localStorage.getItem('theme')

  if (themeSaved) {
    root.classList.toggle('dark', themeSaved === 'dark')
    return
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  root.classList.toggle('dark', prefersDark)
}

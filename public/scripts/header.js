setCurrentLink()
setupSidebar()

function setCurrentLink() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll('.nav-link')
  const currentLinks = Array.from(navLinks).filter(
    (link) => link.getAttribute('href') === currentPath,
  )

  currentLinks.forEach((link) => {
    link.classList.add('current')
  })
}

function setupSidebar() {
  const sidebar = document.querySelector('#sidebar')
  const openSidebarBtn = document.querySelector('#openSidebarBtn')
  const closeSidebarBtn = document.querySelector('#closeSidebarBtn')

  openSidebarBtn.addEventListener('click', () => {
    sidebar.classList.add('open')
  })

  closeSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('open')
  })
}

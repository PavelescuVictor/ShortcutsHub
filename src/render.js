document
  .getElementById('toggle-dark-mode')
  .addEventListener('click', async (event) => {
    event.stopPropagation();
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById('theme-source').innerHTML = isDarkMode
      ? 'Dark'
      : 'Light';
  });

document
  .getElementById('reset-to-system')
  .addEventListener('click', async (event) => {
    event.stopPropagation();
    await window.darkMode.system();
    document.getElementById('theme-source').innerHTML = 'System';
  });

document.querySelector('.main__wrapper').addEventListener('click', () => {
  const mainWrapper = document.querySelector('.main__wrapper');
  if (mainWrapper.classList.contains('main__wrapper--extended'))
    mainWrapper.classList.remove('main__wrapper--extended');
  else mainWrapper.classList.add('main__wrapper--extended');

  const mainContent = document.querySelector('.main__content');
  if (mainContent.classList.contains('main__content--visible'))
    mainContent.classList.remove('main__content--visible');
  else mainContent.classList.add('main__content--visible');
});

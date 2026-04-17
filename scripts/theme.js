
let root = document.querySelector(':root');
let themeBtn = document.querySelector('#theme-btn');

let rootStyle = root.style
document.querySelector('#theme-btn').addEventListener('click', () => {
  checkCurrentTheme();
})
let theme = '';
// Check if local storage has theme
function checkCurrentTheme() {
  if (localStorage.getItem("ohons-tech-theme") == null || JSON.parse(localStorage.getItem("ohons-tech-theme")) == undefined) {
    console.log('no theme in local storage')
    theme = 'light';
    changeTheme('light');
  } else {
    console.log('local storage has theme');
    theme = JSON.parse(localStorage.getItem("ohons-tech-theme"));
    console.log(theme);
    (theme == 'light')? changeTheme('dark'): changeTheme('light');
    console.log(JSON.parse(localStorage.getItem("ohons-tech-theme")));
  }
}

function changeTheme(theme) {
  if (theme == 'light') {
    rootStyle.setProperty('--text', '#121212')
    rootStyle.setProperty('--bg', '#fffcee')

    rootStyle.setProperty('--medium', '#c9bebe');
    rootStyle.setProperty('--dark', '#000000');
    
    //For Text on white bg
    rootStyle.setProperty('--text-on-bg', 'var(--text)');
    rootStyle.setProperty('--white', '#fff');
    rootStyle.setProperty('--light-white', '#ffffffbb');
    
    themeBtn?themeBtn.classList.remove('dark'): null;
    themeBtn?themeBtn.classList.add('light'): null;
  } else {
    rootStyle.setProperty('--text', '#fffcee')
    rootStyle.setProperty('--bg', '#121212')
    
    rootStyle.setProperty('--medium', '#c9bebe');
    rootStyle.setProperty('--dark', '#fffadc');
    
    //For Text on white bg
    rootStyle.setProperty('--text-on-bg', '#080808');
    rootStyle.setProperty('--white', '#ffffff');
    rootStyle.setProperty('--light-white', '#121212bb');
    
    themeBtn ? themeBtn.classList.remove('light') : null;  
    themeBtn?themeBtn.classList.add('dark'): null;
  }
  localStorage.setItem("ohons-tech-theme", JSON.stringify(theme));
}

changeTheme(JSON.parse(localStorage.getItem("ohons-tech-theme")));

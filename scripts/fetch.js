
document.addEventListener('DOMContentLoaded', start);

function start() {
  fetch('./scripts/JSON/services.json')
    .then(r => r.json())
    .then(data => {
      workOndata(data);
    }).catch(error => console.log('Fetch Error: ', error));
    
  function workOndata(data) {
    let grid = document.querySelector('.services .grid');
    grid.innerHTML = '';
    let template = document.querySelector('#service-template');
    template = template.content;
  
    data.forEach(el => {
      let clone = document.importNode(template, true);
      clone.querySelector('.heading h3').textContent = el.title;
      clone.querySelector('p').textContent = el.content;
  
      grid.appendChild(clone);
    });
  }
}
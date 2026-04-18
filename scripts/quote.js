import { sel } from './util/methods.js';

let quote_btns = sel('#quote-btn',true);
let quote_checkbox = sel('#quote-ch');

let clicked = false;
if (quote_btns) {
  // Listen for clicks
  quote_btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      clicked == false ? clicked = true : clicked = false;
      displayForm(clicked)
    })
  });
}
function displayForm(clicked) {
  clicked == true
    ? quote_checkbox.setAttribute('checked',true)
    : quote_checkbox.removeAttribute('checked')
  ;
}
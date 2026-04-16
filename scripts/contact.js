import { sel } from './util/methods.js';

let contact_btns = sel('#contact-btn',true);
let contact_checkbox = sel('#contact-ch');

let clicked = false;
if (contact_btns) {
  // Listen for clicks
  contact_btns.forEach(btn => {
    btn.addEventListener('click', () => {
      clicked == false ? clicked = true : clicked = false;
      displayForm(clicked)
    })
  });
}
function displayForm(clicked) {
  clicked == true
    ? contact_checkbox.setAttribute('checked',true)
    : contact_checkbox.removeAttribute('checked')
  ;
}
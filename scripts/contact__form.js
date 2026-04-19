import { sel } from './util/methods.js';
import { workOnForm } from './contact__process.js';

let contact__type = sel('.contact .btns input[name=contact-type]', true);
let forms = sel('.contact form > .fields',true);
let form_type = null;

contact__type.forEach(el => {
  el.addEventListener('change', e => {
    displayFormType(e.target.id.slice(4, e.target.id.length));
  });
})
function displayFormType(form_type) {
  if (forms) {
    forms.forEach(form => form.classList.remove('active'));
    forms.forEach(form => {
      if (form.id == `${form_type}-form`) {
        form.classList.add('active');
        workOnForm(form_type);
      }
    });
  }
}
displayFormType('whatsapp');

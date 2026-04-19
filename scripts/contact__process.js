import { sel } from './util/methods.js';

export function workOnForm(form_type) {
  // Get the parent div
  let form = sel(`.fields#${form_type}-form`);

  let name;
  let nameDiv;
  let error__name;
  let nameState;
  
  let message;
  let messageDiv;
  let error__message;
  let messageState;

  let email;
  let emailDiv;
  let error__email;
  let emailState;

  let submitBtn;

  if (form_type != 'phone') {
    name = sel('#name', false, form);
    message = sel('#msg', false, form);
    
    nameDiv = sel('.field.name',false, form);
    messageDiv = sel('.field.msg',false, form);
    
    error__name = sel('.error-msg',false, nameDiv) || null;
    error__message = sel('.error-msg', false, messageDiv) || null;
    
    nameState = false;
    messageState = false;

    submitBtn = sel('.chat', false, form);
    
    if (form_type == 'email') {
      email = sel('#email', false, form);
      emailDiv = sel('.field.email',false, form);
      error__email = sel('.error-msg', false, emailDiv) || null;
      emailState = false;
      submitBtn = sel('.mail', false, form);
    }
    
    /*-------- Listen for typing --------*/
    if (name) {
      name.addEventListener('keyup', (e) => {
        checkInput(e.target, 'name');
      })
    }
    if (email) {
      email.addEventListener('keyup', (e) => {
        checkInput(e.target, 'email');
      })
    }
    if (message) {
      message.addEventListener('keyup', (e) =>{
        checkInput(e.target, 'message');
      })
    }
  }

  // Submit ----------------
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (form_type == 'whatsapp') {
        if (!nameState) {
          errorMessage('Please input a valid name!', 'name');
          return;
        }
        if (!messageState) {
          errorMessage('Your message should be at least a word!', 'message')
          return;
        }
        if (nameState && messageState) {
          displaySuccessMessage();
          sendWhatsappMessage(name.value, message.value);
        }
      } else if (form_type == 'email') {
        displaySuccessMessage();
      }
  
    })
  }
  
  // Utility functions
  function checkInput(input, type) {
    if (type === "name") {
      if (!input.value || input.value.length < 3) {
        errorMessage('A valid name please', type)
        nameState = false;
      } else {
        errorMessage('remove', type)
        nameState = true;
      }
    } else if (type === "email") {
      if (!input.value) {
      errorMessage('Email cannot be empty.', type)
      emailState = false;
      } else if (isValidEmail(input.value) == false) {
        errorMessage('Looks like this is not an email', type)
        emailState = false;
      } else {
        errorMessage('remove', type)
        emailState = true;
      }
    } else if (type === "message") {
      if (!input.value || input.value.length < 3) {
        errorMessage('A valid message please', type)
        messageState = false;
      } else {
        errorMessage('remove', type)
        messageState = true;
      }
    }
  }
  function errorMessage(message, type) {
    if (type == "name") {
      if (message === "remove") {
        error__name.innerHTML = '';
        nameDiv.classList.remove('error')
        nameDiv.classList.add('valid')
      } else {
        error__name.innerHTML = message;
        nameDiv.classList.add('error')
        nameDiv.classList.remove('valid')
      }
    } else if (type == "email") {
      if (message === "remove") {
        error__email.innerHTML = '';
        emailDiv.classList.remove('error')
        emailDiv.classList.add('valid')
      } else {
        error__email.innerHTML = message;
        emailDiv.classList.add('error')
        emailDiv.classList.remove('valid')
      }
    } else if (type == "message") {
      if (message === "remove") {
        error__message.innerHTML = '';
        messageDiv.classList.remove('error')
        messageDiv.classList.add('valid')
      } else {
        error__message.innerHTML = message;
        messageDiv.classList.add('error')
        messageDiv.classList.remove('valid')
      }
    }
  }
}

// Testing -----------------------------
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Finals -------------------------------
function displaySuccessMessage() {
  // prevent duplicate messages
  if (sel('.success-message')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'success-message';
  wrapper.innerHTML = `
    <div class="success-message__inner">
      <div class="success-message__text">
        <h3>
          <i class="fa fa-check"></i>
          <span>Message Sent</span>
        </h3>
        <p>Thanks — we'll get back to you shortly.</p>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // trigger entrance animation on next frame
  requestAnimationFrame(() => wrapper.classList.add('show'));
  // auto-dismiss after a short delay: remove .show to animate out, then remove node
  const AUTO_DISMISS_MS = 4000;
  const EXIT_ANIM_MS = 480; // must be >= CSS transition time
  setTimeout(() => {
    wrapper.classList.remove('show');
    setTimeout(() => {
      if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
    }, EXIT_ANIM_MS);
  }, AUTO_DISMISS_MS);
}
function sendWhatsappMessage(name, message) {
  const phone = "2348038839073";

  const text =
    `Hello Ohons Tech,%0A` +
    `I am contacting you from your website.` +
    `My name is ${name}.%0A` +
    `${message}`;

  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, "_blank");
}

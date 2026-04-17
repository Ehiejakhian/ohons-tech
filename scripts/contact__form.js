import { sel } from './util/methods.js';

let name = sel('#name');
let message = sel('#msg');

let nameDiv = sel('.field.name');
let messageDiv = sel('.field.msg');

let error__name = sel('.error-msg',false, nameDiv);
let error__message = sel('.error-msg', false, messageDiv)

let submitBtn = sel('.chat') || sel('.call');

let nameState = false;
let messageState = false;


/* Now the normal event listeners */

if (name) {
  name.addEventListener('keyup', (e) => {
    checkInput(e.target, 'name');
  })
}
if (message) {
  message.addEventListener('keyup', (e) =>{
    checkInput(e.target, 'message');
  })
}

function checkInput(input, type) {
  // console.log('The input is a', type)
  if (type === "name") {
    if (!input.value || input.value.length < 3) {
      errorMessage('A valid name please', type)
      nameState = false;
    } else {
      errorMessage('remove', type)
      nameState = true;
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


submitBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  if (!nameState) {
    errorMessage('Please input a valid name!', 'name');
  } 
  if (!messageState) {
    errorMessage('Your message should be at least a word!', 'message')
  }
  if (nameState && messageState) {
    displaySuccessMessage();
    sendMessage();
  }
})

//AI help
function displaySuccessMessage() {
  // prevent duplicate messages
  if (sel('.success-message')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'success-message';
  wrapper.innerHTML = `
    <div class="success-message__inner">
      <svg class="success-message__icon" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="success-message__text">
        <h3>Message sent</h3>
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

function sendMessage() {}

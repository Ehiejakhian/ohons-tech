import { sel } from './util/methods.js';

function about_Populate() {
  let bgs = sel('.about .achievements > div > .bg', true)
  bgs.forEach(bg => {
    let icon = bg.innerHTML;
    for (let i = 0; i < 100; i++) {
      bg.innerHTML += icon;
    }
  })
}
about_Populate();
import { sel } from './util/methods.js';

function about_Populate() {
  let clock_bg = sel('.about .bg.time');
  let project_bg = sel('.about .bg.projects');
  let more_bg = sel('.about .bg.more');
  [clock_bg, project_bg, more_bg].forEach(bg => {
    let icon = bg.innerHTML;
    for (let i = 0; i < 100; i++) {
      bg.innerHTML += icon;
    }
  })
}
about_Populate();
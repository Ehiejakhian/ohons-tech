
export let sel = (selector, all = false, root = document) => {
  return all == false ?
    root.querySelector(selector)
    : root.querySelectorAll(selector);
}
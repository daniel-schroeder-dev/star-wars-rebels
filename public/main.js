const thumbnailLinks = document.querySelectorAll('.img-thumbnail-link');
const rebelsList = document.querySelector('ul');
const rebelNameHeader = document.querySelector('h2');
const rebelDetailsParagraph = document.querySelector('p');
const rebelSourceLink = document.querySelector('.rebel-source');

let rebelDetails;

fetch('/rebel-details')
  .then(res => res.json())
  .then(details => {
    rebelDetails = details;
  })
  .catch(console.error);

rebelsList.addEventListener('click', e => {
  e.preventDefault();
  if (!rebelClicked(e.target)) return;
  const thumbnailLink = getThumbnailLink(e.target);
  toggleActiveThumbnailLink(thumbnailLink);
  displayRebelDetails(thumbnailLink.href);
  const state = {
    href: thumbnailLink.href,
  };
  window.history.pushState(state, '', thumbnailLink.href);
});

window.onpopstate = function(event) {
  const thumbnailLink = document.querySelector(`a[href="/${event.state.href.split('/').pop()}"]`);
  toggleActiveThumbnailLink(thumbnailLink);
  displayRebelDetails(thumbnailLink.href);
}

function toggleActiveThumbnailLink(thumbnailLink) {
  Array.from(thumbnailLinks).forEach(link => link.classList.remove('active'));
  thumbnailLink.classList.add('active');
}

function rebelClicked(target) {
  return target.tagName === 'LI' || target.tagName === 'A' || target.tagName === 'IMG';
}

function getThumbnailLink(target) {
  if (target.tagName === 'A') return target;
  if (target.tagName === 'IMG') return target.parentElement;
  if (target.tagName === 'LI') return target.firstElementChild;
}

function displayRebelDetails(href) {
  const rebel = href.split('/').pop();
  rebelDetailsParagraph.textContent = rebelDetails[rebel].bio;
  rebelNameHeader.textContent = rebelDetails[rebel].name;
  rebelSourceLink.href = rebelDetails[rebel].source;
  rebelSourceLink.classList.remove('hidden');
}

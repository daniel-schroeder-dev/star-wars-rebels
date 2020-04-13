const thumbnailLinks = document.querySelectorAll('.img-thumbnail-link');
const rebelsList = document.querySelector('ul');
const rebelNameHeader = document.querySelector('h2');
const rebelDetailsParagraph = document.querySelector('p');
const rebelSourceLink = document.querySelector('.rebel-source');

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

var rebelDetails = {
  leia: {
    bio: 'Leia Skywalker Organa Solo, also known as Leia Organa for short, was a Force-sensitive human female political and military leader who served in the Alliance to Restore the Republic during the Imperial Era and the Resistance in the subsequent New Republic Era. Adopted into the House of Organa, the Alderaanian royal family, she was the Princess of Alderaan, a planet in the Core Worlds known for its dedication to pacifism. Organa was raised as the daughter of Senator Bail Organa and his wife, Queen Breha Organa, making her the heir to the Alderaanian monarchy. Instilled with the values of her adopted homeworld, Organa devoted her life to the restoration of democracy by opposing authoritarian regimes such as the Galactic Empire and the First Order.',
    name: 'Leia Organa',
    source: 'https://starwars.fandom.com/wiki/Leia_Organa',
  },
  'obi-wan': {
    bio: 'Obi-Wan Kenobi was a Force-sensitive human male and a legendary Jedi Master and member of the Jedi High Council during the Fall of the Republic. During the Age of the Empire, he went by the alias of Ben Kenobi in order to hide from the regime that drove the Jedi to near extinction in the aftermath of the Clone Wars. A noble man known for his skills with the Force, Kenobi trained Anakin Skywalker as his Padawan, served as a Jedi General in the Grand Army of the Republic, and became a mentor to Luke Skywalker prior to his death in 0 BBY.',
    name: 'Obi-Wan Kenobi',
    source: 'https://starwars.fandom.com/wiki/Obi-Wan_Kenobi',
  },
  'skywalker': {
    bio: 'Luke Skywalker, a Force-sensitive human male, was a legendary Jedi Master who fought in the Galactic Civil War during the reign of the Galactic Empire. Along with his companions, Princess Leia Organa and Captain Han Solo, Skywalker served on the side of the Alliance to Restore the Republic—an organization committed to the downfall of Emperor Palpatine and the restoration of democracy. Following the war, Skywalker became a living legend, and was remembered as one of the greatest Jedi in galactic history.',
    name: 'Luke Skywalker',
    source: 'https://starwars.fandom.com/wiki/Luke_Skywalker',
  },
  yoda: {
    bio: 'Yoda, a Force-sensitive male being belonging to a mysterious species, was a legendary Jedi Master who witnessed the rise and fall of the Galactic Republic, followed by the rise of the Galactic Empire. Small in stature but revered for his wisdom and power, Yoda trained generations of Jedi, ultimately serving as the Grand Master of the Jedi Order. Having lived through nine centuries of galactic history, he played integral roles in the Clone Wars, the rebirth of the Jedi through Luke Skywalker, and unlocking the path to immortality.',
    name: 'Yoda',
    source: 'https://starwars.fandom.com/wiki/Yoda',
  },
};


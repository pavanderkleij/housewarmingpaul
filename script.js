const entranceScene = document.querySelector('#entranceScene');
const partyScene = document.querySelector('#partyScene');
const doorButton = document.querySelector('#doorButton');
const bellHintText = document.querySelector('#bellHintText');
const partyPeople = document.querySelector('#partyPeople');
const inviteCard = document.querySelector('#inviteCard');
const toastSparkles = document.querySelector('#toastSparkles');
const replayButton = document.querySelector('#replayButton');
const showInviteButton = document.querySelector('#showInviteButton');
const speeches = [...document.querySelectorAll('[data-speech]')];

const lightbox = document.querySelector('#photoLightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxTitle = document.querySelector('#lightboxTitle');
const lightboxCaption = document.querySelector('#lightboxCaption');
const lightboxClose = document.querySelector('#lightboxClose');
const lightboxBackdrop = document.querySelector('#lightboxBackdrop');
const viewButton = document.querySelector('#viewButton');
const kitchenButton = document.querySelector('#kitchenButton');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const timers = [];
let hasEntered = false;
let lastFocusedElement = null;

function later(callback, delay) {
  const timer = window.setTimeout(callback, delay);
  timers.push(timer);
  return timer;
}

function clearTimers() {
  while (timers.length) window.clearTimeout(timers.pop());
}

function setSpeech(index) {
  speeches.forEach((bubble, bubbleIndex) => {
    bubble.classList.toggle('is-speaking', bubbleIndex === index);
  });
}

function showInvitation() {
  speeches.forEach((bubble) => bubble.classList.remove('is-speaking'));
  inviteCard.classList.add('is-visible');
}

function startPartySequence() {
  partyPeople.classList.add('is-visible');

  if (reducedMotion) {
    showInvitation();
    return;
  }

  later(() => setSpeech(0), 650);
  later(() => setSpeech(1), 2100);
  later(() => {
    setSpeech(2);
    partyPeople.classList.add('is-toasting');
    toastSparkles.classList.add('is-visible');
  }, 3550);
  later(() => {
    setSpeech(3);
    partyPeople.classList.remove('is-toasting');
  }, 5000);
  later(showInvitation, 6600);
}

function enterHouse() {
  if (hasEntered) return;
  hasEntered = true;
  doorButton.disabled = true;
  entranceScene.classList.add('is-ringing');
  bellHintText.textContent = 'ding dong…';

  const ringDelay = reducedMotion ? 10 : 420;
  const fadeDelay = reducedMotion ? 20 : 1480;
  const switchDelay = reducedMotion ? 30 : 1920;

  later(() => entranceScene.classList.add('is-opening'), ringDelay);
  later(() => entranceScene.classList.add('is-fading'), fadeDelay);
  later(() => {
    partyScene.classList.add('is-active');
    partyScene.setAttribute('aria-hidden', 'false');
    entranceScene.classList.remove('is-active');
    entranceScene.setAttribute('aria-hidden', 'true');
    startPartySequence();
  }, switchDelay);
}

function replay() {
  clearTimers();
  closeLightbox();
  hasEntered = false;
  speeches.forEach((bubble) => bubble.classList.remove('is-speaking'));
  inviteCard.classList.remove('is-visible');
  partyPeople.classList.remove('is-visible', 'is-toasting');
  toastSparkles.classList.remove('is-visible');
  partyScene.classList.remove('is-active');
  partyScene.setAttribute('aria-hidden', 'true');
  entranceScene.classList.remove('is-ringing', 'is-opening', 'is-fading');
  entranceScene.classList.add('is-active');
  entranceScene.removeAttribute('aria-hidden');
  doorButton.disabled = false;
  bellHintText.textContent = 'klik om aan te bellen';
  later(() => doorButton.focus({ preventScroll: true }), 200);
}

function openLightbox({ src, alt, title, caption }) {
  lastFocusedElement = document.activeElement;
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightboxTitle.textContent = title;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxClose.focus({ preventScroll: true });
}

function closeLightbox() {
  if (!lightbox.classList.contains('is-open')) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lastFocusedElement instanceof HTMLElement) {
    later(() => lastFocusedElement.focus({ preventScroll: true }), 120);
  }
}

doorButton.addEventListener('click', enterHouse);
showInviteButton.addEventListener('click', showInvitation);
replayButton.addEventListener('click', replay);

viewButton.addEventListener('click', () => openLightbox({
  src: 'assets/uitzicht.webp',
  alt: 'Uitzicht vanuit het raam over de straat en het water',
  title: 'Het uitzicht',
  caption: 'Vanaf de zolderetage.'
}));

kitchenButton.addEventListener('click', () => openLightbox({
  src: 'assets/keuken.webp',
  alt: 'De keuken met donkerhouten kasten, kookeiland en dakraam',
  title: 'De keuken',
  caption: 'Koffie, hapjes en later waarschijnlijk de dansvloer.'
}));

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

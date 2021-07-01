'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const headerLink = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

learnMore.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
// headerLink.forEach(ele => ele.href.scrollIntoView({ behavior: 'smooth' }));
// headerLink.forEach(ele =>
//   ele.addEventListener('click', function (e) {
//     e.preventDefault();
//   })
// );
// headerLink.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//NAV SMOOTH SCROLLING
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContant = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  if (!clicked) return;
  //ADDING ACTIVE BUTTON
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //ADDING ACTIVE CONTENT
  const activeContent = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  tabContant.forEach(c => c.classList.remove('operations__content--active'));
  activeContent.classList.add('operations__content--active');
});

//Adding Fade Animation
const logoFadAnimation = function (el) {
  if (el.target.classList.contains('nav__link')) {
    const click = el.target;
    const siblings = click.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings);
    const logo = click.closest('.nav').querySelector('img');
    siblings.forEach(sib => {
      if (sib !== click) sib.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', logoFadAnimation.bind(0.5));
nav.addEventListener('mouseout', logoFadAnimation.bind(1));

//Implementing Sticky Header
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(header);
const stickyHeader = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Text Animation
const sections = document.querySelectorAll('.section');
const sectionfunction = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionfunction, {
  root: null,
  threshold: 0.15,
});
sections.forEach(function (el) {
  sectionObserver.observe(el);
  // el.classList.add('section--hidden');
});

//Implementing Real image

const featuresImage = document.querySelectorAll('.features__img');
// console.log(featuresImage);
const lazyImage = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const imageObsever = new IntersectionObserver(lazyImage, {
  root: null,
  threshold: 0.15,
  rootMargin: '-200px',
});
featuresImage.forEach(img => imageObsever.observe(img));

//Implement Slider
const ImplementedSlider = function () {
  const allSlider = document.querySelectorAll('.slide');
  const sliderButtonRight = document.querySelector('.slider__btn--right');
  const sliderButtonleft = document.querySelector('.slider__btn--left');

  // console.log(allSlider
  // allSlider.forEach(function (el, i) {
  //   el.style.transform = `translateX(${100 * i}%)`;
  // });
  let countSlider = 0;
  let maxSlider = allSlider.length;
  const functionOfSlider = function (slider) {
    allSlider.forEach(function (el, i) {
      el.style.transform = `translateX(${100 * (i - slider)}%)`;
    });
  };
  functionOfSlider(0);
  // activeDot(0);
  const slideToRight = function () {
    if (countSlider === maxSlider - 1) {
      countSlider = 0;
    } else {
      countSlider++;
    }
    functionOfSlider(countSlider);
    activeDot(countSlider);
  };
  const slideToLeft = function () {
    if (countSlider === 0) {
      countSlider = maxSlider - 1;
    } else {
      countSlider--;
    }
    functionOfSlider(countSlider);
    activeDot(countSlider);
  };
  sliderButtonRight.addEventListener('click', slideToRight);

  sliderButtonleft.addEventListener('click', slideToLeft);

  //Implemention Slider Using kewboard Arrow

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') slideToRight(), activeDot(countSlider);
    if (e.key === 'ArrowLeft') {
      slideToLeft(), activeDot(countSlider);
    }
  });

  //Creating Dots
  const dotContainer = document.querySelector('.dots');
  const createDots = function () {
    allSlider.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-main="${i}"></button>`
      );
    });
  };
  createDots();
  dotContainer.addEventListener('click', function (el) {
    if (el.target.classList.contains('dots__dot')) {
      console.log(el.target);
      const slide = el.target.dataset.main;
      console.log(slide);
      functionOfSlider(slide);
      activeDot(slide);
    }
  });
  const activeDot = function (dot) {
    const alldots = document.querySelectorAll('.dots__dot');
    alldots.forEach(function (d) {
      d.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-main="${dot}"]`)
      .classList.add('dots__dot--active');
  };
  activeDot(0);
};
ImplementedSlider();

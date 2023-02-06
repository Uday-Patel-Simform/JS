// Single page routing

const routers = document.querySelectorAll('.nav-link');

routers.forEach(route => (route.addEventListener('click', (e) => {
    e.preventDefault();
    click_event = e || window.e;
    window.history.pushState({}, '', click_event.target.href);
    changeLocation();
})));

const routs = {
    "": "./home.html",
    "/": "./home.html",
    "#home": "./home.html",
    "#services": "./services.html",
    "#images": "./images.html"
}

const changeLocation = async () => {
    const path = window.location.hash;
    const route = routs[path];
    const html = await fetch(route).then((data) => data.text());
    // .then(text => document.querySelector('.app').innerHTML = text)
    document.querySelector('.app').innerHTML = html;
    if (path == '#images') {
        img_slider();
    } else if (path == '#home') {
        smooth_scroll();
    }
}

window.addEventListener('popstate', changeLocation);
changeLocation();

const img_slider = () => {
    const slides = document.querySelectorAll('.slide');
    const nxt = document.querySelector('.next');
    const prv = document.querySelector('.previous');
    let cur = 0;

    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

    nxt.addEventListener('click', () => {
        if (cur == slides.length - 1) {
            cur = 0;
        }
        else {
            cur++;
        }
        slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - cur)}%)`));
    });
    prv.addEventListener('click', () => {
        if (cur == 0) {
            cur = slides.length - 1;
        }
        else {
            cur--;
        }
        slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - cur)}%)`));
    });
}

const smooth_scroll = () => {
    const scroll=document.querySelector('.home-scroll-button');
    scroll.addEventListener('click',(e)=>{
        e.preventDefault();
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
    });
}
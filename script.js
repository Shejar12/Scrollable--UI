const cards = Array.from(document.querySelectorAll('.card'));
let currentIndex = 2;
let isScrolling = false;

function updateCards() {
    const totalCards = cards.length;
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    const nextIndex = (currentIndex + 1) % totalCards;

    cards.forEach((card, i) => {
        card.className = 'card';

        if (i === currentIndex) {
            card.classList.add('center');
        } else if (i === prevIndex) {
            card.classList.add('top');
        } else if (i === nextIndex) {
            card.classList.add('bottom');
        } else {
            card.classList.add('hidden');
        }
    });
}

function scrollCards(direction) {
    if (isScrolling) return;

    isScrolling = true;

    if (direction === 'up') {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    } else if (direction === 'down') {
        currentIndex = (currentIndex + 1) % cards.length;
    }

    updateCards();

    setTimeout(() => {
        isScrolling = false;
    }, 500);
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const handleWheel = debounce((e) => {
    if (e.deltaY > 0) {
        scrollCards('down');
    } else {
        scrollCards('up');
    }
}, 20);

const handleTouchMove = debounce((startY, endY) => {
    if (startY - endY > 10) {
        scrollCards('down');
    } else if (endY - startY > 10) {
        scrollCards('up');
    }
}, 20);

let startY = 0;
document.addEventListener('wheel', handleWheel);

document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    handleTouchMove(startY, endY);
});

updateCards();

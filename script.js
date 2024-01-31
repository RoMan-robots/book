let currentPage = 0;
const pages = document.querySelectorAll('#book .page');
let animationInProgress = false;

function updatePages() {
    pages.forEach(page => {
        page.style.display = 'none';
        page.classList.remove('flip', 'active', 'next');
    });

    pages[currentPage].style.display = 'block';
    pages[currentPage].classList.add('active');

    if (currentPage + 1 < pages.length) {
        pages[currentPage + 1].style.display = 'block';
        pages[currentPage + 1].classList.add('next');
    }
}

function animateFlip(timestamp, startTimestamp, duration) {
    const progress = (timestamp - startTimestamp) / duration;

    if (progress < 1) {
        pages[currentPage].style.transform = `rotateY(${-180 * progress}deg)`;
        requestAnimationFrame((timestamp) => animateFlip(timestamp, startTimestamp, duration));
    } else {
        pages[currentPage].style.transform = 'rotateY(0deg)';
        animationInProgress = false;
        if (currentPage < pages.length - 1) {
            pages[currentPage + 1].style.display = 'block';
            pages[currentPage + 1].classList.add('next');
        }
        updatePages();
    }
}

function nextPage() {
    if (currentPage < pages.length - 1 && !animationInProgress) {
        currentPage++;
        animationInProgress = true;
        const startTimestamp = performance.now();

        requestAnimationFrame((timestamp) => animateFlip(timestamp, startTimestamp, 800));
    }
}

function prevPage() {
    if (currentPage > 0 && !animationInProgress) {
        currentPage--;
        animationInProgress = true;
        updatePages();
    }
}

document.addEventListener('DOMContentLoaded', updatePages);

const pages = ['index.html', 'graph_intro.html', 'data_intro.html', 'glossary_intro.html', 'relational.html'];

const currentPage = window.location.pathname.split('/').pop();

const currentIndex = pages.indexOf(currentPage);

const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        window.location.href = pages[currentIndex - 1];
    } else {
        alert('This is the first page!');
    }
});

rightArrow.addEventListener('click', () => {
    if (currentIndex < pages.length - 1) {
        window.location.href = pages[currentIndex + 1];
    } else {
        alert('This is the last page!');
    }
});

// CARROSSEL FEEDBACK

const cards = document.querySelectorAll('.feedback-card');
const track = document.getElementById('track');
let intervaloCarrossel;

// Array com as classes na ordem inicial exata do HTML
let posicoes = ['pos-esq', 'pos-cen', 'pos-dir'];

function rodarCarrossel() {
    posicoes.unshift(posicoes.pop());

    cards.forEach((card, index) => {
        card.classList.remove('pos-esq', 'pos-cen', 'pos-dir');
        card.classList.add(posicoes[index]);
    });
}

function iniciarAutoPlay() {
    intervaloCarrossel = setInterval(rodarCarrossel, 3000);
}

track.addEventListener('click', () => {
    clearInterval(intervaloCarrossel); 
    rodarCarrossel(); 
    iniciarAutoPlay(); 
});

iniciarAutoPlay();
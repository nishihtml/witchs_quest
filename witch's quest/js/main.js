function startGame() {
    const preview = document.getElementById('game-preview');
    const text = preview.querySelector('.game-text');
    const loader = preview.querySelector('.loader');

    preview.classList.remove('hidden');
    loader.classList.remove('hidden');

    let dots = 0;

    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        text.textContent = 'Carregando magia' + '.'.repeat(dots);
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        text.textContent = 'Magia carregada! Vamos jogar!';
        text.style.color = '#c084fc';

        // Oculta loader
        loader.classList.add('hidden');

        // Esconde o preview inteiro após 1.5s
        setTimeout(() => {
            preview.classList.add('hidden');
        }, 1500);
    }, 3500);
}

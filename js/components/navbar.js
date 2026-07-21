const navbarHTML = `
    <nav id="navegacao" class="navegacao">
        <div class="navegacao-links">
            <button id="btn-abrir-menu" class="btn-menu" aria-label="Abrir menu">
                <img src="/assets/icons/menu.svg" alt="Ícone de menu">
            </button>
            <img src="../assets/img/Logo_Baristopia.svg" alt="Logo Baristopia" class="logo">
            <button class="open-button btn btn-primary" data-modal="modal-login">Entrar</button>
        </div>
        
        <aside id="menu-lateral" class="menu-lateral">
            <button id="btn-fechar-menu" class="btn-fechar-menu" aria-label="Fechar menu">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <ul class="links-menu-lateral">
                <li><a href="../index.html#sobre">Sobre</a></li>
                <li><a href="../pages/principal.html#cafes">Cafés</a></li>
                <li><a href="../pages/principal.html#equipamentos">Equipamentos</a></li>
                <li><a href="../pages/principal.html#kits">Kits</a></li>
                <li><a href="../index.html#informacoes">Informações</a></li>
                <li><a href="../index.html#formulario">Faça parte disso</a></li>
            </ul>
        </aside>
        
        <dialog class="modal" id="modal">
            <button class="close-button" aria-label="Fechar modal">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.5996 0.600006L0.599609 24.6M0.599609 0.600006L24.5996 24.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <h2>Seja bem vindo, de volta, <p>inicie sua sessão.</p></h2>
            <div id="login-message" class="status-message" style="display: none;"></div>
            <input type="text" name="email" id="login-email" placeholder="Email">
            <input type="password" name="senha" id="login-senha" placeholder="Senha">
            <button class="btn btn-tertiary">Esqueceu a senha?</button>
            <button class="btn btn-primary" id="btn-efetuar-login">Entrar</button>
            <button class="btn btn-secondary">Criar conta</button>
        </dialog>
    </nav>
`;

document.getElementById('navbar-root').innerHTML = navbarHTML;

// Avisa que a navbar já existe no DOM
window.dispatchEvent(new Event('navbarCarregada'));

// Menu Lateral (JavaScript)
const menuLateral = document.getElementById('menu-lateral');
const btnAbrirMenu = document.getElementById('btn-abrir-menu');
const btnFecharMenu = document.getElementById('btn-fechar-menu');

const fecharMenu = () => {
    menuLateral.classList.remove('aberto');
};

// Quando clicar em abrir, adiciona a classe "aberto"
btnAbrirMenu.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que o clique no botão ative o evento de clicar fora
    menuLateral.classList.add('aberto');
});

// Quando clicar no X, remove a classe "aberto"
btnFecharMenu.addEventListener('click', fecharMenu);

// Selecionamos todos os links <a> que estão dentro da lista do menu lateral
const linksMenu = document.querySelectorAll('.links-menu-lateral a');

// Usamos um loop (forEach) para adicionar o evento de clique em cada um deles
linksMenu.forEach(link => {
    link.addEventListener('click', fecharMenu);
});

// Adicionamos um ouvinte de clique no documento inteiro (na página toda)
document.addEventListener('click', (evento) => {
    // Verificamos se o menu está aberto
    const menuEstaAberto = menuLateral.classList.contains('aberto');
    
    // Verificamos se o clique aconteceu FORA do menu lateral
    const clicouForaDoMenu = !menuLateral.contains(evento.target);
    
    // Verificamos se o clique aconteceu FORA do botão de abrir (para não dar conflito)
    const clicouForaDoBotaoAbrir = !btnAbrirMenu.contains(evento.target);

    // Se o menu estiver aberto E o usuário clicou fora de tudo, nós fechamos o menu
    if (menuEstaAberto && clicouForaDoMenu && clicouForaDoBotaoAbrir) {
        fecharMenu();
    }
});

// --- Lógica do Scroll da Navbar ---
const navbarElement = document.getElementById('navegacao');

if (navbarElement) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbarElement.classList.add('com-fundo');
        } else {
            navbarElement.classList.remove('com-fundo');
        }
    });
}
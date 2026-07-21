export function iniciarMenuUsuario() {
    // Função que faz o trabalho real
    const processarMenu = () => {
        const usuarioAtivo = localStorage.getItem('usuarioLogado');
        const btnEntrar = document.querySelector('.open-button');
        
        if (usuarioAtivo === 'true' && btnEntrar) {
            const dadosSalvos = JSON.parse(localStorage.getItem('dadosUsuario'));
            const nomeExibicao = (dadosSalvos && dadosSalvos.apelido) ? dadosSalvos.apelido : 'Usuário';
            
            const menuIcones = document.createElement('div');
            menuIcones.className = 'sessao-icones-wrapper'; 
            
            menuIcones.innerHTML = `
                <a href="../pages/carrinho.html" id="link-carrinho" aria-label="Ir para o carrinho" class="icone-molde icone-carrinho"></a>
                
                <div class="menu-perfil-wrapper"> 
                    <div id="btn-perfil" aria-label="Perfil do usuário" class="icone-molde icone-usuario"></div>
                    
                    <div id="dropdown-usuario" class="dropdown-perfil">
                        <span class="dropdown-apelido">Olá, ${nomeExibicao}</span>
                        <hr class="dropdown-linha">
                        <a href="#ajuda" class="dropdown-item">Ajuda</a>
                        <button id="btn-sair" class="dropdown-item deslogar">Sair</button>
                    </div>
                </div>
            `;
            
            btnEntrar.replaceWith(menuIcones);

            // Eventos do Dropdown
            document.getElementById('btn-perfil').addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('dropdown-usuario').classList.toggle('ativo');
            });

            document.addEventListener('click', () => {
                document.getElementById('dropdown-usuario').classList.remove('ativo');
            });

            document.getElementById('btn-sair').addEventListener('click', () => {
                localStorage.removeItem('usuarioLogado'); 
                window.location.reload(); 
            });
        }
    };

    // Tenta rodar agora, e caso a navbar demore, escuta o evento que criamos
    processarMenu();
    window.addEventListener('navbarCarregada', processarMenu);
}
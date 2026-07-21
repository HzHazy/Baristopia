export function iniciarModal() {
    document.addEventListener('click', (event) => {
        const modal = document.querySelector('#modal');
        
        // Verifica se clicou no botão "Entrar"
        if (event.target.classList.contains('open-button')) {
            if (modal) modal.showModal();
        }

        if (event.target.classList.contains('btn-secondary')) {
            window.location.href = '../pages/form.html';
        }
        
        // Verifica se clicou no "X" para fechar
        if (event.target.closest('.close-button')) {
            if (modal) modal.close();
        }
    });
};

// Função auxiliar interna
function exibirMensagem(texto, tipo) {
    const msgDiv = document.getElementById('login-message');
    if (!msgDiv) return; 

    msgDiv.textContent = texto;
    msgDiv.className = `status-message ${tipo}`; 
    msgDiv.style.display = 'block';

    // Esconde após 4 segundos
    setTimeout(() => { msgDiv.style.display = 'none'; }, 4000);
}

export function iniciarModalLogin() {
    document.addEventListener('click', (evento) => {
        if (evento.target && evento.target.id === 'btn-efetuar-login') {
            evento.preventDefault();

            const emailDigitado = document.getElementById('login-email').value.trim();
            const senhaDigitada = document.getElementById('login-senha').value.trim();
            const usuarioSalvo = JSON.parse(localStorage.getItem('dadosUsuario'));

            // Erro: Usuário não cadastrado
            if (!usuarioSalvo) {
                exibirMensagem("Nenhum usuário encontrado. Cadastre-se!", 'error');
                return;
            }

            // Sucesso: Login validado
            if (emailDigitado === usuarioSalvo.email && senhaDigitada === usuarioSalvo.senha) {
                localStorage.setItem('usuarioLogado', 'true');
                
                // Redireciona de forma segura dependendo do local onde o login foi feito
                if (window.location.pathname.includes('/pages/')) {
                    window.location.href = 'principal.html';
                } else {
                    window.location.href = 'pages/principal.html';
                }
            } 
            // Erro: Credenciais inválidas
            else {
                exibirMensagem("Email ou senha incorretos.", 'error');
            }
        }
    });
}
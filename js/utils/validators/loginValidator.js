export function setupValidacaoLogin() {
    const login = document.querySelector('#login');
    const mensagemLogin = document.querySelector('#mensagem-login');

    if (!login || !mensagemLogin) return;

    login.addEventListener('input', (e) => {
        const valor = e.target.value; 
        
        if(login === ''){
            mensagemLogin.classList.remove('valido', 'invalido');
            return;
        }
        if(login.length < 6){
            mensagemLogin.classList.add('invalido');
            mensagemLogin.classList.remove('valido');
            return;
        }
        
        mensagemLogin.classList.remove('invalido');
        mensagemLogin.classList.add('valido');
    });
};
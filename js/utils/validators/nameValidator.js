
export function setupValidacaoNome() {
    const nomeCompleto = document.querySelector('#fullname');
    const mensagemNome = document.querySelector('#mensagem-nomeCompleto');

    if (!nomeCompleto || !mensagemNome) return;
    
    nomeCompleto.addEventListener('input', (e) => {
        const nome = e.target.value;     
        
        if(nome === ''){
            mensagemNome.textContent = '';
            mensagemNome.classList.remove('valido', 'invalido');
            return;
        }
        
        if(nome.length < 15){
            mensagemNome.textContent = 'O nome deve ter no mínimo 15 caracteres.';
            mensagemNome.classList.add('invalido');
            return;
        }
        
        mensagemNome.textContent = '';
        mensagemNome.classList.remove('valido','invalido');
    });
};
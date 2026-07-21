export function setupValidacaoForcaSenha() {
    const senha = document.querySelector('#password');
    const mensagemCaracteres = document.querySelector('#mensagem-caracteres');
    const mensagemLetrasNumeros = document.querySelector('#mensagem-letrasNumeros');
    const mensagemMaiusculasMinusculas = document.querySelector('#mensagem-maiusculasMinusculas');
    const mensagemEspecial = document.querySelector('#mensagem-especial');

    if(!senha || !mensagemCaracteres) return;
    
    const regrasSenha = [
        {   elemento: mensagemCaracteres, valida: (senha) => senha.length >= 8 },
        {   elemento: mensagemLetrasNumeros, valida: (senha) => (/[a-z]/i.test(senha) && /\d/.test(senha)) },
        {   elemento: mensagemMaiusculasMinusculas, valida: (senha) => (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) },
        {   elemento: mensagemEspecial, valida: (senha) => /[\/*\-+.!@#$&]/.test(senha) }
    ];
    
    senha.addEventListener('input', (e) => {
        const valor = e.target.value;
        if (valor === "") {
            regrasSenha.forEach(regra => regra.elemento?.classList.remove('valido'));
            return;
        }
        regrasSenha.forEach(regra => {
            if (regra.elemento) {
                regra.elemento.classList.toggle('valido', regra.valida(valor));
            }
        });    
    });    
}

export function setupValidacaoConfirmacaoSenha() {
    const senha = document.querySelector('#password');
    const senhaConfirmacao = document.querySelector('#passwordconfirm');
    const mensagemConfirmacao = document.querySelector('#mensagem-confirmacao');
    
    if(!senha || !senhaConfirmacao || !mensagemConfirmacao) return;

    const confirmarSenhas = () => {
        if (senhaConfirmacao.value === "") {
            mensagemConfirmacao.textContent = '';
            mensagemConfirmacao.classList.remove('valido', 'invalido');
            return;
        }
        
        if (senhaConfirmacao.value !== senha.value) {
            mensagemConfirmacao.textContent = 'As senhas não conferem.';
            mensagemConfirmacao.classList.add('invalido');
            mensagemConfirmacao.classList.remove('valido');
            return;
        }
        
        mensagemConfirmacao.textContent = '';
        mensagemConfirmacao.classList.add('valido');
        mensagemConfirmacao.classList.remove('invalido');
    };

    // Confirmação de senha
    senhaConfirmacao.addEventListener('input', confirmarSenhas);

    senha.addEventListener('input', () => {
        if (senhaConfirmacao.value !== "") {
            confirmarSenhas();
        }
    });
};
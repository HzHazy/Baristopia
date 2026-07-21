export function setupValidacaoMaioridade() {
    const dia = document.querySelector('#dia');
    const mes = document.querySelector('#mes');
    const ano = document.querySelector('#ano');
    const mensagemData = document.querySelector('#mensagem-dataNascimento');

    if(!dia || !mes || !ano || !mensagemData) return;

    function validarMaioridade() {
        const diaValor = dia.value;
        const mesValor = mes.value;
        const anoValor = ano.value;
    
        if (!diaValor || !mesValor || !anoValor || anoValor.length < 4) {
            return;
        }
    
        const dataNascimento = new Date(anoValor, mesValor - 1, diaValor);
        const dataAtual = new Date();
    
        let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
        const mesAtual = dataAtual.getMonth();
        const mesNascimento = dataNascimento.getMonth();
    
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && dataAtual.getDate() < dataNascimento.getDate())) {
            idade--;
        }
    
        if (idade < 18){
            console.log('Usario menor de idade.');
            mensagemData.textContent = 'É necessário ser maior de 18 anos.'
            mensagemData.classList.add('invalido')
        } else {
            mensagemData.textContent = ''
            mensagemData.classList.remove('invalido')
        }
    };
    
    dia.addEventListener('input', validarMaioridade);
    mes.addEventListener('input', validarMaioridade);
    ano.addEventListener('input', validarMaioridade);
};



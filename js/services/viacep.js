export function iniciarViaCep() {
    const cep = document.querySelector('#cep');
    const btnNaoSeiCep = document.querySelector('#btn-nao-sei-cep');
    
    if (!cep) return;

    const logradouro = document.querySelector('#logradouro');
    const numero = document.querySelector('#numero');
    const complemento = document.querySelector('#complemento');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const uf = document.querySelector('#uf');
    const mensagemCEP = document.querySelector('#mensagem-cep');

    const limparEndereco = () => {
            logradouro.value = "";
            numero.value = "";
            complemento.value = "";
            bairro.value = "";
            cidade.value = "";
            uf.value = "";
    };

    // --- CONSULTA DO CEP
    async function consultarCEP(cepLimpo){
        const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;

        try{
            const response = await fetch(url);
            const data = await response.json();

            if(data.erro){
                mensagemCEP.textContent= `O CEP ${cepLimpo} é inexistente.`;
                limparEndereco();
                return;
            } 
            
            logradouro.value = data.logradouro;
            bairro.value = data.bairro;
            cidade.value = data.localidade;      
            uf.value = data.uf;
                
            numero.focus();
            
        } catch (error) {
            console.error('Erro na requisição da API:', error);
            mensagemCEP.textContent = "Erro ao buscar o CEP. Tente novamente mais tarde.";
            limparEndereco();
        }
    };

    //Dispara a consulta do CEP assim que o usuário digita o 8º dígito
    cep.addEventListener('input', (e) => {
        let cepLimpo = e.target.value.replace(/\D/g,'').slice(0, 8); // Remove letras/símbolos e trava o tamanho máximo em 8 dígitos
        e.target.value = cepLimpo.replace(/(\d{5})(\d{1,3})/, '$1-$2'); // Delvove o cep limpo de dígitos não numéricos e aplica a máscara visual no input (00000-000)
        
        const cepInvalido = /^(\d)\1{7}$/; // Bloqueia sequências repetidas
        
        if(cepLimpo === "" || cepLimpo.length < 8){
            limparEndereco();
            mensagemCEP.textContent= ""
            return;
        } 
            
        if(cepInvalido.test(cepLimpo)) {
            mensagemCEP.textContent= `O CEP ${cepLimpo} é invalido.`;
            limparEndereco();
            return;
        }

        if(cepLimpo.length === 8) {
            consultarCEP(cepLimpo);
        }
    });
    
    // Lógica do botão "Não sei o meu cep"
    if (btnNaoSeiCep) {
        btnNaoSeiCep.addEventListener('click', () => {
            window.open('https://buscacepinter.correios.com.br/', '_blank');
        });
    }
};

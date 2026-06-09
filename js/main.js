// MODAL
const modal = document.querySelector('#modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');

openModal.onclick = () => modal.showModal();
closeModal.onclick = () => modal.close();

// CEP
const cep = document.getElementById('cep')
const logradouro = document.getElementById('logradouro');
const numero = document.getElementById('numero');
const complemento = document.getElementById('complemento');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const mensagemErro = document.getElementById('mensagemErro');

const limparEndereco = () => {
        logradouro.value = "";
        numero.value = "";
        complemento.value = "";
        bairro.value = "";
        cidade.value = "";
        uf.value = "";
    };

//Dispara a consulta do CEP assim que o usuário digita o 8º dígito
cep.addEventListener('input', (e) => {
    let cepLimpo = e.target.value.replace(/\D/g,''); // Remove letras/símbolos automaticamente
    cepLimpo = cepLimpo.slice(0, 8); //Trava o tamanho máximo em 8 dígitos
    
    e.target.value = cepLimpo.replace(/(\d{5})(\d)/, '$1-$2'); // Delvove o cep limpo de dígitos não numéricos e aplica a máscara visual no input (00000-000)
    
    const cepInvalido = /^(\d)\1{7}$/; // Bloqueia sequências repetidas
    
    if(cepLimpo === "" || cepLimpo.length < 8){
        limparEndereco();
        mensagemErro.textContent= ""
        return;
    } 
        
    if(cepLimpo.length === 8 && cepInvalido.test(cepLimpo)) {
        mensagemErro.textContent= `O CEP ${cepLimpo} é invalido.`;
        limparEndereco();
        return;
    }

    if(cepLimpo.length === 8) {
        consultarCEP(cepLimpo);
    }
});                    
            
// --- CONSULTA DO CEP
async function consultarCEP(cepLimpo){
    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        if(data.erro){
            mensagemErro.textContent= `O CEP ${cepLimpo} é inexistente.`;
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
        mensagemErro.textContent = "Erro ao buscar o CEP. Tente novamente mais tarde.";
        limparEndereco();
    };
};

// Validação de CPF
const cpfInput = document.getElementById('cpf');

cpfInput.addEventListener('input', (e) => {
    let cpf = e.target.value.replace(/\D/g,''); // Bloqueia letras e símbolos
    cpf = cpf.slice(0, 11); // Bloqueia mais de 11 dígitos
    e.target.value = cpf; // Devolve o cpf limpo para o imput.

    const cpfInvalido = /^(\d)\1{10}$/; // Bloqueia sequências repetidas

    if(cpf === "" || cpf.length < 11){
        mensagemErro.textContent= ""
        return;
    } 
        
    if(cpf.length === 11 && cpfInvalido.test(cpf)) {
        mensagemErro.textContent= `O CPF ${cpf} é inválido`;
        return;
    }

    if(cpf.length === 11) {
        const verificarDigito = (cpfIncompleto) => {
            let somatoria = 0;

            for(let i = 0; i < cpfIncompleto.length; i++) {
                let digitoAtual = cpfIncompleto.charAt(i);

                let constante = (cpfIncompleto.length + 1 - i)
                
                somatoria += Number(digitoAtual) * constante;
            };
            const resto = somatoria % 11

            return resto < 2 ? '0' : (11 - resto).toString()
        };

        let primeiroDigito = verificarDigito(cpf.substring(0, 9));
        let segundoDigito = verificarDigito(cpf.substring(0, 9) + primeiroDigito);

        let cpfValido = cpf.substring(0, 9) + primeiroDigito + segundoDigito

        if (cpf !== cpfValido) {
          console.log('CPF inválido')
          mensagemErro.textContent= "CPF inválido"
          return;
        }

        mensagemErro.textContent= "CPF válido"
        return
    }
})


// VALIDAÇÃO DO PRIMEIRO DÍGITO
    // for (let i = 1; i <= 9; i++) {
    //     soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    // }
    // resto = (soma * 10) % 11;
    // if ((resto === 10) || (resto === 11)) resto = 0;
    // if (resto !== parseInt(cpf.substring(9, 10))) return false;

    // soma = 0;

    // VALIDAÇÃO DO SEGUNDO DÍGITO
    // for (let i = 1; i <= 10; i++) {
    //     soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    // }
    // resto = (soma * 10) % 11;
    // if ((resto === 10) || (resto === 11)) resto = 0;
    // if (resto !== parseInt(cpf.substring(10, 11))) return false;

    // return mensagemErro.textContent= "CPF válido"


















// Navbar

 // 1. Selecionamos a barra de navegação pelo ID que você já criou
        const header = document.getElementById('navegacao');

        // 2. Adicionamos um "ouvinte" que dispara sempre que a tela é rolada (scroll)
        window.addEventListener('scroll', () => {
            
            // 3. Lógica condicional: Se a rolagem vertical (scrollY) for maior que 50 pixels...
            if (window.scrollY > 50) {
                // ...adiciona a classe com a cor e sombra
                header.classList.add('com-fundo');
            } else {
                // ...caso contrário (voltou pro topo), remove a classe e volta a ser transparente
                header.classList.remove('com-fundo');
            }
        });

        // --- AUTOMAÇÃO DA DATA DE NASCIMENTO ---

        // 1. Preenchendo os Dias (1 a 31)
        const selectDia = document.getElementById('dia');
        for (let i = 1; i <= 31; i++) {
            // Se o número for menor que 10, coloca um '0' na frente (ex: 01, 02)
            let dia = i < 10 ? '0' + i : i; 
            // Cria a nova opção e adiciona no select
            selectDia.add(new Option(dia, dia)); 
        }

        // 2. Preenchendo os Meses (Nomes por extenso para ficar mais elegante)
        const selectMes = document.getElementById('mes');
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        for (let i = 0; i < 12; i++) {
            let valorMes = i + 1 < 10 ? '0' + (i + 1) : (i + 1); // Gera 01, 02, etc.
            selectMes.add(new Option(meses[i], valorMes)); 
        }

        // 3. Preenchendo os Anos (Do ano atual até 1930)
        const selectAno = document.getElementById('ano');
        const anoAtual = new Date().getFullYear(); // Pega o ano atual automaticamente
        for (let i = anoAtual; i >= 1930; i--) {
            selectAno.add(new Option(i, i));
        }

        // --- Opções do Estado ---

        const selectUf = document.getElementById('uf');
        const ufs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
        ufs.forEach(sigla => {
            selectUf.add(new Option(sigla, sigla));
        });
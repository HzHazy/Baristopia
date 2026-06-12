// CARROSSEL FEEDBACK

const cards = document.querySelectorAll('.feedback-card');
const track = document.getElementById('track');
let intervaloCarrossel;

// Array com as classes na ordem inicial exata do HTML
let posicoes = ['pos-esq', 'pos-cen', 'pos-dir'];

function rodarCarrossel() {
    // A mágica da lógica: 
    // .pop() tira o último item da lista ('pos-dir')
    // .unshift() coloca ele no início da lista.
    // A lista vira: ['pos-dir', 'pos-esq', 'pos-cen']
    posicoes.unshift(posicoes.pop());

    // Agora passamos pelos 3 cards no HTML e atualizamos as classes deles
    cards.forEach((card, index) => {
        // Limpa as classes antigas
        card.classList.remove('pos-esq', 'pos-cen', 'pos-dir');
        // Adiciona a nova classe baseada no nosso Array que girou
        card.classList.add(posicoes[index]);
    });
}

function iniciarAutoPlay() {
    intervaloCarrossel = setInterval(rodarCarrossel, 3000);
}

// Quando clicar em qualquer lugar da trilha, ele avança e zera o tempo
track.addEventListener('click', () => {
    clearInterval(intervaloCarrossel); 
    rodarCarrossel(); 
    iniciarAutoPlay(); 
});

// Dá o play inicial
iniciarAutoPlay();

// MODAL
const modal = document.querySelector('#modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');

openModal.onclick = () => modal.showModal();
closeModal.onclick = () => modal.close();

// CEP
const cep = document.querySelector('#cep')
const logradouro = document.querySelector('#logradouro');
const numero = document.querySelector('#numero');
const complemento = document.querySelector('#complemento');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const uf = document.querySelector('#uf');
const mensagemCPF = document.querySelector('#mensagem-cpf');
const mensagemCEP = document.querySelector('#mensagem-cep');

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
    };
};

// Validação de CPF
function validarCPF(cpf) {
    const calcularDigito = (base) => {
        let somatoria = 0;

        for (let i = 0; i < base.length; i++) {
            let constante = (base.length + 1) - i;
            somatoria += Number(base[i]) * constante;
        };
        const resto = somatoria % 11;
        return resto < 2 ? '0' : String(11 - resto);
    };
    
    const baseCPF = cpf.slice(0,9);
    const primeiroDigito = calcularDigito(baseCPF); 
    const segundoDigito = calcularDigito(baseCPF + primeiroDigito);

    const cpfCalculado = baseCPF + primeiroDigito + segundoDigito;
    return cpf === cpfCalculado;
};

const cpfInput = document.querySelector('#cpf');

cpfInput.addEventListener('input', (e) => {
    let cpfLimpo = e.target.value.replace(/\D/g,'').slice(0, 11); // Bloqueia letras e símbolos e limita até 11 caracteres
    
    //Máscara do CPF
    let cpfFormatado = cpfLimpo;
    cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2"); // primeiro ponto
    cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2"); // segundo ponto
    cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // traço
    
    // Devolve o cpf com a máscara para o input.
    e.target.value = cpfFormatado; 

    const cpfInvalido = /^(\d)\1{10}$/; // Bloqueia sequências repetidas

    if(cpfLimpo === "" || cpfLimpo.length < 11) {
        mensagemCPF.textContent= "";
        return;
    };
    
    if (cpfInvalido.test(cpfLimpo)) {
        mensagemCPF.textContent= `O CPF ${cpfFormatado} é inválido`;
        return;
    };
    
    if (validarCPF(cpfLimpo)) {
        mensagemCPF.textContent= "CPF válido";
        mensagemCPF.style.color= "green";
    } else {
        mensagemCPF.textContent= `O CPF ${cpfFormatado} é inválido`;
        mensagemCPF.style.color= "red";
    }
});

// Validação de senha
const senha = document.querySelector('#password');
const senhaConfirmacao = document.querySelector('#passwordconfirm');
const mensagemCaracteres = document.querySelector('#mensagem-caracteres');
const mensagemLetrasNumeros = document.querySelector('#mensagem-letrasNumeros');
const mensagemMaiusculasMinusculas = document.querySelector('#mensagem-maiusculasMinusculas');
const mensagemEspecial = document.querySelector('#mensagem-especial');
const mensagemConfirmacao = document.querySelector('#mensagem-confirmacao');

const regrasSenha = [
    {
        elemento: mensagemCaracteres,
        valida: (senha) => senha.length >= 8
    },
    {
        elemento: mensagemLetrasNumeros,
        valida: (senha) => (/[a-z]/i.test(senha) && /\d/.test(senha))
    },
    {
        elemento: mensagemMaiusculasMinusculas,
        valida: (senha) => (/[a-z]/.test(senha) && /[A-Z]/.test(senha))
    },
    {
        elemento: mensagemEspecial,
        valida: (senha) => /[\/*\-+.!@#$&]/.test(senha)
    }
];

function validarSenha(senha) {  
    if (senha === "") {
        regrasSenha.forEach(regra => regra.elemento.classList.remove('valido'));
        return;
    }

    regrasSenha.forEach(regra => {
        const passouNaRegra = regra.valida(senha);
        regra.elemento.classList.toggle('valido', passouNaRegra);
    });
}

senha.addEventListener('input', (e) => {
    validarSenha(e.target.value);
});


// Confirmação de senha
senhaConfirmacao.addEventListener('input', (e) => {
    confirmarSenhas();
});


function confirmarSenhas() {
    if (senhaConfirmacao.value === "") {
        mensagemConfirmacao.textContent = '';
        mensagemConfirmacao.classList.remove('valido', 'invalido');
        return;
    }
    
    if (senhaConfirmacao.value !== senha.value) {
        mensagemConfirmacao.textContent = 'As senhas não conferem.';
        mensagemConfirmacao.classList.add('invalido');
        mensagemConfirmacao.classList.remove('valido');
        return
    }
    
    mensagemConfirmacao.textContent = '';
    mensagemConfirmacao.classList.toggle('valido')
    mensagemConfirmacao.classList.add('valido');
    mensagemConfirmacao.classList.remove('invalido');
}

const nomeCompleto = document.querySelector('#fullname');
const mensagemNome = document.querySelector('#mensagem-nomeCompleto');

nomeCompleto.addEventListener('input', (e) => {
    validarNome(e.target.value);
});

function validarNome(nome){
    if(nome === ''){
        mensagemNome.textContent = '';
        mensagemNome.classList.remove('valido', 'invalido');
        return;
    }

    if(nome.length < 15){
        mensagemNome.textContent = 'O nome deve ter o mínimo de 15 caracteres.';
        mensagemNome.classList.add('invalido');
        return;
    }
    
    mensagemNome.textContent = '';
    mensagemNome.classList.remove('valido','invalido');
};

//Validacao de data de nascimento

const mensagemdataNascimento = document.querySelector('#mensagem-dataNascimento');

const dia = document.querySelector('#dia');
const mes = document.querySelector('#mes');
const ano = document.querySelector('#ano');

dia.addEventListener('input', validarMaioridade);
mes.addEventListener('input', validarMaioridade);
ano.addEventListener('input', validarMaioridade);

function validarMaioridade (){
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
        mensagemdataNascimento.textContent = 'Usuário menor de 18 anos.'
        mensagemdataNascimento.classList.add('invalido')
    } else {
        mensagemdataNascimento.textContent = ''
        mensagemdataNascimento.classList.remove('invalido')
        
    }
};

const login = document.querySelector('#login');
const mensagemLogin = document.querySelector('#mensagem-login');

login.addEventListener('input', (e) => {
    validarLogin(e.target.value);
});

function validarLogin(login){
    if(login === ''){
        // mensagemLogin.textContent = '';
        mensagemLogin.classList.remove('valido', 'invalido');
        return;
    }

    if(login.length < 6){
        // mensagemLogin.textContent = 'O login deve ter no mínimo 6 caracteres.';
        mensagemLogin.classList.add('invalido');
        return;
    }
    
    // mensagemLogin.textContent = '';
    mensagemLogin.classList.remove('invalido');
    mensagemLogin.classList.add('valido');
};

// Máscara de telefone e celular
const telefoneInput = document.querySelector('#telphone'); // Ajuste o ID conforme o seu HTML

telefoneInput.addEventListener('input', (e) => {
    // Remove tudo o que não for número
    let valor = e.target.value.replace(/\D/g, "");

    // Limita o máximo a 10 números (DDD + 8 dígitos)
    if (valor.length > 10) {
        valor = valor.substring(0, 10);
    }

    // Aplica a máscara progressivamente
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses no DDD e espaço
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");     // Coloca o hífen após o 4º dígito numérico

    // Devolve o valor formatado
    e.target.value = valor;
});

const celularInput = document.querySelector('#cellphone'); // Ajuste para o ID real do seu HTML

celularInput.addEventListener('input', (e) => {
    // Remove tudo o que não for número
    let valor = e.target.value.replace(/\D/g, "");

    // Limita o máximo a 11 números (DDD + 9 dígitos)
    if (valor.length > 11) {
        valor = valor.substring(0, 11);
    }

    // Aplica a máscara progressivamente
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses no DDD e espaço
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");     // Coloca o hífen após o 5º dígito numérico

    // Devolve o valor formatado
    e.target.value = valor;
});



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
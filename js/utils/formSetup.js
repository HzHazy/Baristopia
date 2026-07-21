export function iniciarFormSetup() {
    aplicarSelectData();
    aplicarSelectUF();

    // Chamamos a função logo ao iniciar o form
    verificarRascunho();

    // Inicializa a escuta do evento de envio do formulário
    configurarEnvioFormulario();

};

// Data de Nascimento
function aplicarSelectData(){
    const selectDia = document.querySelector('#dia');
    const selectMes = document.querySelector('#mes');
    const selectAno = document.querySelector('#ano');

    if (!selectDia || !selectMes || !selectAno) return;

    // Dias
    for (let i = 1; i <= 31; i++) {
        let dia = i < 10 ? '0' + i : i; 
        selectDia.add(new Option(dia, dia)); 
    }
    
    // Meses
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    for (let i = 0; i < 12; i++) {
        let valorMes = i + 1 < 10 ? '0' + (i + 1) : (i + 1); // Gera 01, 02, etc.
        selectMes.add(new Option(meses[i], valorMes)); 
    }

    // Anos
    const anoAtual = new Date().getFullYear(); // Pega o ano atual automaticamente
    for (let i = anoAtual; i >= 1930; i--) {
        selectAno.add(new Option(i, i));
    }
};

// Estados (UF)
function aplicarSelectUF(){
    const selectUf = document.querySelector('#uf');

    if (!selectUf) return;

    const ufs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
    ufs.forEach(sigla => {
    selectUf.add(new Option(sigla, sigla));
    });
};


// LocalStorage
// function configurarEnvioFormulario() {
//     // Captura o formulário pela classe que você definiu no HTML
//     const formCadastro = document.querySelector('.form');

//     // Se não encontrar o formulário (ex: o usuário está em outra página), a função para por aqui
//     if (!formCadastro) return;

//     // Adiciona o ouvinte para o momento do envio (submit)
//     formCadastro.addEventListener('submit', function (evento) {
        
//         // Evita que a página recarregue ao clicar em enviar
//         evento.preventDefault();

//         // 1. Coleta os valores essenciais digitados pelos IDs do HTML
//         const nome = document.getElementById('fullname').value;
//         const apelido = document.getElementById('nickname').value;
//         const email = document.getElementById('email').value;
//         const senha = document.getElementById('password').value;
//         const senhaConfirm = document.getElementById('passwordconfirm').value;

//         // 2. Validação básica (verifica se as senhas são iguais)
//         if (senha !== senhaConfirm) {
//             return; // Interrompe o processo se as senhas forem diferentes
//         }

//         // 3. Monta o objeto com os dados que serão salvos
//         const usuarioBaristopia = {
//             nome: nome,
//             apelido: apelido,
//             email: email,
//             senha: senha
//         };

//         // 4. Salva no localStorage (JSON.stringify converte o objeto para texto)
//         localStorage.setItem('dadosUsuario', JSON.stringify(usuarioBaristopia));
        
//         // 5. Feedback visual e limpeza
//         formCadastro.reset(); // Limpa todos os campos do formulário
//     });
// }

// LocalStorage e Feedback de Envio
function configurarEnvioFormulario() {
    const formCadastro = document.querySelector('.form');

    if (!formCadastro) return;

    formCadastro.addEventListener('submit', function (evento) {
        evento.preventDefault();

        // 1. Coleta os valores digitados
        const nome = document.getElementById('fullname').value;
        const apelido = document.getElementById('nickname').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;
        const senhaConfirm = document.getElementById('passwordconfirm').value;

        // 2. Validação básica de senha
        if (senha !== senhaConfirm) {
            return; 
        }

        // 3. Monta o objeto com os dados
        const usuarioBaristopia = {
            nome: nome,
            apelido: apelido,
            email: email,
            senha: senha
        };

        // 4. Salva no localStorage definitivo
        localStorage.setItem('dadosUsuario', JSON.stringify(usuarioBaristopia));
        
        // 5. --- FEEDBACK VISUAL: SUBSTITUI O FORMULÁRIO POR UMA TELA DE SUCESSO ---
        // const cardCadastro = document.querySelector('.registration-card');
        
        // if (cardCadastro) {
        //     // Ajustando via JS o container pai para centralizar o conteúdo e remover espaços em branco extras
        //     cardCadastro.style.display = 'flex';
        //     cardCadastro.style.justifyContent = 'center';
        //     cardCadastro.style.alignItems = 'center';
        //     cardCadastro.style.minHeight = '40vh'; // Diminui a altura esticada
        //     cardCadastro.style.padding = '3rem 2rem'; // Dá um respiro interno harmônico
            
        //     cardCadastro.innerHTML = `
        //         <div class="feedback-sucesso-container" style="text-align: center; animation: fadeIn 0.5s ease-in-out;">
        //             <div class="sucesso-icone" style="font-size: 4.5rem; margin-bottom: 20px;">☕</div>
        //             <h2 class="subtitle" style="margin-bottom: 15px; font-size: 2rem;">Cadastro Realizado!</h2>
        //             <p style="font-size: 1.1rem; color: #555; margin-bottom: 35px; line-height: 1.6;">
        //                 Seja bem-vindo ao universo da Baristopia, <strong>${apelido || nome}</strong>!<br>
        //                 Sua conta foi criada com sucesso e você já faz parte do nosso ecossistema.
        //             </p>
        //             <div class="sucesso-botoes" style="display: flex; gap: 15px; justify-content: center;">
        //                 <a href="../pages/index.html" class="btn btn-secondary" style="text-decoration: none; display: flex; align-items: center; justify-content: center;">
        //                     Ir para o Início
        //                 </a>
        //                 <button type="button" id="btn-abrir-login-sucesso" class="btn btn-primary">
        //                     Fazer Login
        //                 </button>
        //             </div>
        //         </div>
        //     `;

        //     // Ativando o botão de Login
        //     const btnLoginSucesso = document.getElementById('btn-abrir-login-sucesso');
        //     if (btnLoginSucesso) {
        //         btnLoginSucesso.addEventListener('click', () => {
        //             // Busca o seu dialog do navBar.js pelo ID correto
        //             const modalLogin = document.getElementById('modal'); 
        //             if (modalLogin) {
        //                 modalLogin.showModal(); // Comando nativo do HTML para abrir a tag <dialog>
        //             }
        //         });
        //     }
        // }

        // 5. --- FEEDBACK VISUAL: SUBSTITUI O FORMULÁRIO POR UMA TELA DE SUCESSO ---
        const cardCadastro = document.querySelector('.registration-card');
        
        if (cardCadastro) {
            // Ajustando via JS o container pai para centralizar o conteúdo e remover espaços em branco extras
            cardCadastro.style.display = 'flex';
            cardCadastro.style.justifyContent = 'center';
            cardCadastro.style.alignItems = 'center';
            cardCadastro.style.minHeight = '40vh'; 
            cardCadastro.style.padding = '3rem 2rem'; 
            
            cardCadastro.innerHTML = `
                <div class="feedback-sucesso-container" style="text-align: center; animation: fadeIn 0.5s ease-in-out;">
                    <div class="sucesso-icone" style="font-size: 4.5rem; margin-bottom: 20px;">☕</div>
                    <h2 class="subtitle" style="margin-bottom: 15px; font-size: 2rem;">Cadastro Realizado!</h2>
                    <p style="font-size: 1.1rem; color: #555; margin-bottom: 35px; line-height: 1.6;">
                        Seja bem-vindo ao universo da Baristopia, <strong>${apelido || nome}</strong>!<br>
                        Sua conta foi criada com sucesso e você já faz parte do nosso ecossistema.
                    </p>
                    <div class="sucesso-botoes" style="display: flex; gap: 15px; justify-content: center;">
                        <a href="index.html" class="btn btn-sucesso-home" style="text-decoration: none; display: flex; align-items: center; justify-content: center; background-color: transparent; border: 1px solid #704214; color: #704214; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; transition: all 0.2s;">
                            Ir para o Início
                        </a>
                        <button type="button" id="btn-abrir-login-sucesso" class="btn btn-primary">
                            Fazer Login
                        </button>
                    </div>
                </div>
            `;

            // Ativando o botão de Login
            const btnLoginSucesso = document.getElementById('btn-abrir-login-sucesso');
            if (btnLoginSucesso) {
                btnLoginSucesso.addEventListener('click', () => {
                    const modalLogin = document.getElementById('modal'); 
                    if (modalLogin) {
                        modalLogin.showModal(); 
                    }
                });
            }
        }
    });
}


function verificarRascunho() {
    const rascunhoSalvo = localStorage.getItem('rascunhoCadastro');
    if (!rascunhoSalvo) return;

    const dados = JSON.parse(rascunhoSalvo);

    // Mapeamento dos campos
    const campos = {
        nome: document.getElementById('fullname'),
        email: document.getElementById('email'),
        dia: document.getElementById('dia'),
        mes: document.getElementById('mes'),
        ano: document.getElementById('ano')
    };

    // Preenchimento com checagem de existência
    if (campos.nome) campos.nome.value = dados.nome || '';
    if (campos.email) campos.email.value = dados.email || '';
    
    // Para selects, precisamos garantir que o valor exista nas opções
    if (campos.dia) campos.dia.value = dados.dia || '';
    if (campos.mes) campos.mes.value = dados.mes || '';
    if (campos.ano) campos.ano.value = dados.ano || '';
    
    console.log("Valores aplicados ao DOM com sucesso.");

    // Sexo
    setTimeout(() => {
        if (dados.sexo) {
            const radio = document.getElementById(dados.sexo);
            if (radio) radio.checked = true;
        }
    }, 150); 

    localStorage.removeItem('rascunhoCadastro');
}
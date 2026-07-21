// COMPONENTES VISUAIS
import './components/navbar.js'; // Roda automaticamente ao importar
import { iniciarModal, iniciarModalLogin } from './components/modal.js';
import { iniciarMenuUsuario } from './components/userMenu.js';
import { iniciarMiniForm } from './components/miniForm.js';
import { iniciarAcessibilidade } from './utils/accessibility.js'; //


// SERVIÇOS (APIs)
import { iniciarViaCep } from './services/viacep.js';

// UTILITÁRIOS E MÁSCARAS
import { iniciarFormSetup } from './utils/formSetup.js';
import { iniciarMascaraPhone } from './utils/masks.js';

// VALIDADORES
import { setupValidacaoMaioridade } from './utils/validators/ageValidator.js';
import { setupValidacaoCPF } from './utils/validators/cpfValidator.js';
import { setupValidacaoLogin } from './utils/validators/loginValidator.js';
import { setupValidacaoNome } from './utils/validators/nameValidator.js';
import { setupValidacaoForcaSenha, setupValidacaoConfirmacaoSenha } from './utils/validators/passwordValidator.js';

// Aguarda o HTML carregar e "liga" todas as funções
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa Componentes
    iniciarModal();
    iniciarModalLogin();
    iniciarMenuUsuario();
    iniciarMiniForm();

    // Inicializa Menu Acessibilidade
    iniciarAcessibilidade();

    // Inicializa Serviços
    iniciarViaCep();
    
    // Inicializa Utilitários
    iniciarFormSetup();
    iniciarMascaraPhone();

    // Inicializa Validações
    setupValidacaoCPF();
    setupValidacaoMaioridade();
    setupValidacaoLogin();
    setupValidacaoNome();
    setupValidacaoForcaSenha();
    setupValidacaoConfirmacaoSenha();
});

window.addEventListener('storage', (event) => {
    if (event.key === 'usuarioLogado') {
       window.location.reload();
    }
});
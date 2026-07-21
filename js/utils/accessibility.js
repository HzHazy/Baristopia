export function iniciarAcessibilidade() {
    // 1. Injeta o HTML e o CSS do menu flutuante diretamente no body
    const estilos = `
        <style>
            .barra-acessibilidade {
                position: fixed;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                background-color: #fff;
                border: 2px solid #704214;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 10px;
                z-index: 9999;
                transition: all 0.3s ease;
            }
            .btn-acessibilidade {
                background-color: #f7f5f0;
                border: 1px solid #dcd1c4;
                border-radius: 8px;
                padding: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            /* Ajuste de tamanho para os ícones SVG */
            .btn-acessibilidade img {
                width: 24px;
                height: 24px;
                transition: filter 0.2s ease;
            }
            /* Efeito hover nos botões */
            .btn-acessibilidade:hover {
                background-color: #704214;
                border-color: #704214;
            }
            /* Inverte a cor do ícone para branco quando passa o mouse (se o ícone original for escuro) */
            .btn-acessibilidade:hover img {
                filter: brightness(0) invert(1);
            }
            
            /* Regras Globais de Alto Contraste */
            body.alto-contraste, 
            body.alto-contraste main, 
            body.alto-contraste section, 
            body.alto-contraste header, 
            body.alto-contraste footer,
            body.alto-contraste div:not(.barra-acessibilidade) {
                background-color: #000000 !important;
                background-image: none !important;
                color: #ffffff !important;
            }
            body.alto-contraste p, 
            body.alto-contraste h1, 
            body.alto-contraste h2, 
            body.alto-contraste h3, 
            body.alto-contraste h4, 
            body.alto-contraste h5, 
            body.alto-contraste label, 
            body.alto-contraste li, 
            body.alto-contraste span {
                color: #ffff00 !important;
            }
            body.alto-contraste a, 
            body.alto-contraste button:not(.btn-acessibilidade), 
            body.alto-contraste input, 
            body.alto-contraste select {
                color: #00ffff !important;
                border-color: #ffff00 !important;
                background-color: #000000 !important;
            }
            body.alto-contraste video {
                opacity: 0.3;
            }
        </style>
    `;

    const menuHTML = `
        <div class="barra-acessibilidade" aria-label="Menu de Acessibilidade">
            <button class="btn-acessibilidade" id="acc-contraste" title="Alternar Alto Contraste">
                <img src="../assets/icons/contrast.svg" alt="Ícone de Contraste">
            </button>
            <button class="btn-acessibilidade" id="acc-aumentar" title="Aumentar Tamanho do Texto">
                <img src="../assets/icons/a-arrow-up.svg" alt="Ícone Aumentar Texto">
            </button>
            <button class="btn-acessibilidade" id="acc-diminuir" title="Diminuir Tamanho do Texto">
                <img src="../assets/icons/a-arrow-down.svg" alt="Ícone Diminuir Texto">
            </button>
            <button class="btn-acessibilidade" id="acc-normal" title="Restaurar Tamanho Padrão">
                <img src="../assets/icons/a-large-small.svg" alt="Ícone Tamanho Padrão">
            </button>
        </div>
    `;

    // Injeta os estilos e a estrutura no DOM
    document.head.insertAdjacentHTML('beforeend', estilos);
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    // 2. Variáveis de Controle de Estado
    let tamanhoAtual = parseInt(localStorage.getItem('acc-fonte')) || 100;
    const altoContrasteAtivo = localStorage.getItem('acc-contraste') === 'true';

    // Aplica o estado salvo anteriormente (persistência entre páginas)
    document.documentElement.style.fontSize = `${tamanhoAtual}%`;
    if (altoContrasteAtivo) {
        document.body.classList.add('alto-contraste');
    }

    // 3. Captura dos botões instalados
    const btnContraste = document.getElementById('acc-contraste');
    const btnAumentar = document.getElementById('acc-aumentar');
    const btnDiminuir = document.getElementById('acc-diminuir');
    const btnNormal = document.getElementById('acc-normal');

    // Lógica do Alto Contraste
    btnContraste.addEventListener('click', () => {
        const ativo = document.body.classList.toggle('alto-contraste');
        localStorage.setItem('acc-contraste', ativo);
    });

    // Lógica de Aumentar Fonte (Limite máximo de 140%)
    btnAumentar.addEventListener('click', () => {
        if (tamanhoAtual < 140) {
            tamanhoAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoAtual}%`;
            localStorage.setItem('acc-fonte', tamanhoAtual);
        }
    });

    // Lógica de Diminuir Fonte (Limite mínimo de 80%)
    btnDiminuir.addEventListener('click', () => {
        if (tamanhoAtual > 80) {
            tamanhoAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoAtual}%`;
            localStorage.setItem('acc-fonte', tamanhoAtual);
        }
    });

    // Lógica de Resetar Fonte para o padrão (100%)
    btnNormal.addEventListener('click', () => {
        tamanhoAtual = 100;
        document.documentElement.style.fontSize = `100%`;
        localStorage.setItem('acc-fonte', tamanhoAtual);
    });
}
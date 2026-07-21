export function iniciarMascaraPhone() {
    // Máscara de telefone e celular
    const telefoneInput = document.querySelector('#telphone'); // Ajuste o ID conforme o seu HTML
    const celularInput = document.querySelector('#cellphone'); // Ajuste para o ID real do seu HTML

    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número    
            
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
    }

    if (celularInput) {
        celularInput.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número    
    
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
    }
};

export function aplicarMascaraCPF(valor) {
    let cpfLimpo = valor.replace(/\D/g,'').slice(0, 11); // Bloqueia letras e símbolos e limita até 11 caracteres
    let cpfFormatado = cpfLimpo;
    
    cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2"); // primeiro ponto
    cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2"); // segundo ponto
    cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // traço
    
    return {cpfLimpo, cpfFormatado};
};


import { aplicarMascaraCPF } from '../masks.js';

export function setupValidacaoCPF() {
    const cpfInput = document.querySelector('#cpf');
    const mensagemCPF = document.querySelector('#mensagem-cpf');

    if(!cpfInput || !mensagemCPF) return;

    const validarCPF = (cpf) => {
        const calcularDigito = (base) => {
            let somatoria = 0;
            for (let i = 0; i < base.length; i++) {
                let constante = (base.length + 1) - i;
                somatoria += Number(base[i]) * constante;
            }
            const resto = somatoria % 11;
            return resto < 2 ? '0' : String(11 - resto);
        };
        
        const baseCPF = cpf.slice(0,9);
        const primeiroDigito = calcularDigito(baseCPF); 
        const segundoDigito = calcularDigito(baseCPF + primeiroDigito);
    
        return cpf === (baseCPF + primeiroDigito + segundoDigito);
    };
    
    cpfInput.addEventListener('input', (e) => {
        const {cpfLimpo, cpfFormatado} = aplicarMascaraCPF(e.target.value);
        e.target.value = cpfFormatado;
    
        const cpfInvalidoSequencia = /^(\d)\1{10}$/;
    
        if(cpfLimpo === "" || cpfLimpo.length < 11) {
            mensagemCPF.textContent= "";
            return;
        }
    
        if (cpfInvalidoSequencia.test(cpfLimpo) || !validarCPF(cpfLimpo) ) {
            mensagemCPF.textContent= `O CPF ${cpfFormatado} é inválido`;
            mensagemCPF.style.color= "red";
            return;
        }
        
        mensagemCPF.textContent= "CPF válido";
        mensagemCPF.style.color= "green";
    });
};
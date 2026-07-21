export function iniciarMiniForm() {
    const miniForm = document.getElementById('formulario'); // ID do seu formulário na index

    if (!miniForm) return;

    miniForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        // Coleta todos os dados, inclusive selects e radios
        const rascunho = {
            nome: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            dia: document.getElementById('dia').value,
            mes: document.getElementById('mes').value,
            ano: document.getElementById('ano').value,
            sexo: document.querySelector('input[name="sexo"]:checked')?.value
        };

        localStorage.setItem('rascunhoCadastro', JSON.stringify(rascunho));
        window.location.href = '../pages/form.html';
    });
}
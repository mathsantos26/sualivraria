// ===============================
// DADOS PADRÃO
// ===============================

const livrosPadrao = [
    {
        id: 1,
        nome: "Devocional Forte",
        categoria: "Devocionais",
        preco: "50,00",
        descricao: "Devocional muito bom que te aproxima de Deus.",
        imagem: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"
    }
];

// ===============================
// CARREGAR LIVROS
// ===============================

// Se o admin nunca salvou nada, usa os padrão.
// Se o admin já salvou (mesmo vazio), respeita o storage.
let livros;
const dadosSalvos = localStorage.getItem("livros");

if (dadosSalvos !== null) {
    livros = JSON.parse(dadosSalvos);
} else {
    livros = livrosPadrao;
}

// ===============================
// ELEMENTOS
// ===============================

const catalogoBiblias    = document.getElementById("catalogo-biblias");
const catalogoDevocionais = document.getElementById("catalogo-devocionais");
const catalogoLivros     = document.getElementById("catalogo-livros");
const busca              = document.getElementById("busca");
const semResultados      = document.getElementById("sem-resultados");
const termoBuscado       = document.getElementById("termo-buscado");

// ===============================
// RENDERIZAR
// ===============================

function renderizarLivros() {

    catalogoBiblias.innerHTML    = "";
    catalogoDevocionais.innerHTML = "";
    catalogoLivros.innerHTML     = "";

    const termo = busca ? busca.value.toLowerCase().trim() : "";

    let totalVisiveis = 0;

    livros.forEach(livro => {

        // Filtro de busca
        if (termo && !livro.nome.toLowerCase().includes(termo) && !livro.descricao.toLowerCase().includes(termo)) {
            return;
        }

        totalVisiveis++;

        // Monta a URL do WhatsApp com codificação correta
        const mensagem = encodeURIComponent(
            `Olá! Gostaria de comprar o livro "${livro.nome}" que vi no site.`
        );
        const linkWpp = `https://wa.me/5589981427000?text=${mensagem}`;

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${livro.imagem}" alt="${livro.nome}" loading="lazy">
            <div class="card-content">
                <div class="categoria">${livro.categoria}</div>
                <h3>${livro.nome}</h3>
                <p class="descricao">${livro.descricao}</p>
                <div class="preco"><span>R$</span> ${livro.preco}</div>
                <a class="btn-whatsapp" href="${linkWpp}" target="_blank" rel="noopener">
                    Comprar pelo WhatsApp
                </a>
            </div>
        `;

        if (livro.categoria === "Bíblias") {
            catalogoBiblias.appendChild(card);
        } else if (livro.categoria === "Devocionais") {
            catalogoDevocionais.appendChild(card);
        } else {
            catalogoLivros.appendChild(card);
        }

    });

    // Ocultar seções sem produtos
    document.getElementById("secao-biblias")
        .setAttribute("data-vazio", catalogoBiblias.children.length === 0 ? "true" : "false");

    document.getElementById("secao-devocionais")
        .setAttribute("data-vazio", catalogoDevocionais.children.length === 0 ? "true" : "false");

    document.getElementById("secao-livros")
        .setAttribute("data-vazio", catalogoLivros.children.length === 0 ? "true" : "false");

    // Mensagem de nenhum resultado
    if (totalVisiveis === 0 && termo) {
        semResultados.style.display = "block";
        termoBuscado.textContent = busca.value.trim();
    } else {
        semResultados.style.display = "none";
    }
}

// ===============================
// BUSCA
// ===============================

if (busca) {
    busca.addEventListener("input", renderizarLivros);
}

// ===============================
// INICIAR
// ===============================

renderizarLivros();

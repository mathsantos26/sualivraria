import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAJ-CiFqg4EmyAVCzCbVuZQk3Y1eFaOsPA",
    authDomain: "sualivraria-47ded.firebaseapp.com",
    projectId: "sualivraria-47ded",
    storageBucket: "sualivraria-47ded.firebasestorage.app",
    messagingSenderId: "874657666455",
    appId: "1:874657666455:web:10101be0d62c7bae8b60d2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const catalogoBiblias     = document.getElementById("catalogo-biblias");
const catalogoDevocionais = document.getElementById("catalogo-devocionais");
const catalogoLivros      = document.getElementById("catalogo-livros");
const busca               = document.getElementById("busca");
const semResultados       = document.getElementById("sem-resultados");
const termoBuscado        = document.getElementById("termo-buscado");

let livrosCache = [];

function renderizarLivros(livros) {
    catalogoBiblias.innerHTML     = "";
    catalogoDevocionais.innerHTML = "";
    catalogoLivros.innerHTML      = "";

    const termo = busca ? busca.value.toLowerCase().trim() : "";
    let totalVisiveis = 0;

    livros.forEach(livro => {
        if (termo && !livro.nome.toLowerCase().includes(termo) && !livro.descricao.toLowerCase().includes(termo)) {
            return;
        }
        totalVisiveis++;

        const mensagem = encodeURIComponent(`Olá! Gostaria de comprar o livro "${livro.nome}" que vi no site.`);
        const linkWpp  = `https://wa.me/5589981427000?text=${mensagem}`;

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${livro.imagem || 'https://via.placeholder.com/300x400?text=Sem+foto'}" alt="${livro.nome}" loading="lazy">
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

    document.getElementById("secao-biblias").setAttribute("data-vazio", catalogoBiblias.children.length === 0 ? "true" : "false");
    document.getElementById("secao-devocionais").setAttribute("data-vazio", catalogoDevocionais.children.length === 0 ? "true" : "false");
    document.getElementById("secao-livros").setAttribute("data-vazio", catalogoLivros.children.length === 0 ? "true" : "false");

    if (totalVisiveis === 0 && termo) {
        semResultados.style.display = "block";
        termoBuscado.textContent = busca.value.trim();
    } else {
        semResultados.style.display = "none";
    }
}

if (busca) {
    busca.addEventListener("input", () => renderizarLivros(livrosCache));
}

onSnapshot(collection(db, "livros"), (snapshot) => {
    livrosCache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderizarLivros(livrosCache);
});
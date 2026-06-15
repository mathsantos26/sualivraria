// ===============================
// DADOS PADRÃO
// ===============================

const livrosPadrao = [

{
    id:1,
    nome:"Devocional Forte",
    categoria:"Devocionais",
    preco:"50,00",
    descricao:"Devocional muito bom e que te aproxima de Deus.",
    imagem:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"
}

];

// ===============================
// CARREGAR LIVROS
// ===============================

let livros =
JSON.parse(localStorage.getItem("livros")) ||
livrosPadrao;

// ===============================
// ELEMENTOS
// ===============================

const catalogoBiblias =
document.getElementById("catalogo-biblias");

const catalogoDevocionais =
document.getElementById("catalogo-devocionais");

const catalogoLivros =
document.getElementById("catalogo-livros");

const busca =
document.getElementById("busca");

// ===============================
// SALVAR
// ===============================

function salvarLivros(){

    localStorage.setItem(
        "livros",
        JSON.stringify(livros)
    );

}

// ===============================
// RENDERIZAR
// ===============================

function renderizarLivros(){

    catalogoBiblias.innerHTML = "";
    catalogoDevocionais.innerHTML = "";
    catalogoLivros.innerHTML = "";

    const termo =
    busca ?
    busca.value.toLowerCase() :
    "";

    livros.forEach(livro=>{

        if(
            !livro.nome.toLowerCase().includes(termo)
        ){
            return;
        }

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

        <img src="${livro.imagem}" alt="${livro.nome}">

        <div class="card-content">

            <div class="categoria">
                ${livro.categoria}
            </div>

            <h3>
                ${livro.nome}
            </h3>

            <div class="descricao">
                ${livro.descricao}
            </div>

            <div class="preco">
                R$ ${livro.preco}
            </div>

            <a
            class="btn-whatsapp"
            target="_blank"
            href="https://wa.me/5589981427000?text=Olá! Gostaria de comprar o livro ${livro.nome} que vi no site.">

            Comprar pelo WhatsApp

            </a>

        </div>

        `;

        if(livro.categoria === "Bíblias"){

            catalogoBiblias.appendChild(card);

        }

        else if(livro.categoria === "Devocionais"){

            catalogoDevocionais.appendChild(card);

        }

        else{

            catalogoLivros.appendChild(card);

        }

    });

}

// ===============================
// BUSCA
// ===============================

if(busca){

    busca.addEventListener(
        "keyup",
        renderizarLivros
    );

}

// ===============================
// INICIAR
// ===============================

renderizarLivros();
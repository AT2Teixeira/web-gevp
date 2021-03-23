const items = [
    {
        id: 0,
        nome: 'Camisa',
        img: 'imagem.jpg',
        quantidade: 0,
    },
    {
        id: 1,
        nome: 'Sapatilhas',
        img: 'imagem.jpg',
        quantidade: 0
    },
    {
        id: 2,
        nome: 'Relogio',
        img: 'imagem.jpg',
        quantidade: 0
    }
]

inicializarLoja = () => {
    var containerProdutos = document.getElementById("produtos");
    
    items.map((val) => {
        containerProdutos.innerHTML+= `
        <div class="produto-single">
            <img src="/${val.img}"/>
            <p>${val.nome}</p>
            <a key="${val.id}" class="carrinhoLink" href="#" onclick="return false;">Adicionar ao carrinho</a>
        </div>
        `;
    });
}

inicializarLoja();

function updateCarrinho() {
    const nomeProdutos = document.querySelectorAll("textarea");

    const produtos = [];

    nomeProdutos.forEach((note) => {
        produtos.push(note.value);
    });

    localStorage.setItem("produtos", JSON.stringify(produtos));
}
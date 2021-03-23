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


atualizarCarrinho = () => {
    var containerCarrinho = document.getElementById("carrinho");
    containerCarrinho.innerHTML = "";

    items.map((val) => {
        if(val.quantidade > 0){
            containerCarrinho.innerHTML+= `
            <div class="info-single-checkout">
                <p style="float:left;">Produto: ${val.nome}</p>
                <p style="float:right";>Quantidade: ${val.quantidade}</p>
                <div style="clear:both"></div>
            </div>
        `;
        }
    });
}

var links = document.getElementsByClassName('carrinhoLink');

for(var i = 0; i < links.length; i++){
    links[i].addEventListener("click", function(){
        let key = this.getAttribute('key');

        items[key].quantidade++
        atualizarCarrinho();
        return null;
    })
}
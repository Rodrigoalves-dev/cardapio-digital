let total=0

function adicionarAoCarrinho(item) {
const lista = document.getElementById("lista-carrinho");
const novoItem = document.createElement("li");
novoItem.classList.add("item-carrinho")

// Cria o texto do item
const texto = document.createElement("span");
texto.textContent = item;

//Extrai o valor numérico do item
const valorTexto = item.match(/R\$\s?(\d+(?:,\d{2})?)/);
const valor = valorTexto ? parseFloat(valorTexto[1].replace(',','.')) : 0;
total+=valor

// Cria o botão de remover
const botaoRemover = document.createElement("button");
botaoRemover.textContent = "Remover";
botaoRemover.style.backgroundColor = "red";
botaoRemover.style.marginLeft = "10px";
botaoRemover.style.padding = "4px 8px";
botaoRemover.style.cursor = "pointer";
botaoRemover.style.color = "white";
botaoRemover.style.border = "none";
botaoRemover.style.borderRadius = "4px";
botaoRemover.classList.add("remover")

botaoRemover.onclick = function () {
    lista.removeChild(novoItem);
    total -= valor;
    atualizarTotal();
};

novoItem.appendChild(texto);
novoItem.appendChild(botaoRemover)
lista.appendChild(novoItem);

atualizarTotal();
}
function atualizarTotal() {
    document.getElementById("total").textContent=total.toFixed(2).replace('.',',')
}

function finalizarCompra() {
    const itens=document.querySelectorAll(".item-carrinho span");
    if (itens.length===0) {
        alert("Seu carrinho está vazio!");
        return;
    }

//Monta a Mensagem
let mensagem="Olá, gostaria de fazer o seguinte pedido:\n";
itens.forEach((item, index)=>{
    mensagem += `${index + 1}.${item.textContent}\n`;
});

//Codifica a mensagem para URL
const mensagemCodificada = encodeURIComponent(mensagem);
    
// Número do WhatsApp com DDD (ex: 5592984158278)
const numero = "5592984158278";
const url = `https://wa.me/${numero}?text=${mensagemCodificada}`;

// Limpa o carrinho
document.getElementById("lista-carrinho").innerHTML = "";
total = 0;
atualizarTotal();

// Redireciona para o WhatsApp
window.location.href = url;
}
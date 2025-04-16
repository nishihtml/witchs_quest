let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

/////BACKGOUND

/////PLAYER OVERWORLD

let player = {
    x: 375,
    y: 250,
    size: 50,
    img: new Image(),
    desenha: function(){
        this.img.src = 'player_front.gif';
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, 3*this.size, 3*this.size);
        ctx.closePath();
    }
}

function animacao(){
    ctx.clearRect(0,0,900,900);
    player.desenha();
    requestAnimationFrame(animacao);
}

animacao()

document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla);

    let velocidade = 4;
    if(tecla == 'ArrowUp'){
        player.y -= velocidade;
        player.img.src = 'witch_back1.png'
    }
    if(tecla == 'ArrowDown'){
        player.y += velocidade
    }
    if(tecla == 'ArrowLeft'){
        player.x -= velocidade
    }
    if(tecla == 'ArrowRight'){ 
        player.x += velocidade}
})

//////BATTLE
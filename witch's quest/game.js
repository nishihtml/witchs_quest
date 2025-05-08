let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let map_test = {
    x: 0,
    y: 0,
    tamanho: 800,
    img: new Image(),
    desenha: function(){
        this.img.src = 'map_test.png';
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.tamanho*2, this.tamanho);
        ctx.closePath();
    }
}

let player = {
    sx: 0,
    sy: 0,
    x: 100,
    y: 550,
    size: 150,
    img: new Image(),
    desenha: function(){
        this.img.src = "witch_spritesheet.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.size * this.sx, this.size * this.sy, this.size, this.size, this.x, this.y, this.size, this.size);
        ctx.closePath();
    }
}

// se sy = 0, o personagem esta virado para direita
// se sy = 1, o personagem esta virado para esquerda


const CHAO_Y = 750;
let velocidade = 2;
let velocidade_pulo = 4;
let gravidade = 3;

let limite_pulo = 0;
let frame = 0;
let if_frame = 24;

let andar_direita = false;
let andar_esquerda = false;
let correr = false;
let pular = false;
let cair = false;
let onground = true;
let pulos_realizados = 0;
let max_pulos = 2;

player.sx = 1;

document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla);

    if(tecla === 'Shift'){ 
        correr = true;
    }
    if(correr){
        velocidade = 4;
        if_frame = 12;
    }

    if(tecla === 'ArrowRight'){
        andar_direita = true;
        andar_esquerda = false;
    }
    if(tecla === 'ArrowLeft'){
        andar_esquerda = true;
        andar_direita = false;
    }

    if(tecla === 'ArrowUp' && pulos_realizados < max_pulos){
        pular = true;
        limite_pulo = 0;
        pulos_realizados++;
    }
});

document.addEventListener('keyup', function(evento){
    let tecla_solta = evento.key;
    console.log(tecla_solta);

    if(tecla_solta === 'ArrowRight'){
        andar_direita = false;
        player.sx = 1;
    }

    if(tecla_solta === 'ArrowLeft'){
        andar_esquerda = false;
        player.sx = 1;
    }

    if(tecla_solta === 'Shift'){
        correr = false;
        velocidade = 2;
        if_frame = 24;
    }
});

function animacao(){    
    ctx.clearRect(0, 0, 1600, 800);

    map_test.desenha();
    player.desenha();

    // Movimento horizontal
    if(andar_direita){
        player.x += velocidade;
        player.sy = 0;
        frame++;
        if(frame >= if_frame){
            player.sx = (player.sx === 1) ? 2 : 1;
            frame = 0;
        }
    }

    if(andar_esquerda){
        player.x -= velocidade;
        player.sy = 1;
        frame++;
        if(frame >= if_frame){
            player.sx = (player.sx === 1) ? 2 : 1;
            frame = 0;
        }
    }

    // Pulo
    if(pular){
        player.y -= velocidade_pulo;
        player.sx = 3;
        limite_pulo += velocidade_pulo;
        if(limite_pulo >= 120){
            pular = false;
            cair = true;
        }
    }

    // Gravidade (cair)
    if(player.y + player.size < CHAO_Y){
        cair = true;
        onground = false;
    } else {
        cair = false;
        onground = true;
        pulos_realizados = 0; // reset double jump
        player.y = CHAO_Y - player.size; // manter alinhado ao chão
    }

    if(cair && !pular){
        player.y += gravidade;
        player.sx = 3;
    }

    requestAnimationFrame(animacao);
}

animacao();

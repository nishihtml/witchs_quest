let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let map_test = {
    x: 0,
    y: 0,
    tamanho: 800,
    img: new Image(),
    desenha: function(){
        this.img.src = '../dataset/map_test.png';
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.tamanho*2, this.tamanho);
        ctx.closePath();
    }
}

let player = {
    sx: 0,
    sy: 0,
    x: 100,
    y: 700,
    size: 150,
    img: new Image(),
    desenha: function(){
        this.img.src = "../dataset/witch_spritesheet.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.size * this.sx, this.size * this.sy, this.size, this.size, this.x, this.y, this.size, this.size);
        ctx.closePath();
    }
}

// hitbox do player
//let player_hitbox = {
//    esquerda: player.x + 50,
//    direita: player.x + player.size - 50,
//    cima: player.y + 16,
//    baixo: player.y + player.size
//}

// se sy = 0, o personagem esta virado para direita
// se sy = 1, o personagem esta virado para esquerda


let frame = 0;
let if_frame = 24;
let andar_direita = false;
let andar_esquerda = false;
let andar_cima = false;
let andar_baixo = false;
let correr = false;

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
        andar_direita = false;
        andar_esquerda = true;
    }
    if(tecla === 'ArrowUp'){
        andar_cima = true;
        andar_baixo = false
    }
    if(tecla === 'ArrowDown'){
        andar_cima = false;
        andar_baixo = true
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
    if(tecla_solta === 'ArrowUp'){
        andar_cima = false;
        player.sx = 1;
    }

    if(tecla_solta === 'ArrowDown'){
        andar_baixo = false;
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

    player.desenha();

    // Movimento
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
    }if(andar_cima){
        player.x -= velocidade;
        player.sy = 0;
        frame++;
        if(frame >= if_frame){
            player.sx = (player.sx === 1) ? 2 : 1;
            frame = 0;
        }
    }
    if(andar_baixo){
        player.x += velocidade;
        player.sy = 1;
        frame++;
        if(frame >= if_frame){
            player.sx = (player.sx === 1) ? 2 : 1;
            frame = 0;
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

    //teste
    if(player.x + 50 <= 0){
        player.x = -50
    }

    if(player.x - 50 >= 1450){
        player.x = 1500
    }

    requestAnimationFrame(animacao);
}

animacao();

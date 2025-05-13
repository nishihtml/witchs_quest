let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let player = {
    sx: 1,
    sy: 0,
    x: 400,
    y: 400,
    size: 100,
    img: new Image(),
    desenha: function(){
        this.img.src = "../dataset/player_sprite.png";
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

let velocidade = 2
let frame = 0;
let if_frame = 24;
let andar_direita = false;
let andar_esquerda = false;
let andar_cima = false;
let andar_baixo = false;
let correr = false;
let animacao_vertical = 0

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
        animacao_vertical = 0
    }

    if(tecla_solta === 'ArrowDown'){
        andar_baixo = false;
        player.sx = 1;
        animacao_vertical = 0
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
    if(andar_direita == true){
        player.x += velocidade;
        player.sy = 2;
        frame += 1
        if(frame >= if_frame && player.sx == 1){
            player.sx = 2
            frame = 0
        }
        if(frame >= if_frame && player.sx == 2){
            player.sx = 1
            frame = 0
        }
    }
    if(andar_esquerda == true){
        player.x -= velocidade;
        player.sy = 1;
        frame += 1
        if(frame >= if_frame && player.sx == 1){
            player.sx = 2
            frame = 0
        }
        if(frame >= if_frame && player.sx == 2){
            player.sx = 1
            frame = 0
        }
    }
    if(andar_cima == true){
        player.y -= velocidade;
        player.sy = 3;
        frame += 1
        if(frame >= if_frame && player.sx == 1 && animacao_vertical == 0){
            player.sx = 2
            frame = 0
        }
        if(frame >= if_frame && player.sx == 2 && animacao_vertical == 0){
            player.sx = 1
            frame = 0
            animacao_vertical = 1
        }
        if(frame >= if_frame && player.sx == 1 && animacao_vertical == 1){
            player.sx = 3
            frame = 0
        }
        if(frame >= if_frame && player.sx == 3 && animacao_vertical == 1){
            player.sx = 1
            frame = 0
            animacao_vertical = 0
        }
    }
    if(andar_baixo == true){
        player.y += velocidade;
        player.sy = 0;
        frame += 1
        if(frame >= if_frame && player.sx == 1 && animacao_vertical == 0){
            player.sx = 2
            frame = 0
        }
        if(frame >= if_frame && player.sx == 2 && animacao_vertical == 0){
            player.sx = 1
            frame = 0
            animacao_vertical = 1
        }
        if(frame >= if_frame && player.sx == 1 && animacao_vertical == 1){
            player.sx = 3
            frame = 0
        }
        if(frame >= if_frame && player.sx == 3 && animacao_vertical == 1){
            player.sx = 1
            frame = 0
            animacao_vertical = 0
        }
    }

    requestAnimationFrame(animacao);
}

animacao();

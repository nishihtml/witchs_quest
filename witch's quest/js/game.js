let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let jogo = true

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

let enemy = {
    sx: 1,
    sy: 0,
    x: 0,
    y: 0,
    size: 100,
    img: new Image(),
    desenha: function(){
        this.img.src = "../dataset/enemy_sprite.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.size * this.sx, this.size * this.sy, this.size, this.size, this.x, this.y, this.size, this.size);
        ctx.closePath();
    }
}

// hitbox do player
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
let player_vida = 3;
let correr = false;
let animacao_vertical = 0;

let enemy_frame = 0
let enemy_if_frame = 48
let enemy_velocidade = 1
let enemy_vida = 2

let empurrado = false
let tempo_empurro = 0

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

    //PLAYER
    if(andar_direita == true || andar_esquerda == true || andar_cima == true || andar_baixo == true){
        frame += 1
    }
    player.desenha();
    if(andar_direita == true){
        player.x += velocidade;
        player.sy = 2;
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

    //ENEMY

    enemy.desenha()
    if(player.x > enemy.x){
        enemy.x += enemy_velocidade
        enemy.sy = 1 
    }
    if(player.x < enemy.x){
        enemy.x -= enemy_velocidade
        enemy.sy = 0
    }
    if(player.y > enemy.y){
        enemy.y += enemy_velocidade
    }
    if(player.y < enemy.y){
        enemy.y -= enemy_velocidade
    }
    enemy_frame += 1
    if(enemy_if_frame <= enemy_frame && enemy.sx == 1){
        enemy.sx = 2
        enemy_frame = 0
    }
    if(enemy_if_frame <= enemy_frame && enemy.sx == 2){
        enemy.sx = 1
        enemy_frame = 0
    }

    //COLLISÃO ENTRE PLAYER E ENEMY

    if(player.y < enemy.y + 150 && player.y + 150 > enemy.y || player.x < enemy.x + 150 && player.x + 150 > enemy.y){
        player.x = 400
        player.y = 400
    }
    
    requestAnimationFrame(animacao);
}

if(jogo = true){
    animacao();
}
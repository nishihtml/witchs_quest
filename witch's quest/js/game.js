let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let inicio = true
let jogo = false
let fim = false

let tutorial = {
    sx: 0,
    sy: 0,
    x: 0,
    y: 0,
    size: 800,
    img: new Image(),
    desenha: function(){
        this.img.src = "../dataset/tutorial.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.size * this.sx, this.size * this.sy, this.size, this.size, this.x, this.y, this.size, this.size);
        ctx.closePath();
    }
}

let botao = {
    sx: 0,
    sy: 0,
    x: 540,
    y: 670,
    size: 200,
    img: new Image(),
    desenha: function(){
        this.img.src = "../dataset/botao.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.size * this.sx, this.size * 0.4 * this.sy, this.size, this.size*0.4, this.x, this.y, this.size, this.size*0.4);
        ctx.closePath();
    }
}

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

class enemy{
    constructor(enemy_sx, enemy_sy, enemy_x, enemy_y, enemy_image){
        this.sx = enemy_sx,
        this.sy = enemy_sy,
        this.x = enemy_x,
        this.y = enemy_y,
        this.size = 100,
        this.img = new Image(),
        this.desenha = function(){
            this.img.src = enemy_image;
            ctx.beginPath();
            ctx.drawImage(this.img, this.size * this.sx, this.size * this.sy, this.size, this.size, this.x, this.y, this.size, this.size);
            ctx.closePath();
        }
    }
}

let enemy_1 = new enemy(1, 0, 0, 100, "../dataset/enemy_1_sprite.png")


let magia = {
    sx: 0,
    sy: 0,
    x: player.x + 30,
    y: player.y + 50,
    size: 40,
    img: new Image(),
    desenha: function(){
        this.img.src = "../dataset/bullet_sprite.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.size * this.sx, this.size * this.sy, this.size, this.size, this.x, this.y, this.size, this.size);
        ctx.closePath();
    }
}

let player_status = {
    sx: 0,
    sy: 0,
    x: 10,
    y: 10,
    size: 100,
    img: new Image(),
    desenha: function(){
        this.img.src = "../dataset/player_status.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.size * 4 * this.sx, this.size * 4 * this.sy, this.size * 4, this.size * 4, this.x, this.y, this.size, this.size);
        ctx.closePath();
    }
}

let gameover = {
    sx: 0,
    sy: 0,
    x: 0,
    y: 0,
    size: 800,
    img: new Image(),
    desenha: function(){
        this.img.src = "../dataset/gameover.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.size * this.sx, this.size * this.sy, this.size, this.size, this.x, this.y, this.size, this.size);
        ctx.closePath();
    }
}

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

let vida_player = 3
let vida_antiga = 3
let tempo_status = 0

let is_enemy_1 = false
let enemy_1_timer = 0
let enemy_1_spawn = Math.floor(Math.random() * 500)
let enemy_1_vida = 3
let enemy_1_invencibilidade = false
let enemy_1_parado = false
let tempo_enemy_1_parado = 0

let enemy_frame = 0
let enemy_if_frame = 48
let enemy_velocidade = 1

let enemy_frame_inv = 0
let enemy_tempo_inv = 0

let direcao_empurro = 0
let empurrado = false
let tempo_empurro = 0
let invencibilidade = false
let tempo_invencibilidade = 0
let player_parado = false
let tempo_parado = 0
let frame_dano = 1

let atacar = false

let player_caido = false
let tempo_caido = 0

let pontos = 0

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
    if(tecla === ' '){
        atacar = true
        andar_direita = false;
        andar_esquerda = false;
        andar_cima = false;
        andar_baixo = false
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

    ctx.clearRect(0, 0, 800, 800)
    
    //INICIO DO TUTORIAL---
    if(inicio == true){
        tutorial.desenha()
        botao.desenha()
        document.addEventListener('mousemove', function(evento){
            let rect = canvas.getBoundingClientRect()
            let x_mouse = evento.clientX - rect.left
            let y_mouse = evento.clientY - rect.top;

            if(x_mouse >= 540 && x_mouse <= 740 && y_mouse >= 670 && y_mouse <= 750){
                botao.sx = 1
            }
            else{
                botao.sx = 0
            }
        })
        canvas.addEventListener('click', (evento) => {
            let rect = canvas.getBoundingClientRect()
            let x_mouse = evento.clientX - rect.left;
            let y_mouse = evento.clientY - rect.top;

            if(x_mouse >= 540 && x_mouse <= 740 && y_mouse >= 670 && y_mouse <= 750){
                inicio = false
                jogo = true
            }
        });
    }
    //---FIM DO TUTORIAL

    //INICIO DO GAMEOVER---
    if(fim == true){
        gameover.desenha()
        botao.desenha()
        document.addEventListener('mousemove', function(evento){
            let rect = canvas.getBoundingClientRect()
            let x_mouse = evento.clientX - rect.left
            let y_mouse = evento.clientY - rect.top;

            if(x_mouse >= 540 && x_mouse <= 740 && y_mouse >= 670 && y_mouse <= 750){
                botao.sx = 1
            }
            else{
                botao.sx = 0
            }
        })
        canvas.addEventListener('click', (evento) => {
            let rect = canvas.getBoundingClientRect()
            let x_mouse = evento.clientX - rect.left;
            let y_mouse = evento.clientY - rect.top;

            if(x_mouse >= 540 && x_mouse <= 740 && y_mouse >= 670 && y_mouse <= 750){
                vida_player = 3
                player.x = 400
                player.y = 400
                player.sx = 1
                player.sy = 0
                player_status.sx = 0
                vida_player = 3
                vida_antiga = 3
                fim = false
                jogo = true
                empurrado = false
                player_parado = false
                player_caido = false
                invencibilidade = false
            }
        });
    }
    //---FIM DO GAMEOVER


    //INICIO DO JOGO---
    if(jogo == true){
        
        //CONDIÇÃO DE FIM DE JOGO
        if(player_caido == true){
            player.sx = 2
            player.sy = 4
            tempo_caido += 1
            player_parado = true
            andar_baixo = false
            andar_cima = false
            andar_direita = false
            andar_esquerda = false
            if(tempo_caido >= 120){
                tempo_caido = 0
                jogo = false
                fim = true
            }
        }

        //PLAYER
        if(andar_direita == true || andar_esquerda == true || andar_cima == true || andar_baixo == true){
            frame += 1
            if(frame >= if_frame && (player.sx == 1 || player.sx == 4) && animacao_vertical == 0){
                player.sx = 2
                frame = 0
            }
            if(frame >= if_frame && player.sx == 2 && animacao_vertical == 0){
                player.sx = 1
                frame = 0
                animacao_vertical = 1
            }
            if(frame >= if_frame && (player.sx == 1 || player.sx == 4) && animacao_vertical == 1){
                player.sx = 3
                frame = 0
            }
            if(frame >= if_frame && player.sx == 3 && animacao_vertical == 1){
                player.sx = 1
                frame = 0
                animacao_vertical = 0
            }
        }
        player.desenha();
        if(andar_direita == true && player_parado == false && atacar == false){
            player.x += velocidade;
            player.sy = 2;
            magia.x = player.x + 30
        }
        if(andar_esquerda == true && player_parado == false && atacar == false){
            player.x -= velocidade;
            player.sy = 1;
            magia.x = player.x + 30
        }
        if(andar_cima == true && player_parado == false && atacar == false){
            player.y -= velocidade;
            player.sy = 3;
            magia.y = player.y + 50
        }
        if(andar_baixo == true && player_parado == false && atacar == false){
            player.y += velocidade;
            player.sy = 0;
            magia.y = player.y + 50
        }

        //ENEMIES

        if(is_enemy_1 == false){
            enemy_1_timer += 1
            if (enemy_1_timer >= enemy_1_spawn){
                enemy_1.x = Math.floor(Math.random() * 700);
                enemy_1.y = Math.floor(Math.random() * 700);
                is_enemy_1 = true
            }
        }
        if(is_enemy_1 == true){
            enemy_1.desenha()
            enemy_frame += 1
            if(enemy_1.sx !== 3 && enemy_1_invencibilidade == false){
                if(player.x > enemy_1.x && (enemy_1_parado == false )){
                    enemy_1.x += enemy_velocidade
                    enemy_1.sy = 1 
                }
                if(player.x < enemy_1.x && (enemy_1_parado == false )){
                    enemy_1.x -= enemy_velocidade
                    enemy_1.sy = 0
                }
                if(player.y > enemy_1.y && (enemy_1_parado == false )){
                    enemy_1.y += enemy_velocidade
                }
                if(player.y < enemy_1.y && (enemy_1_parado == false )){
                    enemy_1.y -= enemy_velocidade
                }
            }
            if(enemy_if_frame <= enemy_frame && enemy_1.sx == 1  && enemy_1_invencibilidade == false){
                enemy_1.sx = 2
                enemy_frame = 0
            }
            if(enemy_if_frame <= enemy_frame && (enemy_1.sx == 2 || enemy_1.sx == 3) && enemy_1_invencibilidade == false){
                enemy_1.sx = 1
                enemy_frame = 0
            }
        }

        //COLLISÃO ENTRE PLAYER E ENEMY
        //PLAYER CIMA X ENEMY BAIXO          PLAYER BAIXO X ENEMY CIMA         PLAYER ESQUERDA X ENEMY DIREITA        PALYER DIREITA X ENEMY ESQUERDA
        if(player.y + 20 <= enemy_1.y + 100 && player.y + 100 >= enemy_1.y + 20 && player.x + 20 <= enemy_1.x - 20 + 100 && player.x - 20 + 100 >= enemy_1.x + 20 && invencibilidade == false){
            direcao_empurro = Math.floor(Math.random() * 3);
            empurrado = true
            invencibilidade = true
            vida_player -= 1
            andar_cima = false
            andar_baixo = false
            andar_direita = false
            andar_esquerda = false
            atacar = false
        }
        if(empurrado == true){
            player.sx = 1
            player.sy = 4
        }
        if(direcao_empurro == 0 && empurrado == true){
            tempo_empurro += 1
            player.x += 10
            magia.x += 10
        }
        if(direcao_empurro == 1 && empurrado == true){
            tempo_empurro += 1
            player.x -= 10
            magia.x -= 10
        }
        if(direcao_empurro == 2 && empurrado == true){
            tempo_empurro += 1
            player.y += 10
            magia.y += 10
        }
        if(direcao_empurro == 3 && empurrado == true){
            tempo_empurro += 1
            player.y -= 10
            magia.y -= 10
        }
        if(tempo_empurro >= 10){
            empurrado = false
            player_parado = true
            tempo_empurro = 0
        }
        if(player_parado == true){
            andar_cima = false
            andar_baixo = false
            andar_direita = false
            andar_esquerda = false
            tempo_parado += 1
            if(tempo_parado >= 10){
                player_parado = false
                tempo_parado = 0
            }
        }
        if(invencibilidade == true){
            tempo_invencibilidade += 1
            frame_dano += 1
            if(tempo_invencibilidade >= 300){
                invencibilidade = false
                tempo_invencibilidade = 0
                player.sx = 1
            }
            if(frame_dano >= if_frame /8 && player.sx !== 0 && invencibilidade == true){
                player.sx = 0
                frame_dano = 0
            }
            if(frame_dano >= if_frame /8 && player.sx == 0 && invencibilidade == true){
                player.sx = 1
                frame_dano = 0
            }
        }

        //ATAQUE DO PLAYER
        if(atacar == true && player_parado == false && empurrado == false){
            player.sx = 4
            andar_cima = false
            andar_baixo = false
            andar_direita = false
            andar_esquerda = false
            invencibilidade = false
            if(player.sy == 0){
                magia.sx = 0
                magia.sy = 0
                magia.desenha()
                magia.y += 4
            }
            if(player.sy == 1){
                magia.sx = 0
                magia.sy = 1
                magia.desenha()
                magia.x -= 4
            }
            if(player.sy == 2){
                magia.sx = 1
                magia.sy = 1
                magia.desenha()
                magia.x += 4
            }
            if(player.sy == 3){
                magia.sx = 1
                magia.sy = 0
                magia.desenha()
                magia.y -= 4
            }
        }

        //COLLISÃO ENTRE ATAQUE E INIMIGO
        if(magia.y <= enemy_1.y + 100 && magia.y + 40 >= enemy_1.y + 20 && magia.x <= enemy_1.x - 20 + 100 && magia.x + 40 >= enemy_1.x + 20  && enemy_1_parado == false && atacar == true){
            enemy_1_parado = true
            atacar = false
            player.sx = 1
            magia.x = player.x + 30
            magia.y = player.y + 50
        }
        if(enemy_1_parado == true){
            enemy_1_invencibilidade = true
            tempo_enemy_1_parado += 1
            if(tempo_enemy_1_parado >= 60){
                tempo_enemy_1_parado = 0
                if(enemy_1_vida <= 0){
                    is_enemy_1 = false
                    enemy_1.x = -100
                    enemy_1.y = -100
                    enemy_1_vida = 3
                    enemy_1_timer = 0
                    enemy_1_spawn = Math.floor(Math.random() * 500)
                }
            }
        }
        if(enemy_1_invencibilidade == true){
            enemy_tempo_inv += 1
            enemy_frame_inv += 1
            if(enemy_tempo_inv >= 300){
                enemy_1_invencibilidade = false
                enemy_tempo_inv = 0
                enemy_1.sx = 1
                enemy_1_parado = false
                enemy_1_vida -= 1
            }
            if(enemy_frame_inv >= enemy_if_frame /6 && enemy_1.sx !== 0 && enemy_1_invencibilidade == true){
                enemy_1.sx = 0
                enemy_frame_inv = 0
            }
            if(enemy_frame_inv >= enemy_if_frame /6 && enemy_1.sx == 0 && enemy_1_invencibilidade == true){
                enemy_1.sx = 3
                enemy_frame_inv = 0
            }
        }

        //COLLISÃO DE PAREDE
        if(player.x <= 0){
            player.x = 0
        }
        if(player.x >= 700){
            player.x = 700
        }
        if(player.y <= 0){
            player.y = 0
        }
        if(player.y >= 700){
            player.y = 700
        }
        if(magia.x <= 0){
            magia.x = 0
            atacar = false
            player.sx = 1
        }
        if(magia.x >= 760){
            magia.x = 760
            atacar = false
            player.sx = 1
        }
        if(magia.y <= 0){
            magia.y = 0
            atacar = false
            player.sx = 1
        }
        if(magia.y >= 761){
            magia.y = 761
            atacar = false
            player.sx = 1
        }

        //STATUS DO JOGADOR
        player_status.desenha()
        if(vida_player < vida_antiga){
            tempo_status += 1
            player_status.sx = 3
            if (tempo_status >= 48){
                vida_antiga -= 1
                tempo_status = 0
                if(vida_player == 2){
                    player_status.sx = 1
                }
                if(vida_player == 1){
                    player_status.sx = 2
                }
                if(vida_player <= 0){
                    player_status.sx = 4
                    player_caido = true
                }
            }
        }
    //---FIM DO JOGO
    }    
    requestAnimationFrame(animacao);
}
animacao()
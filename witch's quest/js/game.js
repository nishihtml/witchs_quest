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

let magia = {
    sx: 0,
    sy: 0,
    x: 0,
    y: 0,
    size: 40,
    img: new Image(),
    desenha: function(){
        this.img.src = "../dataset/bullet_sprite.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.size * this.sx, this.size * this.sy, this.size, this.size, this.x, this.y, this.size, this.size);
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

let enemy_frame = 0
let enemy_if_frame = 48
let enemy_velocidade = 1
let enemy_vida = 2

let direcao_empurro = 0
let empurrado = false
let tempo_empurro = 0
let invencibilidade = false
let tempo_invencibilidade = 0
let player_parado = false
let frame_dano = 0.5

let atacar = false
let bullet = false

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

    //INICIO DO GAMEOVER
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
                fim = false
                jogo = true
            }
        });
    }
    //FIM DO GAMEOVER


    //INICIO DO JOGO---
    if(jogo == true){
        //PLAYER
        if(andar_direita == true || andar_esquerda == true || andar_cima == true || andar_baixo == true){
            frame += 1
        }
        player.desenha();
        if(andar_direita == true && player_parado == false && atacar == false){
            player.x += velocidade;
            player.sy = 2;
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
        if(andar_esquerda == true && player_parado == false){
            player.x -= velocidade;
            player.sy = 1;
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
        if(andar_cima == true && player_parado == false){
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
        if(andar_baixo == true && player_parado == false){
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
        // if(player.x > enemy.x){
        //     enemy.x += enemy_velocidade
        //     enemy.sy = 1 
        // }
        // if(player.x < enemy.x){
        //     enemy.x -= enemy_velocidade
        //     enemy.sy = 0
        // }
        // if(player.y > enemy.y){
        //     enemy.y += enemy_velocidade
        // }
        // if(player.y < enemy.y){
        //     enemy.y -= enemy_velocidade
        // }
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
        //PLAYER CIMA X ENEMY BAIXO          PLAYER BAIXO X ENEMY CIMA         PLAYER ESQUERDA X ENEMY DIREITA        PALYER DIREITA X ENEMY ESQUERDA
        if(player.y + 20 <= enemy.y + 100 && player.y + 100 >= enemy.y + 20 && player.x + 20 <= enemy.x - 20 + 100 && player.x - 20 + 100 >= enemy.x + 20 && invencibilidade == false){
            direcao_empurro = Math.floor(Math.random() * 3);
            empurrado = true
            invencibilidade = true
            vida_player -= 1
        }
        if(empurrado == true){
            andar_cima = false
            andar_baixo = false
            andar_direita = false
            andar_esquerda = false
            player.sx = 1
            player.sy = 4
        }
        if(direcao_empurro == 0 && empurrado == true){
             tempo_empurro += 1
            player.x += 10
        }
        if(direcao_empurro == 1 && empurrado == true){
            tempo_empurro += 1
            player.x -= 10
        }
        if(direcao_empurro == 2 && empurrado == true){
            tempo_empurro += 1
            player.y += 10
        }
        if(direcao_empurro == 3 && empurrado == true){
            tempo_empurro += 1
            player.y -= 10
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
            tempo_empurro += 1
            if(tempo_empurro >= 10){
                player_parado = false
                tempo_empurro = 0
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
            if(frame_dano >= if_frame /8 && player.sx !== 0){
                player.sx = 0
                frame_dano = 0
            }
            if(frame_dano >= if_frame /8 && player.sx == 0){
                player.sx = 1
                frame_dano = 0
            }
        }

        //ATAQUE DO PLAYER
        // if(atacar == true && player_parado == false && empurrado == false && bullet == false){
        //     player.sx = 4
        //     andar_cima = false
        //     andar_baixo = false
        //     andar_direita = false
        //     andar_esquerda = false
        //     if(player.sy == 0){
        //         andar_cima = false
        //         andar_direita = false
        //         andar_esquerda = false
        //         magia.sx = 0
        //         magia.sy = 0
        //         magia.desenha()
        //         bullet == true
        //         magia.y += velocidade * 2.5
        //     }
        //     if(player.sy == 1){
        //         andar_baixo = false
        //         andar_cima = false
        //         andar_esquerda = false
        //         magia.sx = 0
        //         magia.sy = 1
        //         magia.desenha()
        //         bullet == true
        //         magia.x -= velocidade * 2.5
        //     }
        //     if(player.sy == 2){
        //         andar_baixo = false
        //         andar_cima = false
        //         andar_direita = false
        //         magia.sx = 1
        //         magia.sy = 1
        //         magia.desenha()
        //         bullet == true
        //         magia.x += velocidade * 2.5
        //     }
        //     if(player.sy == 3){
        //         andar_cima = false
        //         andar_direita = false
        //         andar_esquerda = false
        //         magia.sx = 1
        //         magia.sy = 0
        //         magia.desenha()
        //         bullet == true
        //         magia.y -= velocidade * 2.5
        //     }
        // }

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

        //CONDIÇÃO DE FIM DE JOGO
        if(vida_player <= 0){
            jogo = false
            fim = true
        }
        
    //FIM DO JOGO

    
    }    
    requestAnimationFrame(animacao);
}
animacao()
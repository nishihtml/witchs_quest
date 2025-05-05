
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

//////Player

let player = {
    sx: 0,
    sy: 0,
    x: 100,
    y: 750,
    size: 150,
    img: new Image(),
    desenha: function(){
        this.img.src = "witch_spritesheet.png";
        ctx.beginPath();
        ctx.drawImage(this.img, 0 + (this.size*this.sx), 0 + (this.size*this.sy), this.size, this.size,  this.x, this.y, this.size, this.size);
        ctx.closePath();
    }
}

function animacao(){
    ctx.clearRect(0,0,1200,1200);
    player.desenha();
    requestAnimationFrame(animacao);
}

animacao()

frame = 0
if_frame = 10
player.sx = 1
andar_direita = false
andar_esquerda = false
correr = false

document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla);

    let velocidade = 6;

    if(tecla == 'Shift'){ 
        correr = true
    }
    if(correr == true){
        velocidade = 12
        if_frame = 5
    }

    if(tecla == 'ArrowRight'){
        andar_direita = true
        andar_esquerda = false
    }
    if(andar_direita == true){ 
        player.x += velocidade;
        player.sx = player.sx;
        player.sy = 0;
        frame += 1;
        if(frame >= if_frame && player.sx == 2){
            player.sx = 1;
            frame = 0;
        }
        if(frame >= if_frame && player.sx == 1){
            player.sx = 2;
            frame = 0;
        }
    }

    if(tecla == 'ArrowLeft'){
        andar_esquerda = true
        andar_direita = false
    }
    if(andar_esquerda == true){
        player.x -= velocidade;
        player.sx = player.sx;
        player.sy = 1;
        frame += 1;
        if(frame >= if_frame && player.sx == 2){
            player.sx = 1;
            frame = 0;
        }
        if(frame >= if_frame && player.sx == 1){
            player.sx = 2;
            frame = 0;
        }
    }
})

document.addEventListener('keyup', function(evento){
    let tecla_solta = evento.key;
    console.log(tecla_solta);

    if(tecla_solta == 'ArrowRight'){
        andar_direita = false
        player.sx = 1
    }

    if(tecla_solta == 'ArrowLeft'){
        andar_esquerda = false
        player.sx = 1
    }

    if(tecla_solta == 'Shift'){
        correr = false
        velocidade = 6
        if_frame = 10
    }
})

/*
[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]*/
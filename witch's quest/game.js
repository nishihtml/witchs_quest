let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

/////PLAYER OVERWORLD

let player = {
    sx: 0,
    sy: 1,
    x: 375,
    y: 250,
    size: 50,
    img: new Image(),
    desenha: function(){
        this.img.src = "player_spritesheet.png";
        ctx.beginPath();
        ctx.drawImage(this.img, 0 + (256*this.sx), 0 + (256*this.sy), 256, 256,  this.x, this.y, 3*this.size, 3*this.size);
          ctx.closePath();
    }
}

function animacao(){
    ctx.clearRect(0,0,900,900);
    player.desenha();
    requestAnimationFrame(animacao);
}

animacao()

frame = 0
if_frame = 10
player.sx = 0

document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla);

    let velocidade = 6;
    if(tecla == 'ArrowUp'){
        player.y -= velocidade;
        player.sx = player.sx;
        player.sy = 0;
        frame += 1;
        if(frame == if_frame && player.sx == 0){
            player.sx = 1;
            frame = 0;
        }
        if(frame == if_frame && player.sx == 1){
            player.sx = 0;
            frame = 0;
        }
    }
    if(tecla == 'ArrowDown'){
        player.y += velocidade;
        player.sx = player.sx;
        player.sy = 1;
        frame += 1;
        if(frame == if_frame && player.sx == 0){
            player.sx = 1;
            frame = 0;
        }
        if(frame == if_frame && player.sx == 1){
            player.sx = 0;
            frame = 0;
        }
    }
    if(tecla == 'ArrowLeft'){
        player.x -= velocidade;
        player.sx = player.sx;
        player.sy = 2;
        frame += 1;
        if(frame == if_frame && player.sx == 0){
            player.sx = 1;
            frame = 0;
        }
        if(frame == if_frame && player.sx == 1){
            player.sx = 0;
            frame = 0;
        }
    }
    if(tecla == 'ArrowRight'){ 
        player.x += velocidade;
        player.sx = player.sx;
        player.sy = 3;frame += 1;
        if(frame == if_frame && player.sx == 0){
            player.sx = 1;
            frame = 0;
        }
        if(frame == if_frame && player.sx == 1){
            player.sx = 0;
            frame = 0;
        }
    }
})

//////BATTLE
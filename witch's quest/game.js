let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

/////PLAYER OVERWORLD

let player = {
    sx: 0,
    sy: 1,
    x: 375,
    y: 250,
    size: 40,
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
        if(frame >= if_frame && player.sx == 0){
            player.sx = 1;
            frame = 0;
        }
        if(frame >= if_frame && player.sx == 1){
            player.sx = 0;
            frame = 0;
        }
    }
    if(tecla == 'ArrowDown'){
        if(tecla == 'ArrowDown')
        player.y += velocidade;
        player.sx = player.sx;
        player.sy = 1;
        frame += 1;
        if(frame >= if_frame && player.sx == 0){
            player.sx = 1;
            frame = 0;
        }
        if(frame >= if_frame && player.sx == 1){
            player.sx = 0;
            frame = 0;
        }
    }
    if(tecla == 'ArrowLeft'){
        player.x -= velocidade;
        player.sx = player.sx;
        player.sy = 2;
        frame += 1;
        if(frame >= if_frame && player.sx == 0){
            player.sx = 1;
            frame = 0;
        }
        if(frame >= if_frame && player.sx == 1){
            player.sx = 0;
            frame = 0;
        }
    }
    if(tecla == 'ArrowRight'){ 
        player.x += velocidade;
        player.sx = player.sx;
        player.sy = 3;
        frame += 1;
        if(frame >= if_frame && player.sx == 0){
            player.sx = 1;
            frame = 0;
        }
        if(frame >= if_frame && player.sx == 1){
            player.sx = 0;
            frame = 0;
        }
    }
})



//////PLAYER STATS

level = 1
exp = 0
player_maxhp = 20
player_currenthp = player_maxhp
player_maxmp = 30
player_currentmp = player_maxmp
player_attack = 6
player_defense = 5
player_magic = 12
player_speed = 10

//////ENEMY STATS

class enemy {
    constructor(enemy_name, enemy_maxhp, enemy_attack, enemy_defense, enemy_speed, enemy_exp){
        this.enemy_name = enemy_name
        this.enemy_maxhp = enemy_maxhp
        this.enemy_attack = enemy_attack
        this.enemy_defense = enemy_defense
        this.enemy_speed = enemy_speed
        this.enemy_exp = enemy_exp
    }
}
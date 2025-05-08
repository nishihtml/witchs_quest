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
        ctx.drawImage(this.img, 0 + (this.size*this.sx), 0 + (this.size*this.sy), this.size, this.size,  this.x, this.y, this.size, this.size);
        ctx.closePath();
    }
}

// se sy = 0, o personagem esta virado para direita
// se sy = 1, o personagem esta virado para esquerda

velocidade = 2 //velocidade do player
velocidade_pulo = 4 //velocidade do pulo do player
limite_pulo = 0 //limite até onde o player pula. se o limite_pulo >= 120, o player para de movimentar para cima
frame = 0 //frame de animação do player
if_frame = 24//condição para mudar a imagem do jogador
player.sx = 1
andar_direita = false
andar_esquerda = false
correr = false
pular = false
cair = false
onground = true
ataque = false
dano_player = false

document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla);

    if(tecla == 'Shift'){ 
        correr = true
    }
    if(correr == true){
        velocidade = 4
        if_frame = 12
    }

    if(tecla == 'ArrowRight'){
        andar_direita = true
        andar_esquerda = false
    }
    if(tecla == 'ArrowLeft'){
        andar_esquerda = true
        andar_direita = false
    }
    if(tecla == 'ArrowUp' && pular == false){
        pular = true
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
        velocidade = 2
        if_frame = 24
    }
})

function animacao(){    
    ctx.clearRect(0,0,1600,800);

    map_test.desenha()

    player.desenha();

    if(pular == true){
        onground = false
        player.sx = 3;
        player.y -= velocidade_pulo;
        limite_pulo += velocidade_pulo;
        if(limite_pulo >= 120){
            pular = false
            limite_pulo = 0
            player.sx = 1
            cair = true
        }
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
    requestAnimationFrame(animacao);
}

animacao()
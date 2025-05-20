let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let inicio = true;
let jogo = false;
let fim = false;

let tutorial = {
  sx: 0,
  sy: 0,
  x: 0,
  y: 0,
  size: 800,
  img: new Image(),
  desenha: function() {
    this.img.src = "../dataset/tutorial.png";
    ctx.beginPath();
    ctx.drawImage(
      this.img,
      this.size * this.sx,
      this.size * this.sy,
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size
    );
    ctx.closePath();
  }
};

let botao = {
  sx: 0,
  sy: 0,
  x: 540,
  y: 670,
  size: 200,
  img: new Image(),
  desenha: function() {
    this.img.src = "../dataset/botao.png";
    ctx.beginPath();
    ctx.drawImage(
      this.img,
      this.size * this.sx,
      this.size * 0.4 * this.sy,
      this.size,
      this.size * 0.4,
      this.x,
      this.y,
      this.size,
      this.size * 0.4
    );
    ctx.closePath();
  }
};

let player = {
  sx: 1,
  sy: 0,
  x: 400,
  y: 400,
  size: 100,
  img: new Image(),
  desenha: function() {
    this.img.src = "../dataset/player_sprite.png";
    ctx.beginPath();
    ctx.drawImage(
      this.img,
      this.size * this.sx,
      this.size * this.sy,
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size
    );
    ctx.closePath();
  }
};

let background = {
  sx: 0,
  sy: 0,
  x: 0,
  y: 0,
  size: 800,
  img: new Image(),
  desenha: function() {
    this.img.src = "../dataset/background.png";
    ctx.beginPath();
    ctx.drawImage(
      this.img,
      this.size * this.sx,
      this.size * this.sy,
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size
    );
    ctx.closePath();
  }
};

let enemy_1 = {
  sx: 1,
  sy: 0,
  x: -100,
  y: -100,
  size: 100,
  img: new Image(),
  desenha: function() {
    this.img.src = "../dataset/enemy_1_sprite.png";
    ctx.beginPath();
    ctx.drawImage(
      this.img,
      this.size * this.sx,
      this.size * this.sy,
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size
    );
    ctx.closePath();
  }
};

let magia = {
  sx: 0,
  sy: 0,
  x: player.x + 30,
  y: player.y + 50,
  size: 40,
  img: new Image(),
  desenha: function() {
    this.img.src = "../dataset/bullet_sprite.png";
    ctx.beginPath();
    ctx.drawImage(
      this.img,
      this.size * this.sx,
      this.size * this.sy,
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size
    );
    ctx.closePath();
  }
};

let player_status = {
  sx: 0,
  sy: 0,
  x: 10,
  y: 10,
  size: 100,
  img: new Image(),
  desenha: function() {
    this.img.src = "../dataset/player_status.png";
    ctx.beginPath();
    ctx.drawImage(
      this.img,
      this.size * 4 * this.sx,
      this.size * 4 * this.sy,
      this.size * 4,
      this.size * 4,
      this.x,
      this.y,
      this.size,
      this.size
    );
    ctx.closePath();
  }
};

let gameover = {
  sx: 0,
  sy: 0,
  x: 0,
  y: 0,
  size: 800,
  img: new Image(),
  desenha: function() {
    this.img.src = "../dataset/gameover.png";
    ctx.beginPath();
    ctx.drawImage(
      this.img,
      this.size * this.sx,
      this.size * this.sy,
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size
    );
    ctx.closePath();
  }
};

let velocidade = 2;
let frame = 0;
let if_frame = 24;

let andar_direita = false;
let andar_esquerda = false;
let andar_cima = false;
let andar_baixo = false;
let player_vida = 3;
let correr = false;
let animacao_vertical = 0;

let vida_player = 3;
let vida_antiga = 3;
let tempo_status = 0;

let is_enemy_1 = false;
let enemy_1_timer = 0;
let enemy_1_spawn = Math.floor(Math.random() * 1000) + 500;
let enemy_1_vida = 3;
let enemy_1_invencibilidade = false;
let enemy_1_parado = false;
let tempo_enemy_1_parado = 0;

let enemy_frame = 0;
let enemy_if_frame = 48;
let enemy_velocidade = 1;
let variacao_velocidade = Math.floor(Math.random(0.1) * 2) + 0.5;

let enemy_frame_inv = 0;
let enemy_tempo_inv = 0;

let direcao_empurro = 0;
let empurrado = false;
let tempo_empurro = 0;
let invencibilidade = false;
let tempo_invencibilidade = 0;
let player_parado = false;
let tempo_parado = 0;
let frame_dano = 1;

let atacar = false;

let player_caido = false;
let tempo_caido = 0;

let pontos = 0;

player.sx = 1;

document.addEventListener('keydown', function(evento) {
  let tecla = evento.key;
  console.log(tecla);

  if (tecla === 'Shift') {
    correr = true;
  }
  if (correr) {
    velocidade = 4;
    if_frame = 12;
  }

  if (tecla === 'ArrowRight') {
    andar_direita = true;
    andar_esquerda = false;
  }
  if (tecla === 'ArrowLeft') {
    andar_direita = false;
    andar_esquerda = true;
  }
  if (tecla === 'ArrowUp') {
    andar_cima = true;
    andar_baixo = false;
  }
  if (tecla === 'ArrowDown') {
    andar_cima = false;
    andar_baixo = true;
  }
  if (tecla === ' ') {
    atacar = true;
    andar_direita = false;
    andar_esquerda = false;
    andar_cima = false;
    andar_baixo = false;
  }
});

document.addEventListener('keyup', function(evento) {
  let tecla_solta = evento.key;
  console.log(tecla_solta);

  if (tecla_solta === 'ArrowRight') {
    andar_direita = false;
    player.sx = 1;
  }

  if (tecla_solta === 'ArrowLeft') {
    andar_esquerda = false;
    player.sx = 1;
  }
  if (tecla_solta === 'ArrowUp') {
    andar_cima = false;
    player.sx = 1;
    animacao_vertical = 0;
  }

  if (tecla_solta === 'ArrowDown') {
    andar_baixo = false;
    player.sx = 1;
    animacao_vertical = 0;
  }

  if (tecla_solta === 'Shift') {
    correr = false;
    velocidade = 2;
    if_frame = 24;
  }
});

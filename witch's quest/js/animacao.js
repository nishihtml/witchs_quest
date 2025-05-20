// Variáveis globais para HUD
const maxVida = 3; // Máximo de vidas
const vida_icon_size = 30;
const vida_icon_margin = 10;

let pontuacao = 0; // Variável de pontuação (HUD)

// Criar um áudio para música de fundo
const musicaFundo = new Audio('LINK');
musicaFundo.loop = true;
musicaFundo.volume = 0.3; // volume baixo para não incomodar

// Função para desenhar HUD de vida (canto superior direito)
function desenhaHUDVida() {
    ctx.font = `${vida_icon_size}px Arial`;
    for (let i = 0; i < vida_player; i++) {
        // Posiciona a vida do lado superior direito
        let xPos = canvas.width - ((vida_icon_size + vida_icon_margin) * (i + 1));
        ctx.fillText('❤️', xPos, 40);
    }
}

// Função para desenhar HUD de pontuação (canto inferior direito)
function desenhaHUDPontuacao() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    let texto = `Pontuação: ${pontuacao}`;
    let textoLargura = ctx.measureText(texto).width;
    ctx.fillText(texto, canvas.width - textoLargura - 20, canvas.height - 20);
}

function animacao() {
    ctx.clearRect(0, 0, 800, 800);

    // Função auxiliar para detectar mouse em botão e alterar sprite do botão
    function mouseOverBotao(evento) {
        let rect = canvas.getBoundingClientRect();
        let x_mouse = evento.clientX - rect.left;
        let y_mouse = evento.clientY - rect.top;
        botao.sx = (x_mouse >= 540 && x_mouse <= 740 && y_mouse >= 670 && y_mouse <= 750) ? 1 : 0;
    }

    // Função auxiliar para clicar no botão
    function clickBotao(evento, callback) {
        let rect = canvas.getBoundingClientRect();
        let x_mouse = evento.clientX - rect.left;
        let y_mouse = evento.clientY - rect.top;
        if (x_mouse >= 540 && x_mouse <= 740 && y_mouse >= 670 && y_mouse <= 750) callback();
    }

    if (inicio) {
        tutorial.desenha();
        botao.desenha();
        document.addEventListener('mousemove', mouseOverBotao);
        canvas.addEventListener('click', e => clickBotao(e, () => {
            inicio = false;
            jogo = true;
        }));
    }

    else if (fim) {
        gameover.desenha();
        botao.desenha();
        document.addEventListener('mousemove', mouseOverBotao);
        canvas.addEventListener('click', e => clickBotao(e, () => {
            vida_player = 3;
            player.x = 400; player.y = 400;
            player.sx = 1; player.sy = 0;
            player_status.sx = 0;
            vida_antiga = 3;
            fim = false;
            jogo = true;
            empurrado = false;
            player_parado = false;
            player_caido = false;
            invencibilidade = false;
            is_enemy_1 = false
            is_enemy_2 = false
            pontuacao = 0; // Resetar pontuação ao reiniciar
        }));
    }

    else if (jogo) {
        // Fim de jogo (player caido)
        if (player_caido) {
            player.sx = 2; player.sy = 4;
            tempo_caido++;
            player_parado = true;
            andar_baixo = andar_cima = andar_direita = andar_esquerda = false;
            if (tempo_caido >= 120) {
                tempo_caido = 0;
                jogo = false;
                fim = true;
            }
        }

        // Animação player andando
        if (andar_direita || andar_esquerda || andar_cima || andar_baixo) {
            frame++;
            if (frame >= if_frame) {
                if ((player.sx == 1 || player.sx == 4) && animacao_vertical == 0) player.sx = 2;
                else if (player.sx == 2 && animacao_vertical == 0) { player.sx = 1; animacao_vertical = 1; }
                else if ((player.sx == 1 || player.sx == 4) && animacao_vertical == 1) player.sx = 3;
                else if (player.sx == 3 && animacao_vertical == 1) { player.sx = 1; animacao_vertical = 0; }
                frame = 0;
            }
        }

        player.desenha();

        // Movimento player
        if (!player_parado && !atacar) {
            if (andar_direita) { player.x += velocidade; player.sy = 2; magia.x = player.x + 30; }
            if (andar_esquerda) { player.x -= velocidade; player.sy = 1; magia.x = player.x + 30; }
            if (andar_cima) { player.y -= velocidade; player.sy = 3; magia.y = player.y + 50; }
            if (andar_baixo) { player.y += velocidade; player.sy = 0; magia.y = player.y + 50; }
        }

        // Spawn enemy 1
        if (!is_enemy_1) {
            enemy_1_timer++;
            if (enemy_1_timer >= enemy_1_spawn) {
                enemy_1.x = Math.floor(Math.random() * 700);
                enemy_1.y = Math.floor(Math.random() * 700);
                is_enemy_1 = true;
            }
        }

        // Movimento e animação enemy 1
        if (is_enemy_1) {
            enemy_1.desenha();
            enemy_frame++;
            if (enemy_1.sx !== 3 && !enemy_1_invencibilidade && !enemy_1_parado) {
                if (player.x > enemy_1.x) { enemy_1.x += enemy_velocidade; enemy_1.sy = 1; }
                if (player.x < enemy_1.x) { enemy_1.x -= enemy_velocidade; enemy_1.sy = 0; }
                if (player.y > enemy_1.y) enemy_1.y += enemy_velocidade;
                if (player.y < enemy_1.y) enemy_1.y -= enemy_velocidade;
            }
            if (enemy_if_frame <= enemy_frame && !enemy_1_invencibilidade) {
                enemy_1.sx = (enemy_1.sx == 1) ? 2 : 1;
                enemy_frame = 0;
            }
        }

        // Colisão player e enemy 1
        if (player.y + 20 <= enemy_1.y + 100 && player.y + 100 >= enemy_1.y + 20 &&
            player.x + 20 <= enemy_1.x - 20 + 100 && player.x - 20 + 100 >= enemy_1.x + 20 &&
            !invencibilidade) {
            direcao_empurro = Math.floor(Math.random() * 4);
            empurrado = true;
            invencibilidade = true;
            vida_player--;
            andar_cima = andar_baixo = andar_direita = andar_esquerda = false;
            atacar = false;
        }

        // Spawn enemy 2
        if (!is_enemy_2) {
            enemy_2_timer++;
            if (enemy_2_timer >= enemy_2_spawn) {
                enemy_2.x = Math.floor(Math.random() * 700);
                enemy_2.y = Math.floor(Math.random() * 700);
                is_enemy_2 = true;
            }
        }

        // Movimento e animação enemy 2
        if (is_enemy_2) {
            enemy_2.desenha();
            enemy_frame++;
            if (enemy_2.sx !== 3 && !enemy_2_invencibilidade && !enemy_2_parado) {
                if (player.x > enemy_2.x) { enemy_2.x += enemy_velocidade; enemy_2.sy = 1; }
                if (player.x < enemy_2.x) { enemy_2.x -= enemy_velocidade; enemy_2.sy = 0; }
                if (player.y > enemy_2.y) enemy_2.y += enemy_velocidade;
                if (player.y < enemy_2.y) enemy_2.y -= enemy_velocidade;
            }
            if (enemy_if_frame <= enemy_frame && !enemy_2_invencibilidade) {
                enemy_2.sx = (enemy_2.sx == 1) ? 2 : 1;
                enemy_frame = 0;
            }
        }

        // Colisão player e enemy 1
        if (player.y + 20 <= enemy_2.y + 100 && player.y + 100 >= enemy_2.y + 20 &&
            player.x + 20 <= enemy_2.x - 20 + 100 && player.x - 20 + 100 >= enemy_2.x + 20 &&
            !invencibilidade) {
            direcao_empurro = Math.floor(Math.random() * 4);
            empurrado = true;
            invencibilidade = true;
            vida_player--;
            andar_cima = andar_baixo = andar_direita = andar_esquerda = false;
            atacar = false;
        }

        // Empurro do player
        if (empurrado) {
            player.sx = 1;
            player.sy = 4;
            tempo_empurro++;
            if (direcao_empurro === 0) { player.x += 10; magia.x += 10; }
            else if (direcao_empurro === 1) { player.x -= 10; magia.x -= 10; }
            else if (direcao_empurro === 2) { player.y += 10; magia.y += 10; }
            else if (direcao_empurro === 3) { player.y -= 10; magia.y -= 10; }

            if (tempo_empurro >= 10) {
                empurrado = false;
                player_parado = true;
                tempo_empurro = 0;
            }
        }

        // Player parado após empurro
        if (player_parado) {
            andar_cima = andar_baixo = andar_direita = andar_esquerda = false;
            tempo_parado++;
            if (tempo_parado >= 10) {
                player_parado = false;
                tempo_parado = 0;
            }
        }

        // Invencibilidade player
        if (invencibilidade) {
            tempo_invencibilidade++;
            frame_dano++;
            if (tempo_invencibilidade >= 300) {
                invencibilidade = false;
                tempo_invencibilidade = 0;
                player.sx = 1;
            }
            if (frame_dano >= if_frame / 8) {
                player.sx = (player.sx !== 0) ? 0 : 1;
                frame_dano = 0;
            }
        }

        // Ataque player
        if (atacar && !player_parado && !empurrado) {
            player.sx = 4;
            andar_cima = andar_baixo = andar_direita = andar_esquerda = false;
            invencibilidade = false;
            if (player.sy === 0) { magia.sx = 0; magia.sy = 0; magia.desenha(); magia.y += 4; }
            else if (player.sy === 1) { magia.sx = 0; magia.sy = 1; magia.desenha(); magia.x -= 4; }
            else if (player.sy === 2) { magia.sx = 1; magia.sy = 1; magia.desenha(); magia.x += 4; }
            else if (player.sy === 3) { magia.sx = 1; magia.sy = 0; magia.desenha(); magia.y -= 4; }
        }

        // Colisão magia e enemy 1
        if (magia.y <= enemy_1.y + 100 && magia.y + 40 >= enemy_1.y + 20 &&
            magia.x <= enemy_1.x - 20 + 100 && magia.x + 40 >= enemy_1.x + 20 &&
            !enemy_1_parado && atacar) {
            enemy_1_parado = true;
            atacar = false;
            player.sx = 1;
            magia.x = player.x + 30;
            magia.y = player.y + 50;

            // Incrementa pontuação ao acertar o inimigo
            pontuacao += 10;
        }

        // Controle enemy 1 parado
        if (enemy_1_parado) {
            enemy_1_invencibilidade = true;
            tempo_enemy_1_parado++;
            if (tempo_enemy_1_parado >= 60) {
                tempo_enemy_1_parado = 0;
                if (enemy_1_vida <= 0) {
                    is_enemy_1 = false;
                    enemy_1.x = -100; enemy_1.y = -100;
                    enemy_1_vida = 3;
                    enemy_1_timer = 0;
                    enemy_1_spawn = Math.floor(Math.random() * 500);
                }
            }
        }

        // Invencibilidade enemy 1
        if (enemy_1_invencibilidade) {
            enemy_tempo_inv++;
            enemy_frame_inv++;
            if (enemy_tempo_inv >= 300) {
                enemy_1_invencibilidade = false;
                enemy_tempo_inv = 0;
                enemy_1.sx = 1;
                enemy_1_parado = false;
                enemy_1_vida--;
            }
            if (enemy_frame_inv >= enemy_if_frame / 6) {
                enemy_1.sx = (enemy_1.sx !== 0) ? 0 : 3;
                enemy_frame_inv = 0;
            }
        }

        // Colisão magia e enemy 2
        if (magia.y <= enemy_2.y + 100 && magia.y + 40 >= enemy_2.y + 20 &&
            magia.x <= enemy_2.x - 20 + 100 && magia.x + 40 >= enemy_2.x + 20 &&
            !enemy_2_parado && atacar) {
            enemy_2_parado = true;
            atacar = false;
            player.sx = 1;
            magia.x = player.x + 30;
            magia.y = player.y + 50;

            // Incrementa pontuação ao acertar o inimigo
            pontuacao += 10;
        }

        // Controle enemy 2 parado
        if (enemy_2_parado) {
            enemy_2_invencibilidade = true;
            tempo_enemy_2_parado++;
            if (tempo_enemy_2_parado >= 60) {
                tempo_enemy_2_parado = 0;
                if (enemy_2_vida <= 0) {
                    is_enemy_2 = false;
                    enemy_2.x = -100; enemy_2.y = -100;
                    enemy_2_vida = 3;
                    enemy_2_timer = 0;
                    enemy_2_spawn = Math.floor(Math.random() * 500);
                }
            }
        }

        // Invencibilidade enemy 2
        if (enemy_2_invencibilidade) {
            enemy_tempo_inv++;
            enemy_frame_inv++;
            if (enemy_tempo_inv >= 300) {
                enemy_2_invencibilidade = false;
                enemy_tempo_inv = 0;
                enemy_2.sx = 1;
                enemy_2_parado = false;
                enemy_2_vida--;
            }
            if (enemy_frame_inv >= enemy_if_frame / 6) {
                enemy_2.sx = (enemy_2.sx !== 0) ? 0 : 3;
                enemy_frame_inv = 0;
            }
        }

        // Limites player e magia na tela
        player.x = Math.min(Math.max(player.x, 0), 700);
        player.y = Math.min(Math.max(player.y, 0), 700);

        if (magia.x <= 0 || magia.x >= 760 || magia.y <= 0 || magia.y >= 761) {
            magia.x = Math.min(Math.max(magia.x, 0), 760);
            magia.y = Math.min(Math.max(magia.y, 0), 761);
            atacar = false;
            player.sx = 1;
        }
        player_status.desenha();

        // Desenha HUD de vida
        desenhaHUDVida();

        // Desenha HUD de pontuação
        desenhaHUDPontuacao();

        if (vida_player < vida_antiga) {
            tempo_status++;
            player_status.sx = 3;
            if (tempo_status >= 48) {
                vida_antiga--;
                tempo_status = 0;
                if (vida_player === 2) player_status.sx = 1;
                else if (vida_player === 1) player_status.sx = 2;
                else if (vida_player <= 0) {
                    player_status.sx = 4;
                    player_caido = true;
                }
            }
        }
    }

    requestAnimationFrame(animacao);
}

// Iniciar música de fundo assim que carregar o script
musicaFundo.play().catch(() => {
    canvas.addEventListener('click', () => {
        musicaFundo.play();
    }, { once: true });
});

animacao();
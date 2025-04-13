let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');


//overworld

////player

let witch = {
    x: 0,
    y: 100,
    raio: 50,
    img: new Image(),
    desenha: function(){
        this.img.src = 'witch_front1';
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, 2*this.raio, 2*this.raio);
        ctx.closePath();
    }
}




document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla);

    let velocidade = 3;
    if(tecla == 'ArrowUp'){ witch.y -= velocidade}
    if(tecla == 'ArrowDown'){ witch.y += velocidade}
    if(tecla == 'ArrowLeft'){ witch.x -= velocidade}
    if(tecla == 'ArrowRight'){ witch.x += velocidade}
    
})
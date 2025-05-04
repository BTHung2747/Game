import { useEffect, useRef } from 'react';
import spriteSrc from '../../assets/images/sprite.png';
import gameOver from '../../assets/images/gameover.png';
import messageImgSrc from '../../assets/images/message.png';
import downFlapSrc from '../../assets/images/yellowbird-downflap.png';
import midFlapSrc from '../../assets/images/yellowbird-midflap.png';
import upFlapSrc from '../../assets/images/yellowbird-upflap.png';
import pipeTopImgSrc from '../../assets/images/pipe2.png';
import pipeBottomImgSrc from '../../assets/images/pipe.png';


const GameCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 530;
    canvas.height = 710;

    const sprites = new Image();
    sprites.src = spriteSrc;
    const gameOverImg = new Image();
    gameOverImg.src = gameOver ; 
    const messageImg = new Image();
    messageImg.src = messageImgSrc;

    const downFlap = new Image();
    downFlap.src = downFlapSrc;
    
    const midFlap = new Image();
    midFlap.src = midFlapSrc;
    
    const upFlap = new Image();
    upFlap.src = upFlapSrc;
    
    const pipeTopImg = new Image();
    pipeTopImg.src = pipeTopImgSrc;

   const pipeBottomImg = new Image();
   pipeBottomImg.src = pipeBottomImgSrc;

let game = 'start';
let frame = 0
//Screen
const start = {
    draw: function(){
        ctx.beginPath();
        ctx.drawImage(messageImg, canvas.width / 2 - messageImg.width / 2, 200);

    }
}
// manf end
const end = {
    draw: function(){
        ctx.beginPath();
        ctx.drawImage(gameOverImg, canvas.width / 2 - gameOverImg.width / 2, 200);
        ctx.drawImage(sprites, 630, 439, 284, 138, canvas.width/2 - 145, 350, 284, 138)
        ctx.drawImage(sprites, 631.79, 583.92, 76, 41, canvas.width/2 - 41.5, 500, 76, 41)
    }
}

// Background
const bg = {
    sX: 165,
    sY: 0,
    sW: 226,
    sH: 625,
    cX: 0,
    cY: 0,
    cW: 226,  // hoặc bất kỳ kích thước canvas nào bạn muốn
    cH: 625,

    draw: function() {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX + 226, this.cY, this.cW, this.cH)
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX + 452, this.cY, this.cW, this.cH)

    }
}
class Ground {
    constructor(cX,cY) {
        this.cX = cX;
        this.cY = cY;
        this.sX = 628;
        this.sY = 0;
        this.sW= 214;
        this.sH= 143;
        this.cW= 214;
        this.cH= 143;
        this.dx= -2;// nen dat di chuyen

    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
    }
}
let arrGround = [];

for(let i = 0; i<4; i++){
    let ground = new Ground(215 *i, 625)
    arrGround.push(ground);
}
function drawArrGround(){
    arrGround.forEach(ground => ground.draw())
}

function updateArrGround(){
    arrGround.forEach(ground => {
        ground.cX += ground.dx;
    })

    // thay doi nen dat neeus het 
    if(arrGround[0].cX <= -336){
        arrGround.splice(0,1);
        let ground = new Ground(arrGround[2].cX + 215, 625);
        arrGround.push(ground);
    }
    
}

// Random ong
function random(min,max) {
  return Math.ceil(Math.random() * (max-min) + min);
}

// duong ong
class Pipes {
    constructor(cX, cY, space) {
      this.cX = cX;
      this.cY = cY;
      this.cW = 82; 
      this.cH = 710; 
      this.space = space;
      this.dx = -2;
    }
  
    draw() {
      ctx.beginPath();
      ctx.drawImage(pipeTopImg, this.cX, this.cY, this.cW, this.cH);
      ctx.drawImage(pipeBottomImg, this.cX, this.cY + this.cH + this.space, this.cW, this.cH);
    }
  }
  

let arrPipes = [];

function newPipes(){
  for(let i = 0; i<4; i++){
      let pipe = new Pipes(random(530, 600) * i , random(-660, -300), 200)
      arrPipes.push(pipe);
  }

}
newPipes();

function drawArrPipe(){
  arrPipes.forEach( pipe=> pipe.draw())
}
function updateArrPipe(){
  arrPipes.forEach(pipe => {
      pipe.cX += pipe.dx;
  })

  // taoj ong moi
  if(arrPipes[0].cX <= -82){
      arrPipes.splice(0,1);
      let pipe = new Pipes(arrPipes[arrPipes.length -1].cX + random(400, 500), random(-660, -300), random(200, 150));
      arrPipes.push(pipe);
  }
  

}                      


// diem , so
const arrNumber = [
    { name: 0, sX: 1013, sY: 181, sW: 52, sH: 80, cW: 52, cH: 80 },
    { name: 1, sX: 1080, sY: 181, sW: 32, sH: 80, cW: 32, cH: 80 },
    { name: 2, sX: 1127, sY: 181, sW: 52, sH: 79, cW: 52, cH: 79 },
    { name: 3, sX: 1184, sY: 181, sW: 52, sH: 79, cW: 52, cH: 79 },
    { name: 4, sX: 1013, sY: 265, sW: 52, sH: 79, cW: 52, cH: 79 },
    { name: 5, sX: 1070, sY: 265, sW: 52, sH: 79, cW: 52, cH: 79 },
    { name: 6, sX: 1127, sY: 265, sW: 52, sH: 79, cW: 52, cH: 79 },
    { name: 7, sX: 1184, sY: 265, sW: 52, sH: 79, cW: 52, cH: 79 },
    { name: 8, sX: 1013, sY: 349, sW: 52, sH: 79, cW: 52, cH: 79 },
    { name: 9, sX: 1070, sY: 349, sW: 52, sH: 79, cW: 52, cH: 79 }
  ];
  

class Score {
    constructor(value, cX, cY){
        this.value = value;
        this.cX = cX;
        this.cY = cY;
    }
    draw(){
        ctx.beginPath();
        if(this.value >= 10){
            this.split = (this.value.toString()).split('');
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, canvas.width/2 - 52 , 60, number.cW, number.cH);
                }
                if(this.split[1] == number.name){
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, canvas.width/2 + 2 , 60, number.cW, number.cH);
                }
            })
        }
        else {
            this.split = this.value.toString();
            arrNumber.forEach(number => {
                if(this.split[0] == number.name) {
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, canvas.width/2 -26, 60, number.cW, number.cH);
                }
            })
        }
    }
    drawSmall(){
        ctx.beginPath();
        if(this.value>= 10){
            this.split = (this.value.toString()).split('');
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, this.cX, this.cY, number.cW/3, number.cH/3);

                }
                if(this.split[1]== number.name){
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, this.cX + 18, this.cY, number.cW/3, number.cH/3);
                }
            })
        }
        else{
            this.split = this.value.toString();
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    ctx.drawImage(sprites, number.sX, number.sY, number.sW, number.sH, this.cX + 18, this.cY, number.cW/3, number.cH/3);
                }
            })
        }
    }
}

let score = new Score(0, 340, 391);
let maxScore = new Score(0 , 340 , 443);
// class Bird 
class Bird {
    constructor(cX, cY) {
        this.cX = cX;
        this.cY = cY;
        this.cW = 51; // chiều rộng ảnh riêng
        this.cH = 36; // chiều cao ảnh riêng
        this.i = 0;
        this.v = 0;
        this.a = 0.1;

        this.animate = [downFlap, midFlap, upFlap];
    }

    draw() {
        ctx.beginPath();

        // thay đổi frame theo game state
        if (game === 'start') {
            if (frame % 35 === 0) {
                this.i = (this.i + 1) % 3;
            }
        } else if (game === 'play') {
            if (frame % 16 === 0) {
                this.i = (this.i + 1) % 3;
            }
        }

        const img = this.animate[this.i];
        ctx.drawImage(img, this.cX, this.cY, this.cW, this.cH);
    }

    update(){
        if(game == 'play' || game== 'end'){
            this.v += this.a;
            this.cY += this.v;
            // va tram nen dat
            if(this.cY + this.cH + this.v >=625) {
                game = 'end';
                this.v= 0 ;
                this.cY = 625 ;

            }
            // va cham duong ong 
            if( bird.cX + bird.cW > arrPipes[0].cX &&
                bird.cX < arrPipes[0].cX + arrPipes[0].cW &&
                (
                    bird.cY < arrPipes[0].cY + arrPipes[0].cH ||
                    bird.cY + bird.cH > arrPipes[0].cY + arrPipes[0].cH + arrPipes[0].space
                )


             ){
                game = 'end'
             }
             // an diem
             if(bird.cX == arrPipes[0].cX + 82 || bird.cX == arrPipes[0].cX + 81){
                score.value++;
                maxScore.value = Math.max(score.value, maxScore.value);
             }
        }

    }
}

let bird= new Bird(150, canvas.height / 2 -12)

canvas.addEventListener('click', function(event){
    switch(game){
        case 'start':
            game = 'play';
            break
        case 'play':
            console.log("choi game");
            bird.v = -4;
            break
        case 'end':
            console.log("end game");
            if(
                event.offsetX > canvas.width/2 - 41.5 &&
                event.offsetX < canvas.width/2 + 41.5 &&
                event.offsetY > 500 &&
                event.offsetY < 546 
            ) {
                score.value = 0 ;
                arrPipes = [];
                newPipes();
                bird.v = 0;
                bird.cY = canvas.height / 2 - 12;
                game = 'start' ; 

            }
 
            break
    }
})

function draw(){
    bg.draw();
    if(game=='start'){
        start.draw();
    }
    if (game == 'play') {
    drawArrPipe();
    
}

    drawArrGround();
    if(game=='play'){
        score.draw();
    }
    bird.draw();
    if(game=='end'){
        end.draw();
        score.drawSmall();
        maxScore.drawSmall();
    }
}
function update(){
    if(game == 'play'){
        updateArrPipe();
        updateArrGround();
    }
    bird.update();
}


function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  frame++;
  draw();
  update();
}
    sprites.onload = () => animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="canvas block mx-auto bg-sky-100"
      width={530}
      height={710}
    />
  );
};
  

export default GameCanvas ;

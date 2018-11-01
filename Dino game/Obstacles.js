function Obs(){
	this.x = 3000;
	this.img = cactusBig;
	this.w = 0;
	this.h = 0;
	this.birdHeight = 0;//0 is on the ground, 1 is middle, 2 is high(can be ignored)
	this.initialize = function(){
		if(Math.random() < 0.2 && score > 200){
			this.img = bird;
			this.birdHeight = Math.round(Math.random() * 2);
			this.w = 46;
			this.h = 40;
		}else{
			switch(Math.round(Math.random() * 2)){
				case 0:
				this.img = cactusBig;
				this.w = 30;
				this.h = 60;
				break;
				case 1:
				this.img = cactusSmall;
				this.w = 23;
				this.h = 45;
				break;
				case 2:
				this.img = cactusSmallMany;
				this.w = 72;
				this.h = 48;
				break;
			}
		}
	}
}

function addObs(){
	hold++;
	if(hold > minimunGap + Math.random() * 400){
		obstacles.push(new Obs());
		obstacles[obstacles.length-1].initialize();
		hold = 0;
	}
}

function removeObs(){
	for(var i = 0;i < obstacles.length;i++){
		if(obstacles[i].x < -10){
			obstacles.splice(i,1);
		}
	}
}

function moveObs(){
	for(var i = 0;i < obstacles.length;i++){
		obstacles[i].x -= speed;
	}
}

function drawObs(){
	for(var i = 0;i < obstacles.length;i++){
		if(obstacles[i].img == bird){
			ctx.drawImage(bird[score % 2], obstacles[i].x, groundLevel - obstacles[i].h - obstacles[i].birdHeight*30 + 5);
		}else{
			ctx.drawImage(obstacles[i].img, obstacles[i].x, groundLevel - obstacles[i].h);
		}
	}
}

function speedUp(){
	speed += 0.001;
}








function Cloud(){
	this.x = 1000;
	this.y = Math.random() * 100 + 150;//150-250
	this.img = cloud;
}

var counter = 0;
function addCloud(){
	counter++;
	if(counter > (minimunGap/3 + Math.random() * 400)*3){
		clouds.push(new Cloud);
		counter = 0;
	}
}

function moveCloud(){
	var speedLimit = 25;
	for(var i = 0;i < clouds.length;i++){
		if(speed > speedLimit){
			clouds[i].x -= speedLimit / 5;
		}else{
			clouds[i].x -= speed / 5;
		}
		
	}
}

function removeCloud(){
	for(var i = 0;i < clouds.length;i++){
		if(clouds[i].x < -100){
			clouds.splice(i,1);
		}
	}
}

function drawCloud(){
	for(var i = 0;i < clouds.length;i++){
		clouds[i].x -= speed / 5;
		ctx.drawImage(clouds[i].img, clouds[i].x, clouds[i].y);
	}
}

var x1 = 0;
var x2 = 840;
function drawGround(){
	ctx.drawImage(sky, 0, 0);
	ctx.drawImage(ground, x1, 200);
	ctx.drawImage(ground, x2, 200);
	x1 -= speed;
	x2 -= speed;
	if(x1 <= -840){
		x1 = 840;
	}
	if(x2 <= -840){
		x2 = 840;
	}
}






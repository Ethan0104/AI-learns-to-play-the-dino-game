function Player(){
	//parameters for NeuroEvolution
	this.fitness = 0;
	this.inputs = [];
	this.hiddens = [];
	this.outputs = [];
	this.input_hidden = [];//input to hidden weight matrix, 5x6
	this.hidden_output = [];//hidden to output weight matrix, 3x5
	this.bias = 0;
	//parameters for the game
	this.y = 0;
	this.jumpDist = 0.01;
	this.state = 1;//1 is running, 2 is jumping, 3 is duck, 0 is dead
	this.img = null;
	this.w = 48;
	this.h = 56;
	this.initializeBrain = function(){
		this.input_hidden = matrixRandom(hiddenNodes,inputNodes,-1,1);
		this.hidden_output = matrixRandom(outputNodes,hiddenNodes,-1,1);
		this.bias = Math.random() * 2 - 1;
	}
	this.draw = function(){
		if(this.state){
			switch(this.state){
				case 1:
				this.y = 0;
				this.img = dinoRun;
				this.w = 48;
				this.h = 56;
				this.jumpDist = 0.01;
				this.y = 0;
				ctx.drawImage(this.img[score % 2], 30, groundLevel - this.h);
				break;
				case 2:
				this.img = dinoJump;
				this.w = 48;
				this.h = 50;
				this.y = Math.sin(this.jumpDist) * 90;
				ctx.drawImage(this.img, 30, groundLevel - this.h - this.y);
				this.jumpDist += 0.03;
				if(this.y < 0.001 && this.jumpDist > 3){
					this.state = 1;
					this.jumpDist = 0.01;
				}
				break;
				case 3:
				this.img = dinoDuck;
				this.y = 0;
				this.w = 68;
				this.h = 34;
				ctx.drawImage(this.img[score % 2], 30, groundLevel - this.h);
				break;
				case 0:
				this.img = dinoDead;
				ctx.drawImage(this.img, 30, groundLevel - this.h - this.y);
				break;
			}
		}
	}
	this.collide = function(){
		if(obstacles.length){
			switch(obstacles[0].birdHeight){
				case 0:
				if(obstacles[0].x <= 30 + this.w && this.y <=  obstacles[0].h){
					this.state = 0;
					this.fitness = score*score;
				}
				break;
				case 1:
				if(this.state == 3){
					if(obstacles[0].x <= 30 + this.w && this.y > obstacles[0].birdHeight + this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}else{
					if(obstacles[0].x <= 30 + this.w && this.h > obstacles[0].birdHeight + this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}
				break;
				case 2:
				if(this.state == 2){
					if(obstacles[0].x <= 30 + this.w && groundLevel - this.h < groundLevel - obstacles[0].birdHeight - this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}else{
					if(obstacles[0].x <= 30 + this.w && groundLevel - this.y < groundLevel - obstacles[0].birdHeight - this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}
			}
		}
	}
	this.look = function(){//collect input data
		closest = 0;
		closestD = Infinity;
		for(var i = 0;i < obstacles.length;i++){
			var d = obstacles[i].x - (30 + this.w);
			if(d < closestD && d >= 0){
				closest = i;
				closestD = d;
			}
		}

		this.inputs = matrixZeros(6,1);
		
		//Normalize all the inputs to the range between 0 and 1
		//width 840 height 450
		this.inputs[0][0] = closestD / 840;
		if(obstacles.length){
			this.inputs[1][0] = obstacles[closest].h / 450;
			this.inputs[2][0] = obstacles[closest].w / 840;
			this.inputs[3][0] = obstacles[closest].birdHeight / 3;
		}else{
			this.inputs[1][0] = 0;
			this.inputs[2][0] = 0;
			this.inputs[3][0] = 0;
		}
		this.inputs[4][0] = speed / 10;
		this.inputs[5][0] = this.bias;
	}
	this.think = function(){
		if(this.state){
			this.hiddens = multiplyMatrix(this.input_hidden, this.inputs);
			this.hiddens = fnApply(this.hiddens, sigmoid);
			this.outputs = multiplyMatrix(this.hidden_output, this.hiddens);
			this.outputs = fnApply(this.outputs, sigmoid);
			var o = transposeMatrix(this.outputs);//outputs transposed
			switch(o[0].indexOf(Math.max.apply(null, o[0]))){
				case 0:
				if(this.state != 2){
					this.state = 1;
				}
				break;
				case 1:
				this.state = 2;
				break;
				case 2:
				if(this.state != 2){
					this.state = 3;
				}
				break;
			}
		}
	}
}

function Bot(){
	//parameters for the game are the same
	this.y = 0;
	this.jumpDist = 0.01;
	this.state = 1;//1 is running, 2 is jumping, 3 is duck, 0 is dead
	this.img = null;
	this.w = 48;
	this.h = 56;
	//we still need the input and the look function
	this.inputs = [];
	this.duckTime = 0;
	this.look = function(){
		//console.log(2);
		closest = 0;
		closestD = Infinity;
		for(var i = 0;i < obstacles.length;i++){
			var d = obstacles[i].x - (30 + this.w);
			if(d < closestD && d >= 0){
				closest = i;
				closestD = d;
			}
		}
		
		if(obstacles.length){
			this.inputs[0] = closestD;
			this.inputs[1] = obstacles[closest].birdHeight;
		}else{
			this.inputs[0] = Infinity;
			this.inputs[1] = 0;
		}
		
	}
	this.think = function(){
		if(this.state){
			if(this.duckTime >= 100){
				this.duckTime = 0;
			}else if(this.duckTime > 0 && this.duckTime < 100){
				this.state = 3;
				this.duckTime++;
				return;
			}
			if(this.inputs[0] < 200*speed/5){
			//if(true){
				if(!this.inputs[1]){
					this.state = 2;
				}else{
					this.state = 3;
					this.duckTime++;
				}
			}else{
				if(this.state != 2){
					this.state = 1;
				}
				
			}
		}
	}
	this.draw = function(){
		if(this.state){
			switch(this.state){
				case 1:
				this.y = 0;
				this.img = dinoRun;
				this.w = 48;
				this.h = 56;
				this.jumpDist = 0.01;
				this.y = 0;
				ctx.drawImage(this.img[score % 2], 30, groundLevel - this.h);
				break;
				case 2:
				this.img = dinoJump;
				this.w = 48;
				this.h = 50;
				this.y = Math.sin(this.jumpDist) * 90;
				ctx.drawImage(this.img, 30, groundLevel - this.h - this.y);
				this.jumpDist += 0.03;
				if(this.y < 0.001 && this.jumpDist > 3){
					this.state = 1;
					this.jumpDist = 0.01;
				}
				break;
				case 3:
				this.img = dinoDuck;
				this.y = 0;
				this.w = 68;
				this.h = 34;
				ctx.drawImage(this.img[score % 2], 30, groundLevel - this.h);
				break;
				case 0:
				this.img = dinoDead;
				ctx.drawImage(this.img, 30, groundLevel - this.h - this.y);
				break;
			}
		}
	}
	this.collide = function(){
		if(obstacles.length){
			switch(obstacles[0].birdHeight){
				case 0:
				if(obstacles[0].x <= 30 + this.w && this.y <=  obstacles[0].h){
					this.state = 0;
					this.fitness = score*score;
				}
				break;
				case 1:
				if(this.state == 3){
					if(obstacles[0].x <= 30 + this.w && this.y > obstacles[0].birdHeight + this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}else{
					if(obstacles[0].x <= 30 + this.w && this.h > obstacles[0].birdHeight + this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}
				break;
				case 2:
				if(this.state == 2){
					if(obstacles[0].x <= 30 + this.w && groundLevel - this.h < groundLevel - obstacles[0].birdHeight - this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}else{
					if(obstacles[0].x <= 30 + this.w && groundLevel - this.y < groundLevel - obstacles[0].birdHeight - this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}
			}
		}
	}
}









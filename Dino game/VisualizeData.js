function showNumbers(){
	ctx.font = font;
	ctx.fillText("Score: " + score, 20, 440);
	ctx.fillText("HIGH: " + highest, 20, 410);
	
	if(isReplay){
		ctx.fillText("Speed: " + Math.round(speed * 10)/10, 20, 60);
		ctx.fillText("Replaying...", 730, 410);
		ctx.fillText("Alive: 1", 20, 30);
		ctx.fillText("Gen: " + replayGen, 750, 380);
	}else if(isBot){
		ctx.fillText("Speed: " + Math.round(speed * 10)/10, 20, 60);
		ctx.fillText("Hard-Coded Bot", 690, 410);
		ctx.fillText("Alive: 1", 20, 30);
		ctx.fillText("Gen: 0", 750, 380);
	}else{
		if(score >= targetScore){
			ctx.fillText("The Target Score Has Been Achieved!!!", 480, 440);
		}else{
			ctx.fillText("The Target Score Is Not Achieved Yet", 480, 440);
		}
		ctx.fillText("Speed: " + Math.round(speed * 10)/10, 20, 150);
		ctx.fillText("Evolving...", 730, 410);
		ctx.fillText("Alive: " + stillAlive(), 20, 30);
		ctx.fillText("Alive Percentage: " + Math.round(stillAlive() / popSize * 1000)/10 + "%", 20, 60);
		ctx.fillText("Gen: " + gen, 750, 380);
		ctx.fillText("Fitness Average: " + Math.round(Math.sqrt(sum/popSize)), 20, 90);
		ctx.fillText("Target Score: " + targetScore, 20, 120);
	}
}

function showBrain(inputHidden, hiddenOutput){
	var inputX = 450;
	var hiddenX = 600;
	var outputX = 750;
	var y = 30;
	var incrememt = 40;
	const neuronR = 12.5;

	ctx.font = "15px Arial";
	if(gen != 1){
		ctx.fillText("The Brain Of The Last Champion", 515, 25);
		for(var i = 0;i < inputHidden[0].length;i++){
			for(var j = 0;j < inputHidden.length;j++){
				ctx.beginPath();
				ctx.lineWidth = Math.abs(inputHidden[j][i]);
				if(inputHidden[j][i] > 0){
					ctx.strokeStyle = 'blue';
				}else{
					ctx.strokeStyle = 'red';
				}
				y = 30;
				ctx.moveTo(inputX + neuronR, y + neuronR + i*incrememt);
				y = 45;
				ctx.lineTo(hiddenX + neuronR, y + j*incrememt);
				ctx.closePath();
				ctx.stroke();
			}
		}
		for(var i = 0;i < hiddenOutput[0].length;i++){
			for(var j = 0;j < hiddenOutput.length;j++){
				ctx.beginPath();
				ctx.lineWidth = Math.abs(hiddenOutput[j][i]);
				if(hiddenOutput[j][i] > 0){
					ctx.strokeStyle = 'blue';
				}else{
					ctx.strokeStyle = 'red';
				}
				y = 35;
				ctx.moveTo(hiddenX + neuronR, y + neuronR + i*incrememt);
				y = 90;
				ctx.lineTo(outputX + neuronR, y + j*incrememt);
				ctx.closePath();
				ctx.stroke();
			}
		}
	}

    y = 30;
    for(var i = 0;i < inputNodes;i++){
		ctx.drawImage(neuron, inputX, y);
		y += incrememt;
	}
	
	y = 30;
	for(var i = 0;i < hiddenNodes;i++){
		ctx.drawImage(neuron, hiddenX, y);
		y += incrememt;
	}
	y = 80;
	for(var i = 0;i < outputNodes;i++){
		ctx.drawImage(neuron, outputX, y);
		y += incrememt;
	}
	
	ctx.fillText("Distance To Next Obstacle", 275, 45);
	ctx.fillText("Height Of Obstacle", 320, 85);
	ctx.fillText("Width Of Obstacle", 327, 125);
	ctx.fillText("Bird Height", 373, 165);
	ctx.fillText("Speed", 405, 205);
	ctx.fillText("Bias", 420, 245);

	ctx.fillText("Run", 776, 100);
	ctx.fillText("Jump", 777, 140);
	ctx.fillText("Duck", 777, 180);
}







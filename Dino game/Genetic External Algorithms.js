//Contains mutation, natural selection etc. 

function newPop(popSize){
	var nextGen = [];
	champion = population[findBest(population)];
	champion.state = 1;
	nextGen.push(champion);//champion lives on
	for(var l = 1;l < popSize;l++){
		nextGen[l] = selectReject(population, sum);
	}
	return nextGen;
}

function selectReject(pop, s){//input population, fitness sum
	var rand = 0;
	var fitness = 0;
	var parent1 = null;
	var child = new Player();
	while(rand >= fitness){
		parent1 = pop[Math.floor((Math.random()*pop.length))];
		fitness = parent1.fitness;
		rand = Math.random() * s;
	}

	rand = 0;
	fitness = 0;
	var parent2 = null;
	while(rand >= fitness){
		parent2 = pop[Math.floor((Math.random()*pop.length))];
		fitness = parent2.fitness;
		rand = Math.random() * s;
	}

	var i_h = matrixZeros(hiddenNodes, inputNodes);
	var h_o = matrixZeros(outputNodes, hiddenNodes);
	var bias = 0;
	for(var i = 0;i < i_h.length;i++){
		for(var j = 0;j < i_h[0].length;j++){
			if(Math.random() > 0.5){
				i_h[i][j] = parent1.input_hidden[i][j];
			}else{
				i_h[i][j] = parent2.input_hidden[i][j];
			}
		}
	}
	for(var i = 0;i < h_o.length;i++){
		for(var j = 0;j < h_o[0].length;j++){
			if(Math.random() > 0.5){
				h_o[i][j] = parent1.hidden_output[i][j];
			}else{
				h_o[i][j] = parent2.hidden_output[i][j];
			}
		}
	}
	if(Math.random() > 0.5){
		bias = parent1.bias;
	}else{
		bias = parent2.bias;
	}
	child.input_hidden = mutate(i_h);
	child.hidden_output = mutate(h_o);
	child.bias =  mutate(bias);
	return child;
}

function mutate(arr){
	var weights  = arr;
	if(weights.length){//if it's a number, the length is undefined which will be false
		for(var i = 0;i < weights.length;i++){
			for(var j = 0;j < weights[0].length;j++){
				if(Math.random() < mutateRate){
					//weights[i][j] += Math.random() * 0.2 - 0.1;
					weights[i][j] = Math.random() * 2 - 1;
				}
			}
		}
	}else{
		if(Math.random() < mutateRate){
			//weights += Math.random() * 0.2 - 0.1;
			weights = Math.random() * 2 - 1;
		}
	}
	return weights;
}

function findBest(pop){
	var lastBest = 0;
	var index = 0;
	for(var i = 0;i < pop.length;i++){
		if(pop[i].fitness > lastBest){
			lastBest = pop[i].fitness;
			index = i;
		}
	}
	return index;
}







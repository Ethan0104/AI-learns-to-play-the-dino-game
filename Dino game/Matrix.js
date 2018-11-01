function sigmoid(x){
	return 1/(1+Math.exp(-x));
}

function matrixZeros (rows, cols){
	var matrix = [];
	for(var i = 0;i < rows;i++){
		matrix[i] = []
		for(var j = 0;j < cols;j++){
			matrix[i][j] = 0;
		}
	}
	return matrix;
}

function matrixRandom(rows, cols, min, max) {//range from 0 - num
	var matrix = [];
	for(var i = 0;i < rows;i++){
		matrix[i] = [];
		for(var j = 0;j < cols;j++){
			matrix[i][j] = Math.random() * (max - min) + min;
		}
	}
	return matrix;
}

function multiplyMatrix(m1, m2){
	var result = [];
	var m1Row = m1.length;
	var m1Col = m1[0].length;
	var m2Row = m2.length;
	var m2Col = m2[0].length;
	
	//rows of the first matrix multiply the columns of the second matrix
	for(var i = 0;i < m1Row;i++){
		result[i] = [];
		for(var j = 0;j < m2Col;j++){
			var sum = 0;
			for(var k = 0;k < m1Col;k++){
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = sum;
		}
	}
	return result;
}

function fnApply(m, fn){//Apply the any function to every element of a matrix
	var rows = m.length;
	var cols = m[0].length;
	var result = [];
	for(var i = 0;i < rows;i++){
		result[i] = [];
		for(var j = 0;j < cols;j++){
			result[i][j] = fn(m[i][j]);
		}
	}
	return result;
}

function transposeMatrix(m){
	var rows = m.length;
	var cols = m[0].length;
	var result = matrixZeros(cols, rows);
	for(var i = 0;i < rows;i++){
		for(var j = 0;j < cols;j++){
			result[j][i] = m[i][j];
		}
	}
	return result;
}








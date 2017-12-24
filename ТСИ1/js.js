var hod = 0;
var hod1 = 0;
var hod2 = 0;
var arr = new Array();
for (var i = 0; i < 10; i++) {
	arr[i] = new Array();
	for (var j = 0; j < 10; j++) {
		arr[i][j] = 0;
	}
}
var table = document.getElementById('field'), rIndex, cIndex;
for (var i = 0; i < table.rows.length; i++) {
	for (var j = 0; j < table.rows[i].cells.length; j++) {
		table.rows[i].cells[j].onclick = function() {
			rIndex = this.parentElement.rowIndex;
			cIndex = this.cellIndex;
			if ((parseInt(hod / 3)) % 2 == 0) {
				var p = 'X';
				var check_par=checkRight(rIndex, cIndex, arr, p, hod);
				if ( check_par== p) {
					this.innerHTML = 'X';
					hod1++;
					hod++;
					
				}
				else {					
					if (check_par == 'XO') {
						this.innerHTML = '';
						this.bgColor = 'red';
						hod++;
						hod1++;
					}
				}
				if(hod1==3){
					hod1=0;
				}				
			}
			else {
				var p = 'O';
				var check_par=checkRight(rIndex, cIndex, arr, p, hod);
				if ( check_par== p) {
					this.innerHTML = 'O';
					hod2++;
					hod++;
				}
				else {
					if (check_par == 'OX') {
						this.innerHTML = '';
						this.bgColor = 'green';
						hod++;
						hod2++;
					}
				}
				if(hod2==3){
					hod2=0;
				}

			}
			if(win(arr)=='OX' && hod1 != 0 && hod2 != 0){
				alert('Выиграли О');
			}
			if(win(arr)=='XO' && hod1 != 0 && hod2 != 0){
				alert('Выиграли X');
			}
			if(win(arr)=='Ничья'){
				alert('Ничья');
			}
		}
	}
}

function checkRight(rIndex, cIndex, arr, p, h) {
	if ((rIndex == 0) && (cIndex == 0) && (h == 0)) {//первый ход	
		arr[rIndex][cIndex] = p;
		return p;
	}
	if ((rIndex == 9) && (cIndex == 9) && (h == 3)) {//первый ход
		arr[rIndex][cIndex] = p;
		return p;
	}
	if ((!((rIndex == 0) && (cIndex == 0))) && (h == 0)) {//первый ход
		return false;
	}
	if ((!((rIndex == 9) && (cIndex == 9))) && (h == 3)) {//первый ход
		return false;
	}
	if (((checkV(rIndex, cIndex, arr, p) == p) && (checkEat(rIndex, cIndex, arr, p) == 'OX')) || ((check(rIndex, cIndex, arr, p) == p) && (checkEat(rIndex, cIndex, arr, p) == 'OX'))) {
		arr[rIndex][cIndex] = 'OX';
		return 'OX';
	}
	if (((checkV(rIndex, cIndex, arr, p) == p) && (checkEat(rIndex, cIndex, arr, p) == 'XO')) || ((check(rIndex, cIndex, arr, p) == p) && (checkEat(rIndex, cIndex, arr, p) == 'XO'))) {
		arr[rIndex][cIndex] = 'XO';
		return 'XO';
	}
	if (check(rIndex, cIndex, arr, p) == p) {
		arr[rIndex][cIndex] = p;
		return p;
	}
	if (checkV(rIndex, cIndex, arr, p) == p) {
		arr[rIndex][cIndex] = p;
		return p;
	}
	return false;
}

function check(rIndex, cIndex, arr, p) { //проверка на соседство	
	var count = 0;
	var p1='OX', p2='XO';
	for (var i = -1; i < 2; i++) {
		for (var j = -1; j < 2; j++) {
			if (rIndex + i > -1 && rIndex + i<10 && cIndex + j>-1 && cIndex + j < 10) {
				if (arr[rIndex + i][cIndex + j] == p) {
					count++;
				}
			}
		}
	}
	if (count > 0 && arr[rIndex][cIndex] != p && arr[rIndex][cIndex] != p1 && arr[rIndex][cIndex] != p2) {
		return p;
	}
	else {
		return false;
	}

}

function checkV(rIndex, cIndex, arr, p) { //проверка на ряд 0 или Х
	var p1 = 0;
	if (p == 'X') {
		p1 = 'XO';
	}
	else {
		p1 = 'OX';
	}
	var i = rIndex - 1;
	if (i > -1) {
		while (arr[i][cIndex] == p1) {
			i--;
			if (arr[i][cIndex] == p && i > -1) {
				return p;
			}
		}
	}
	i = rIndex + 1;
	if (i < 10) {
		while (arr[i][cIndex] == p1) {
			i++;
			if (arr[i][cIndex] == p && i < 10) {
				return p;
			}
		}
	}

	i = rIndex - 1;

	var j = cIndex - 1;
	if (j > -1) {
		while (arr[rIndex][j] == p1 && j > -1) {
			j--;
			if (arr[rIndex][j] == p && j > -1) {
				return p;
			}
		}
	}


	j = cIndex + 1;
	if (j < 10) {
		while (arr[rIndex][j] == p1) {
			j++;
			if (arr[rIndex][j] == p&& j < 10) {
				return p;
			}
		}
	}

	j = cIndex - 1;
	if (i > -1 && j > -1) {
		while (arr[i][j] == p1) {
			j--;
			i--;
			if (arr[i][j] == p && i > -1 && j > -1) {
				return p;
			}
		}
	}

	j = cIndex - 1;
	i = rIndex + 1;
	if (j > -1 && i < 10) {
		while (arr[i][j] == p1) {
			j--;
			i++;
			if (arr[i][j] == p && i<10 && j>-1) {
				return p;
			}
		}
	}


	j = cIndex + 1;
	i = rIndex + 1;
	if (j < 10 && i < 10) {
		while (arr[i][j] == p1 && i < 10 && j < 10) {
			j++;
			i++;
			if (arr[i][j] == p && i < 10 && j < 10) {
				return p;
			}
		}
	}

	j = cIndex + 1;
	i = rIndex - 1;
	if (j<10 && i>-1) {
		while (arr[i][j] == p1 && i > -1 && j < 10) {
			j--;
			i++;
			if (arr[i][j] == p  && i > -1 && j < 10) {
				return p;
			}
		}
	}

	return false;
}

function checkEat(rIndex, cIndex, arr, p) {//проверка на съедение
	if (arr[rIndex][cIndex] != p  && arr[rIndex][cIndex] != 0) {
		if (p == 'X') {
			return 'XO';
		}
		else {
			return 'OX';
		}
	}
	return false;
}


function win(arr){
	var zero =0;
	var cross = 0;
	var count =0;
	for(var i=0;i<10;i++){
		for(var j=0; j<10; j++){
			if(arr[i][j] == 'O'){
				zero++;
			}
			if(arr[i][j] == 'X'){
				cross++;
			}
			if(arr[i][j] == 0){
				count++;
			}
		}
	}
	if(cross == 0){
		return 'OX';
	}
	if(zero == 0){
		return 'XO';
	}
	if(count == 0){
		return 'Ничья';
	}
	if(fortress(arr)){
		return 'Ничья';
	}
}

function fortress(arr){	
	var count =0;
	var massiv = [[0,0,0,'XO','OX','XO','X','X','XO','XO'],
			  [0,0,0,0,'OX','XO','XO',0,'XO','OX'],
			  [0,0,0,'XO','OX','XO','OX','XO','XO','XO'],
			  [0,0,0,'XO','OX','XO','XO','XO','XO','XO'],
			  [0,0,0,'OX','OX','XO','XO','OX',0,'OX'],
			  [0,0,0,'OX','OX','XO','XO','OX',0,0],
			  [0,'O','XO','OX','OX','XO','OX','OX',0,0],
			  [0,'O','OX','OX',0,'XO',0,0,0,0],
			  ['OX','OX','OX',0,0,0,0,0,0,0],
			  ['OX','OX','OX',0,0,0,0,0,0,0]];
	for(var i=0;i<10;i++){
		for(var j=0; j<10; j++){
			if(massiv[i][j]==arr[i][j]){
				count++;
			}
		}
	}
	if(count == 100){
		return 'Ничья';
	}
}

function pass(){
	if ((parseInt(hod / 3)) % 2 == 0){
		if(hod1 == 0){
			hod=hod+3;
		}
		else{
			alert('Вы уже начали ходить, поэтому ход пропустить нельзя');
		}
	}
	else{
		if(hod2 == 0){
			hod=hod+3;
		}
		else{
			alert('Вы уже начали ходить, поэтому ход пропустить нельзя');
		}
	}
}
//Suhail's First p5 Project

var myWidth = 600, myHeight = 400;
let s1 = [];

//Game block size (pixel)
blockSize = 10;

//Game width and height
let gameWidth = myWidth / blockSize;
let gameHeight = myHeight / blockSize;

//Game speed controller, frames per move(Lower = faster)
let gameSpeed = 5;
let checkLoop = 0;


function keyPressed(){


	if(key == 'W' && s1[0].down == false){
		s1[0].up = true;
		s1[0].right = false;
		s1[0].down = false;
		s1[0].left = false;
	}
	if(key == 'D' && s1[0].left == false){
		s1[0].up = false;
		s1[0].right = true;
		s1[0].down = false;
		s1[0].left = false;
	}
	if(key == 'S' && s1[0].up == false){
		s1[0].up = false;
		s1[0].right = false;
		s1[0].down = true;
		s1[0].left = false;
	}
	if(key == 'A' && s1[0].right == false){
		s1[0].up = false;
		s1[0].right = false;
		s1[0].down = false;
		s1[0].left = true;
	}

}
function setup() {
	//createCanvas(windowWidth, windowHeight);
	createCanvas(myWidth, myHeight);
	s = new snake();
	s1.push(s);

}

function draw() {

	if(checkLoop >gameSpeed){
		background(24,49,68);
		for(let i=0;i<(s1.length);i++){
			s1[i].updateLoc();
			s1[i].draw();
		}
		checkLoop = 0;
	}
	checkLoop++;
}

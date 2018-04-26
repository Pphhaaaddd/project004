//Suhail's Snake p5 Project 24/04/2018

var myWidth = 300, myHeight = 300;
let s1 = [];
let saveds1 = [];

let canvas1;
let message1, message2, message3, message4, message5, message6;
let slider1;
let generationNumber = 0;
let bestScore = 0;
let bestSnake;

//Number of snakes
let noOfSnakes = 50;

//Game block size (pixel)
blockSize = 10;

//Game width and height
let gameWidth = myWidth / blockSize;
let gameHeight = myHeight / blockSize;

//Game speed controller, frames per second
let gameSpeed = 10;


function setup() {
	//createCanvas(windowWidth, windowHeight);
	canvas = createCanvas(myWidth, myHeight);
	canvas.style("border-style","solid");
	canvas.style("border-width","3px");
	slider1 = createSlider(1,1000,1);
	slider1.width = "100%";
	message2 = createElement("p","Speed : " + slider1.value());
	message3 = createElement("p","Generation : " + generationNumber);
	message4 = createElement("p","Best Score : ");
	message5 = createElement("p","Current Score : ");
	message6 = createElement("p","Number of Snakes alive : ");

	for(let i=0;i<noOfSnakes;i++){
		s = new snake();
		s1.push(s);
	}
}

function draw() {

	message2.html("Speed : " + slider1.value());
	for(let k=0;k<slider1.value();k++){
		background(255);
		for(let j=s1.length-1;j>=0;j--)
			if(!s1[j].alive)
				saveds1.push(s1.splice(j,1)[0]);

		background(255);
		for(let i=0;i<(s1.length);i++){
			s1[i].think();
			s1[i].updateLoc();
			s1[i].draw();
		}

		if(s1.length == 0){
			//console.log(saveds1);
			nextGen();
			generationNumber++;
			message3.html("Generation : " + generationNumber);

		}
		message5.html("Current Score : " + s1[0].score);
		message6.html("Number of Snakes alive : " + s1.length);

		frameRate(gameSpeed);
	}
}

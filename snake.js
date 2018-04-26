class snake{
	constructor(brain){
		this.headX=gameWidth/2,this.headY=gameHeight/2;
		this.snakeBody = [];

		//Create its body with 7 blocks for now
		this.snakeBody.push( new body(this.headX,this.headY) );
		this.snakeBody.push( new body(this.headX,this.headY+1) );
		this.snakeBody.push( new body(this.headX,this.headY+2) );

		//Which way is the snake moving, Initialized to move up
		this.up = true;
		this.right = false;
		this.down = false;
		this.left = false;

		//Dead or alive?
		this.alive = true;

		//The food for this snake
		this.food = new body(floor(random(gameWidth)),floor(random(gameHeight)));

		//time alive and score
		this.lifetime = 0;
		this.score = 0;
		this.timeWithoutFood = 0;

		//Position food not on snake's body
		this.positionFood();

		//To check if it ate the food
		this.foodEaten = false;

		//The brain of the snakes		if (brain instanceof NeuralNetwork) {
		if (brain instanceof NeuralNetwork) {
			this.brain = brain.copy();
			this.brain.mutate(mutate);
		} else {
			this.brain = new NeuralNetwork(24, 24, 4);
		}
	}
	draw(){
		//Rest of the body
		stroke(0,100,100,10);
		fill(0,0,255,10)
		if(this.alive)
		fill(0,10);
		for(let i=1;i<this.snakeBody.length;i++)
		this.snakeBody[i].draw();

		//Give head different colour
		if(this.alive)
		fill(255,0,255,10);
		stroke(0,200,200);
		this.snakeBody[0].draw();

		//draw the food
		fill(0,200,0,100);
		stroke(0,200,0,100);
		this.food.draw();

	}
	updateLoc(){
		let b;

		//Dead if it hit the edge
		if( (this.headY == gameHeight-1 && this.down == true) || (this.headY == 0 && this.up == true) || (this.headX == gameWidth-1 && this.right == true) || (this.headX == 0 && this.left == true))
		this.alive = false;

		//Check if it hit itself
		for(let i=1;i<this.snakeBody.length;i++)
		if(this.snakeBody[i].x == this.headX && this.snakeBody[i].y == this.headY)
		this.alive = false;

		//Move the snake forward in its current direction
		if(this.alive){

			if(this.up){
				b = new body(this.headX,this.headY-1);
				this.headY-=1;
			}
			if(this.right){
				b = new body(this.headX+1,this.headY);
				this.headX+=1;
			}
			if(this.down){
				b = new body(this.headX,this.headY+1);
				this.headY+=1;
			}
			if(this.left){
				b = new body(this.headX-1,this.headY);
				this.headX-=1;
			}
			if(this.foodEaten == false)
			this.snakeBody.pop();
			else
			this.foodEaten = false;
			this.snakeBody.unshift(b);
			this.lifetime++;


			this.score = this.lifetime*0.1 + (this.snakeBody.length-3)*100;

			//Check if it ate the food
			if(this.headX == this.food.x && this.headY == this.food.y){
				this.foodEaten = true;
				this.timeWithoutFood = 0;
			}
			else
				this.timeWithoutFood++;

			if(this.timeWithoutFood > 5000){
				this.score = 0;
				this.alive = false;
			}
			this.positionFood();
		}

	}

	positionFood(){
		for(let i=0;i<this.snakeBody.length;i++){
			if(this.food.x == this.snakeBody[i].x && this.food.y == this.snakeBody[i].y){
				this.food = new body(floor(random(gameWidth)),floor(random(gameHeight)));
				i=0;
			}
		}
	}

	think(){

		let inputs = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
		inputs[0] = this.headX / gameWidth;
		inputs[1] = this.headY / gameHeight;

		if(this.up)
		inputs[2] = 1.0;
		if(this.right)
		inputs[3] = 1.0;
		if(this.down)
		inputs[4] = 1.0;
		if(this.left)
		inputs[5] = 1.0;

		inputs[6] = this.food.x / gameWidth;
		inputs[7] = this.food.y / gameHeight;

		//inputs = [1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0];

		let output = this.brain.predict(inputs);
		//console.log(output);
		if(output[0]>output[1] && output[0]>output[2] && output[0]>output[3])
		this.moveUp();
		else if(output[1]>output[2] && output[1]>output[3])
		this.moveRight();
		else if(output[2]>output[3])
		this.moveDown();
		else
		this.moveLeft();
	}

	moveUp(){
		if(this.down == false){
			s1[0].up = true;
			s1[0].right = false;
			s1[0].left = false;
		}
	}
	moveRight(){
		if(this.left == false){
			s1[0].up = false;
			s1[0].right = true;
			s1[0].down = false;
		}
	}
	moveDown(){
		if(this.up == false){
			s1[0].right = false;
			s1[0].down = true;
			s1[0].left = false;
		}
	}
	moveLeft(){
		if(this.right == false){
			s1[0].up = false;
			s1[0].down = false;
			s1[0].left = true;
		}
	}

	copy() {
		return new snake(this.brain);
	}

};

function mutate(x) {
	if (random(1) < 0.4) {
		let offset = randomGaussian() * 0.8;
		let newx = x + offset;
		return newx;
	} else {
		return x;
	}
}

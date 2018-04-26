class snake{
	constructor(){
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
		//Position food not on snake's body
		this.positionFood();

		//To check if it ate the food
		this.foodEaten = false;
	}
	draw(){
		//Rest of the body
		stroke(0,200,200);
		fill(0,0,255)
		if(this.alive)
			fill(0);
		for(let i=1;i<this.snakeBody.length;i++)
			this.snakeBody[i].draw();

		//Give head different colour
		if(this.alive)
			fill(200,0,200);
		stroke(0,200,200);
		this.snakeBody[0].draw();

		//draw the food
		fill(0,200,0);
		stroke(0,200,0);
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

		}

		//Check if it ate the food
		if(this.headX == this.food.x && this.headY == this.food.y)
			this.foodEaten = true;
		this.positionFood();
	}

	positionFood(){
		for(let i=0;i<this.snakeBody.length;i++){
			if(this.food.x == this.snakeBody[i].x && this.food.y == this.snakeBody[i].y){
				this.food = new body(floor(random(gameWidth)),floor(random(gameHeight)));
				i=0;
			}
		}
	}

};

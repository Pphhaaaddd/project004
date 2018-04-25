class snake{
	constructor(){
		this.headX=gameWidth/2,this.headY=gameHeight/2;
		this.snakeBody = [];
		this.snakeBody.push( new body(this.headX,this.headY) );
		this.snakeBody.push( new body(this.headX,this.headY+1) );
		this.snakeBody.push( new body(this.headX,this.headY+2) );
		this.snakeBody.push( new body(this.headX,this.headY+3) );
		this.snakeBody.push( new body(this.headX,this.headY+4) );
		this.snakeBody.push( new body(this.headX,this.headY+5) );
		this.snakeBody.push( new body(this.headX,this.headY+6) );

		//Which way is the snake moving, Initialized to move up
		this.up = true;
		this.right = false;
		this.down = false;
		this.left = false;

		//Dead or alive?
		this.alive = true;
	}
	draw(){
		//Rest of the body
		stroke(0,200,200);
		fill(0);
		for(let i=1;i<this.snakeBody.length;i++){
			this.snakeBody[i].draw();
		}

		//Give head different colour
		fill(200,0,200);
		stroke(0,200,200);
		this.snakeBody[0].draw();

	}
	updateLoc(){
		let b = this.snakeBody[0];

		//Dead if it hit the edge
		if( (this.headY == gameHeight-1 && this.down == true) || (this.headY == 0 && this.up == true) || (this.headX == gameWidth-1 && this.right == true) || (this.headX == 0 && this.left == true)){
			this.alive = false;
		}

		//Check if it itself
		for(let i=1;i<this.snakeBody.length;i++)
			if(this.snakeBody[i].x == this.headX && this.snakeBody[i].y == this.headY){
				this.alive = false;
			}

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
			this.snakeBody.pop();
			this.snakeBody.unshift(b);

		}

	}

};

class body{
  constructor(_x,_y){
    this.x=_x;
    this.y=_y;
  }

  draw(){
    rect(this.x*blockSize,this.y*blockSize,blockSize-1,blockSize-1);
  }
};



function nextGen(){
  //CalculateFitness();
  //console.log(saveds1);

  // Normalize the fitness values 0-1
  CalculateFitness();
  // Generate a new set of Circles
  s1 = generate(saveds1);
  // Copy those Circles to another array
  //saveds1 = s1.slice();
  saveds1 = [];
}

function CalculateFitness(){

  let sum=0, highestScore = 0, bestSnakeThisGen;

  for (let i = 0; i < saveds1.length; i++) {
    if(saveds1[i].score > highestScore){
      highestScore = saveds1[i].score;
      bestSnakeThisGen = saveds1[i];

    }
    saveds1[i].score = pow(saveds1[i].score, 3);
  }

  for (let c of saveds1)
    sum += c.score;
  for(let c of saveds1)
    c.fitness = c.score / sum;

  //console.log(sum);
  if(highestScore > bestScore){
    bestScore = highestScore;
    message4.html("Best Score : " + bestScore);
    bestSnake = bestSnakeThisGen;
  }
  //console.log(bestSnake);


}

// Generate a new population of Circles
function generate(oldCircles) {
  let newCircles = [];
  for (let i = 0; i < oldCircles.length; i++) {
    // Select a Circle based on fitness
    let Circle = poolSelection(oldCircles);
    newCircles[i] = Circle;
  }
  return newCircles;
}


// An algorithm for picking one circle from an array
// based on fitness
function poolSelection(Snakes) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= Snakes[index].fitness;
    //console.log(Circles[index].fitness);
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // (this includes mutation)
  return Snakes[index].copy();
}

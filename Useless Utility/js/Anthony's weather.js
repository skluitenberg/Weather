let bugs = new Array(); // Declare object

let url;
let weather;
let zip_code = "66502"; // this is our default value we will allow the user reset it
let api_key = "b40ad42b19570cda654f98c76b597e22";

let tempK;
let tempF;
let description;

function preload() {
    // Get the most recent earthquake in the database
    url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip_code + ",us&appid=" + api_key;
    weather = loadJSON(url);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Convert from Kelvin to Fahrenheit
  //T(°F) = T(K) × 9/5 - 459.67
  tempF = (weather.main.temp * 1.8) - 459.67; 

  // Create object
  for (i = 0; i < tempF; i++) { 
    bugs.push( new Jitter() );
  }
  
}

function draw() {
  background(50, 89, 100);
  for (i = 0; i < tempF; i++) { 
    bugs[i].move();
    bugs[i].display();
  }
  
}


// Jitter class
class Jitter {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.diameter = random(10, 30);
    this.speedX = random(0, 3);
    this.speedY = random(0, 3);
  }

  move() {
    
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;

    if (this.x > windowWidth) {
        this.speedX = this.speedX* -1;
    }

    if (this.x < 0) {
        this.speedX = this.speedX* -1;
    }

    if (this.y > windowHeight) {
        this.speedY = this.speedY * -1;
    }
    
    if (this.y < 0) {
        this.speedY = this.speedY * -1;
    }


  }

  display() {
    noStroke();
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
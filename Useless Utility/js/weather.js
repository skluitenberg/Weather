let bugs = new Array(); // Declare object

let url;
let weather;
let zip_code = "66502"; // this is our default value we will allow the user reset it
let api_key = "8416507dbf978ee3eab3b8b9100581d3";

let tempK;
let tempF;
let c = 245;
let s = 100;
let g = 220;
let f = .005;

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

  for (i = 0; i < tempF; i++) { 
    bugs.push( new Jitter() );
  }
}

function draw() {
  background(0,g,c);
  stroke(s);

  for (i = 0; i < tempF; i ++) {
    bugs[i].move();
    bugs[i].display();
  } 
}

class Jitter {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.diameter = random(5, 75);
    this.speedX = weather.wind.gust*.5;
    this.speedY = weather.wind.speed*.5;
  }

  move() {
        
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    this.diameter = this.diameter + 1;

    if (this.x > width) {
      this.x = 0;
    }

    if (this.y > height) {
        this.y = 0;
    }
      
    if (this.diameter > weather.main.humidity*3) {
        this.diameter = 0;
      }
    }

 
  display() {
    fill(175, 50, 200, weather.visibility*f);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

function keyPressed (){
  
  if (c === 245) {
    c = 100;
  } else {
    c = 245;
  }
  if (g === 220) {
    g =50;
  } else {
    g= 220;
  }
  if (s === 100) {
    s = 255;
  } else {
    s = 100;
  }
}

function mouseClicked() {
  
  if (f === .005) {
    f = f + .008;
  } else {
    f = .005;
  }
}
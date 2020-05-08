var gameMode = 6;
var colors = [];
var pickedColor;
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");

resetBtn.addEventListener("click", function(){
	Reset();
})

function ChangeColors(color){
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function PickColor(){
	var random = Math.floor(Math.random() * colors.length);

	return colors[random];
}

function RandomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function GenerateRandomColors(num){
	var arr = [];

    for(var i=0; i<num; i++){
       arr.push(RandomColor());
    }

	return arr;
}

function Reset(){
	colors = GenerateRandomColors(gameMode);
	pickedColor = PickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
		   squares[i].style.display = "block";
           squares[i].style.backgroundColor = colors[i];
        } else {
           squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    resetBtn.textContent = "New Colors";
}

function Init(){
	//modeBtns event listeners
	for(var i=0; i<modeBtns.length; i++){
	  modeBtns[i].addEventListener("click", function(){
		modeBtns[0].classList.remove("selected");
		modeBtns[1].classList.remove("selected");
		this.classList.add("selected");
        this.textContent === "Easy" ? gameMode = 3 : gameMode = 6;
        Reset();
	  })
    } 

    for(var i = 0; i < squares.length; i++){
      //event listener
      squares[i].addEventListener("click", function(){
  	    //compare color of picked square with pickedColor
  	    var clickedColor = this.style.backgroundColor;
  	    if (clickedColor === pickedColor){
          messageDisplay.textContent = "Correct!";
          resetBtn.textContent = "Play Again?";
          ChangeColors(clickedColor);
          document.getElementsByTagName("h1")[0].style.backgroundColor = pickedColor;
  	    } else{
  	        this.style.backgroundColor = "#232323";
  	        messageDisplay.textContent = "Try Again!";
  	    }
      })
    }  

    Reset();
}


Init();
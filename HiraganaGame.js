var myGamePieces = new Array();
var activePiece = 0;
const canvasWidth = 800;
const canvasHeight = 600;
const characterWidth = 80;
const characterHeight = 80;

function startGame() {
	initGamePieces();
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
		this.canvas.addEventListener('click', function(event) {
			var rect = this.getBoundingClientRect();
			var mouseX = (event.clientX - rect.left)
			var mouseY = (event.clientY - rect.top);
			if (mouseX >= myGamePieces[activePiece].x && mouseX <= (myGamePieces[activePiece].x + characterWidth)) {
				if (mouseY >= myGamePieces[activePiece].y && mouseY <= (myGamePieces[activePiece].y + characterHeight)) {
					activePiece++;
					if (activePiece <= 45) {
						document.getElementById("tip").innerHTML = "The next letter is \"" + myGamePieces[activePiece].character + "\"";
					}
				}
			}
		  }, false);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    },
	end : function() {
		document.getElementById("tip").innerHTML = "";
		document.getElementById("instructions").style.visibility = "hidden";
		document.getElementById("playAgain").style.visibility = "visible";
	},
	restart : function() {
		activePiece = 0;
		document.getElementById("instructions").style.visibility = "visible";
		document.getElementById("tip").innerHTML = "The next letter is \"" + myGamePieces[activePiece].character + "\"";
		document.getElementById("playAgain").style.visibility = "hidden";
	}
}

function component(letter) {
	this.image = new Image();
	this.image.src = letter;
	this.character = letter.substring(27, letter.length - 4);
    this.width = characterWidth;
    this.height = characterHeight;
    this.x = Math.random() * (canvasWidth - characterWidth);
    this.y = Math.random() * (canvasHeight - characterHeight);
	this.speedX = (Math.random() * 2) - 1;
    this.speedY = (Math.random() * 2) - 1;
    
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
		if (this.x <= 0 || this.x >= (canvasWidth - characterWidth)) {
			this.speedX = this.speedX * -1;
		}
		if (this.y <= 0 || this.y >= (canvasHeight - characterHeight)) {
			this.speedY = this.speedY * -1;
		}
    }
	
	this.update = function() {
        ctx = myGameArea.context;
		ctx.drawImage(this.image, 
			this.x, 
			this.y,
			this.width, this.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
	
	if (activePiece >= 46) {
		myGameArea.end();
	}
	
	for (i = activePiece; i < 46; i++) {
        myGamePieces[i].newPos();
		myGamePieces[i].update();
    }
}
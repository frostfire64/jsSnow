$(document).ready(function(){
	const height = $(window).height() + 50;
	const width = $(window).width();

	$("#snow").attr("height", height+"px");
	$("#snow").attr("width", width+"px");

	function SnowParticle (canvasContext, x = null, y = null){
		this.canvasContext = canvasContext;
		this.x = x;
		this.y = y;
		this.height = 200;
		this.image = './img/tiny_snow.png';
		this.imageObj = new Image();
		this.imageObj.src = this.image;
		this.pixelPerTick = 1 //speed of the fall
		this.setCoords = function(x,y){
			this.x = x;
			this.y = y;
		};
		this.lowerCoords = function(){
			this.setCoords(this.x, this.y + this.pixelPerTick);
			// this.setCoords(this.x, this.y + Math.floor((Math.random() * 3) + 1) );
		};
		this.setHeight = function(height){
			if (height < 0){
				throw new Error('Height cannot be lower than 0');
			}
		};
		this.render = function() {
			if (this.y > height + 10) {
				this.reset();
			}
			this.canvasContext.drawImage(this.imageObj, this.x, this.y);
		};
		this.fall = function() {
			this.lowerCoords();
			this.render();
		};
		this.randomizeSpeed = function() {
			this.pixelPerTick = Math.floor((Math.random() * 5) + 1);
		}
		this.reset = function() {
			if (Math.floor((Math.random() * 1000) + 1) <= 2){
				this.randomizeSpeed();
				this.x = randomizeX();
				this.y = 0;
				return true;
			}
			return false;
		}
		this.randomizeX = function() {
			return Math.floor((Math.random() * canvasSize.width) + 1);
		}
	};

	let canvas = document.getElementById('snow');
	let context = canvas.getContext('2d');

	// context.font = '10pt Calibri';
	// context.fillStyle = 'white';
	// context.fillText('Happy Shitposting', 10, 100);
	// let imageObj = new Image();

	const canvasSize = canvas.getBoundingClientRect();

	function randomizeX() {
		return Math.floor((Math.random() * canvasSize.width) + 1);
	}

	let particles = [];

	for (var i = 300 - 1; i >= 0; i--) {
		particles[i] = new SnowParticle(context, 0, height + 200);
		particles[i].reset();
		particles[i].render();
	}

	var fps, fpsInterval, startTime, now, then, elapsed;
	fps = 60;

	fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    requestAnimationFrame(animationTick);

	function animationTick() {

		requestAnimationFrame(animationTick);

		// calc elapsed time since last loop

	    now = Date.now();

	    elapsed = now - then;

	    // if enough time has elapsed, draw the next frame

	    if (elapsed > fpsInterval) {

	        // Get ready for next frame by setting then=now, but also adjust for your
	        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
	        then = now - (elapsed % fpsInterval);

	        // Put your drawing code here

	        // console.log('requestAnimationFrame');
			context.clearRect(0, 0, canvas.width, canvas.height);
			particles.forEach(function(p) {
				p.fall();
			});
	    }
	}

});
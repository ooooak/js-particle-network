var Particles = function (canvas, options) {
    this.canvasDiv = canvas;
    this.canvasDiv.size = {
      'width': this.canvasDiv.offsetWidth,
      'height': this.canvasDiv.offsetHeight
    };

    if (options == void 0)
    	options = {}

    // Set options
    this.options = {
      particleColor:  '#fff',
      velocity: this.getVelocity(options.velocity),
      density: this.getDensity(options.density)
    };

    this.initialise();
 };

Particles.prototype.initialise = function(){
 	this.bgDiv = document.createElement('div');
    this.canvasDiv.appendChild(this.bgDiv);
    this.setStyles(this.bgDiv, {
		'position': 'absolute',
		'top': 0,
		'left': 0,
		'bottom': 0,
		'right': 0,
		'z-index': 1,
		'background': '#f96b6b'
    });

    // create canvas

    this.canvas = document.createElement('canvas');

    this.canvasDiv.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.canvasDiv.size.width;
    this.canvas.height = this.canvasDiv.size.height;
    this.setStyles(this.canvasDiv, { 'position': 'relative' });
    this.setStyles(this.canvas, {
      'z-index': '20',
      'position': 'relative'
    });


    this.particles = [];
    for (var i = 0; i < this.canvas.width * this.canvas.height / this.options.density; i++) {
      this.particles.push(new Particle(this));
    }

    requestAnimationFrame(this.update.bind(this));
};

Particles.prototype.update = function (){
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.ctx.globalAlpha = 1;

	for (var i = this.particles.length - 1; i >= 0; i--) {
		this.particles[i].update();
		this.particles[i].draw();


		for (var j = this.particles.length - 1;  j > i; j--) {
			var distance = Math.sqrt(
				Math.pow(this.particles[i].x - this.particles[j].x, 2)
          		+ Math.pow(this.particles[i].y - this.particles[j].y, 2)
          	);
          	if (distance > 120){
          		continue;
          	}

          	this.ctx.beginPath();
	        this.ctx.strokeStyle = this.options.particleColor;
	        this.ctx.globalAlpha = (120 - distance) / 120;
	        this.ctx.lineWidth = 0.7;
	        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
	        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
	        this.ctx.stroke();
		}
	}

    requestAnimationFrame(this.update.bind(this));
};




Particles.prototype.setStyles = function (div, styles) {
	for (var property in styles) {
		div.style[property] = styles[property];
	}
};


Particles.prototype.getVelocity = function(speed) {
    if (speed === 'fast') {
      return 1;
    } else if (speed === 'slow') {
      return 0.33;
    } else if (speed === 'none') {
      return 0;
    }

    return 0.66;
};

// Helper method to set density multiplier
Particles.prototype.getDensity = function (density) {
    if (density === 'high') {
      return 4000;
    } else if (density === 'low') {
      return 20000;
    }
    return !isNaN(parseInt(density, 10)) ? density : 10000;
}

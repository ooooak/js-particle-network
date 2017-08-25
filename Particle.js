var Particle = function (parent) {

    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.particleColor = parent.options.particleColor;

    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.velocity = {
      x: (Math.random() - 0.5) * parent.options.velocity,
      y: (Math.random() - 0.5) * parent.options.velocity
    };
};

Particle.prototype.update = function(){
    if (this.x > this.canvas.width + 20 || this.x < -20){
        this.velocity.x = -this.velocity.x;
    }

    if (this.y > this.canvas.height + 20 || this.y < -20){
        this.velocity.y = -this.velocity.y;    
    }

    // Update position
    this.x += this.velocity.x;
    this.y += this.velocity.y;
};

// just creating circle
Particle.prototype.draw = function(){
	this.ctx.beginPath();
    this.ctx.fillStyle = this.particleColor;
    this.ctx.globalAlpha = 0.7;
    this.ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
    this.ctx.fill();
};

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


var x= 0;
var y = 0;
var width = 1000;
var height = 100;

var progress_color = "rgb(60, 0, 240)";
var right_bar_color = "rgb(102, 215, 255)";
var thumb = "rgb(252, 0, 0)";
var outer_thumb = "rgba(252, 0, 0, 0.5)";

var thumb_radius = height/2;
var progress = 50;
var progress_value = 150;
var max_progress_value = 300;

var mouse_down = false;

x = thumb_radius;
y = y + thumb_radius / 2;
width = width + thumb_radius;
height = height;
max_progress_value = width;
progress_value = width / 50;

canvas.addEventListener("mousedown", mouseDownEvent,false);
canvas.addEventListener("mouseup", mouseUpEvent,false);
canvas.addEventListener("mousemove", mouseMoveEvent,false);

function mouseDownEvent(e) {
  mouse_down = true;
}

function mouseUpEvent(e) {
 mouse_down = false;
  paint();
}

function mouseMoveEvent(e) {
 progressSet(e);
}


paint();


function progressSet( e) {
	if (mouse_down)
        {
            progress = (( e.clientX - x) / width) * 100;
            if (progress < 0)
            {
                progress = 0;
            } else if (progress > 100)
            {
                progress = 100;
            }
            setProgress(progress * max_progress_value / 100);
            paint();
        }
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }

}

function paint(){
	
        //graphics.setColor(right_bar_color);
        width = canvas.width;
        height = canvas.height;
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
     
        context.fillStyle = right_bar_color;

        //graphics.fillRoundRect(x, y + height / 4, this.width, this.height / 2, height, height);
		roundRect(context, x, y + height / 3, width, height / 3, 50,true);
		context.fill();
      	context.closePath();
        //System.out.println(height);

        //graphics.setColor(progress_color);
        context.fillStyle = progress_color;

        //graphics.fillRoundRect(x, y, this.width * (int) progress / 100, this.height, height, height);
        context.beginPath();
		context.rect(x, y + height / 4, width * progress / 100, height/2);
		context.fill();
      	context.closePath();

       if (mouse_down)
       {
       		var radius = thumb_radius + thumb_radius / 2;
            context.fillStyle = outer_thumb;
         	context.beginPath();
            context.arc((width * progress / 100) + (x), y + this.height / 2, radius, 0*Math.PI,2*Math.PI);
			context.fill();
      		context.closePath();

         	context.beginPath();
            context.fillStyle = thumb;
            context.arc((width * progress / 100) + (x), y + this.height / 2 , thumb_radius, 0*Math.PI,2*Math.PI);
       		context.fill();
      		context.closePath();
            
       } else
        {
            var radius = thumb_radius - 4;
            //graphics.setColor(thumb);
        	context.fillStyle = thumb;
           // graphics.fillOval((this.width * (int) progress / 100) + (x - (radius / 2)), y + this.height / 2 - radius / 2, radius, radius);
            context.beginPath();
            x_arc = (width *  progress / 100) + x;
            y_arc = y + height / 2;
      		context.arc(x_arc,  y_arc, radius, 0*Math.PI,2*Math.PI);
      		context.fill();
      		context.closePath();
        }
}

function setProgress( value ){
        if (value < 0)
        {
            progress_value = 0;
        } else if (value > max_progress_value)
        {
            progress_value = max_progress_value;
        } else
        {
            progress_value = value;
        }

        progress = (progress_value / max_progress_value) * 100;
       
        paint();
    }

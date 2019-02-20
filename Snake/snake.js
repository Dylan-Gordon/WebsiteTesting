window.onload=function() {
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);
	document.addEventListener("keydown",keyPush);
	myGame = setInterval(game,1000/15);
}
px=py=10;
gs=10;
tc=40;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 1;

var myGame;
function game() {
	px+=xv;
	py+=yv;
	
	if(px<0) {
		resetGame();
	}
	if(px>tc-1) {
		resetGame();
	}
	if(py<0) {
		resetGame();
	}
	if(py>tc-1) {
		resetGame();
	}
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);
	
	ctx.fillStyle="lime";
	ctx.fillRect(px*gs,py*gs,gs-1,gs-1);
	for(var i=0;i<trail.length;i++) {
		ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-1,gs-1);
		if(trail[i].x==px && trail[i].y==py) {
			tail = 1;
		}
	}
	trail.push({x:px, y:py});

	while(trail.length>tail) {
	trail.shift();
	}

	if(ax==px && ay==py) {
	var check = false;
		tail++;
		ax=Math.floor(Math.random()*tc);
		ay=Math.floor(Math.random()*tc);
		while(!check){
		while(ax <= 1*gs || ax >= tc-gs){
			ax=Math.floor(Math.random()*tc);
		}
		while(ay <= 1*gs || ay >= tc-gs){
			ay=Math.floor(Math.random()*tc);
		}
		if(!ifSpawnsOnSnake(ax, ay))
		{
			check = true;
		}
		else
		{
			ax=Math.floor(Math.random()*tc);
			ay=Math.floor(Math.random()*tc);
		}
		}
	}
	ctx.fillStyle="red";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}

function ifSpawnsOnSnake(ax, ay)
{
	for(var i=0; i < trail.length; i++)
	{
		if(trail[i].x==ax && trail[i].y==ay)
			return true;
	}
	return false;
}

function keyPush(evt) {
	switch(evt.keyCode) {
        case 37:
            if(xv!=1)
			    xv=-1;yv=0;
			break;
        case 38:
            if(yv!=1)
			    xv=0;yv=-1;
			break;
        case 39:
            if(xv!=-1)
			    xv=1;yv=0;
			break;
        case 40:
            if(yv != -1)
			    xv=0;yv=1;
			break;
	}
}

function resetGame(){
	px=py=10;
	gs=10;
	tc=40;
	ax=ay=15;
	xv=yv=0;
	trail=[];
	tail = 1;
}
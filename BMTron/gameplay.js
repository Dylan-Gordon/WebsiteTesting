window.onload=function() {
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
    resetGame();
    window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    }, false);
    document.addEventListener("keydown",keyPush);
}
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

player1Ready=false;
player2Ready=false;
gameOn = false;
px=py=10;
p1x=p1y=10;
p2x=p2y=30;
gs=10;
tc=40;
ax=ay=15;
xv=yv=0;
x1v=0;
y1v=1;
x2v=0;
y2v=-1;
trail=[];
trail1=[];
trail2=[];
tail = 1;
player1Wins=0;
player2Wins=0;
var myGame;
function game() {
	px+=xv;
	py+=yv;
	p1x+=x1v;
	p1y+=y1v;
	p2x+=x2v;
	p2y+=y2v;
	if(p1x<0 || p1x>tc-1 || p1y < 0 || p1y > tc-1) {
		resetGame1();
	}
	if(p2x<0 || p2x>tc-1 || p2y < 0 || p2y > tc-1) {
		resetGame2();
	}
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);
	
	ctx.fillStyle="white";
	if(p1x==p2x && p1y == p2y)
	{
		resetGame();
	}
	ctx.fillRect(p1x*gs, p1y*gs, gs-2, gs-2);
	for(var i=0;i<trail1.length;i++) {
		ctx.fillRect(trail1[i].x*gs,trail1[i].y*gs,gs-2,gs-2);
		if(trail1[i].x==p1x && trail1[i].y==p1y) {
			resetGame1();
		}
		for(var j = 0; j < trail2.length; j++)
		{
			if(trail2[j].x==p1x && trail2[j].y==p1y) {
				resetGame1();
			}
		}
	}
	ctx.fillStyle="orange";
	ctx.fillRect(p2x*gs, p2y*gs, gs-2, gs-2);
	for(var i=0;i<trail2.length;i++) {
		ctx.fillRect(trail2[i].x*gs,trail2[i].y*gs,gs-2,gs-2);
		if(trail2[i].x==p2x && trail2[i].y==p2y) {
			resetGame2();
		}
		for(var j = 0; j < trail1.length; j++)
		{
			if(trail1[j].x==p2x && trail1[j].y==p2y) {
				resetGame2();
			}
		}
	}
	trail1.push({x:p1x,y:p1y});
	trail2.push({x:p2x,y:p2y});
	trail2.push({x:p2x,y:p2y});
	while(trail.length>tail) {
		trail.shift();
	}
}
function keyPush(evt) {
	switch(evt.keyCode) {
        case 37:
            if(!player1Ready)
                player1Ready=true;
			if(x1v!=1){
				x1v=-1;y1v=0;
			}
			break;
        case 38:
            if(!player1Ready)
                player1Ready=true;
			if(y1v!=1){
				x1v=0;y1v=-1;
			}
			break;
        case 39:
			if(x1v!=-1){
				x1v=1;y1v=0;
            }
            if(!player1Ready)
                player1Ready=true;
			break;
		case 40:
			if(y1v!=-1){
				x1v=0;y1v=1;
            }
            player1Ready=true;
			break;
		case 65:
			if(x2v!=1){
				x2v=-1;y2v=0;
            }
            if(!player2Ready)
                player2Ready=true;
			break;
		case 83:
			if(y2v!=-1){
				x2v=0;y2v=1;
            }
            if(!player2Ready)
                player2Ready=true;
			break;
		case 68:
			if(x2v!=-1){
				x2v=1;y2v=0;
            }
            if(!player2Ready)
                player2Ready=true;
			break;
		case 87:
			if(y2v!=1){
				x2v=0;y2v=-1;
            }
            if(!player2Ready)
                player2Ready=true;
			break;
    }
    if(player2Ready && player1Ready &&!gameOn)
    {
        document.getElementById("instructions").innerHTML = "Round in Progress";
        gameOn = true;
        myGame = setInterval(game,1000/15);
    }
}

function resetGame(){
    gameOn = false;
    player1Ready=false;
    player2Ready=false;
	clearInterval(myGame);
	document.getElementById("instructions").innerHTML = "Orange is WASD, White is arrow keys.";
	document.getElementById("score").innerHTML = "P1: " + player1Wins + ", P2: " + player2Wins;
	p1x=p1y=10;
	p2x=p2y=30;
	gs=10;
	tc=40;
	ax=ay=15;
	x1v=0;
	y1v=1;
	x2v=0;
	y2v=-1;
	trail1=[];
    trail2=[];
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
    ctx.fillStyle="orange";
	ctx.fillRect(p2x*gs, p2y*gs, gs-2, gs-2);
    ctx.fillStyle="white";
    ctx.fillRect(p1x*gs, p1y*gs, gs-2, gs-2);
}

function resetGame1(){
	player2Wins++;
	resetGame();
}

function resetGame2(){
	player1Wins++;
	resetGame();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}
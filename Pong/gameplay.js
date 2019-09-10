// Arrow Keys
const UPKEY = 38;
const DOWNKEY = 40;
const SPACEBAR = 32;

// Standard variables
const BLACK = 0;
const WHITE = 255;

// general settings
const heartBeatFrequency = 1000/15;
const resolution = 20;
const sliderLength = 10;

// Game variables
var heartBeat;
var sliderDirection = 0;
var sliderSegmentsPositions;

window.onload=function()
{
	gameboard = document.getElementById("gameboard");

	resetGameBoard();

	overrideUpAndDownKeyEventListeners();
	overrideSpacebarEventListener();

}

function keyPush(event)
{
	console.log("keyPush event");
	switch(event.keyCode)
	{
		case UPKEY:
		{
			sliderDirection = 1;
			break;
		}
		case DOWNKEY:
		{
			sliderDirection = -1;
			break;
		}
		case SPACEBAR:
		{
        	heartBeat = setInterval(game, 1000/15);
        	break;
		}
		default:
		{
			break;
		}
	}
}

function game()
{
	var segmentsDrawn = 0;
	while(segmentsDrawn < sliderSize)
	{


		segmentsDrawn++;
	}
}

function overrideUpAndDownKeyEventListeners()
{
	window.addEventListener("keydown", 
		function(e)
		{
			switch(e.keyCode)
			{
				case UPKEY:
				case DOWNKEY:
				{
					e.preventDefault();
				}
				default:
				{
					break;
				}
			}
		})
}

function overrideSpacebarEventListener()
{
	window.addEventListener("keydown", 
		function(keyEvent)
	{
		switch(keyEvent.keyCode)
		{
			case SPACEBAR:
			{
				keyEvent.preventDefault();
			}
			default:
			{
				break;
			}
		}
	});
}

function resetGameBoard()
{
	gameboardContext = gameboard.getContext("2d");
	gameboardContext.fillStyle = BLACK;
	gameboardContext.fillRect(0, 0, gameboard.width, gameboard.height);

	var numberOfRows = gameboard.width / resolution;
	var numberOfColumns = gameboard.height / resolution;

	if(numberOfRows < 5 || numberOfColumns < 5)
	{
		alert("The game resolution must be decreased or the gameboard size must be increased!");
	}
	else if(numberOfRows < sliderLength)
	{
		alert("size of board is smaller than the size of the slider");
	}
	else
	{
		var i = 0;
		while(i < numberOfRows)
		{
			context = gameboard.getContext("2d");
			context.fillStyle = WHITE;
			context.fillRect(resolution, resolution * i, resolution, resolution);
			i++;
		}
	}
}
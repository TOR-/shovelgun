var Input = {};
Input.keys = {};
Input.keyDown = function(event){
    var n = event.keyCode;
    var increment = 0.3;
    if(n == 32){
	Game.character.object.position.set(0,0,0);
	Game.character.velocity.x = Game.character.velocity.z = 0;
    }
    else if ( n == 38 )//UpArrow
    {
	Game.character.velocity.z = increment;
    }
    else if ( n == 40 )//DownArrow
    {
	Game.character.velocity.z = -increment;
    }
    else if ( n == 37 )//LeftArrow
    {
	Game.character.velocity.x = -increment;
    }
    else if ( n == 39 )//RightArrow
    {
	Game.character.velocity.x = increment;
    }
    else if ( n == 82 )//r
    {
	location.reload(true);
    }
    else
    {
	//	console.log("Dunno");
    }
}

Input.keyUp = function(event) {
    var n = event.keyCode;
    if ( n == 38 )//UpArrow
    {
	Game.character.velocity.z = 0;
    }
    else if ( n == 40 )//DownArrow
    {
	Game.character.velocity.z = 0;
    }
    else if ( n == 37 )//LeftArrow
    {
	Game.character.velocity.x = 0;
    }
    else if ( n == 39 )//RightArrow
    {
	Game.character.velocity.x = 0;
    }
}
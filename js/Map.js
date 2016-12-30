function Map(path) {
    this.path = path;
    var testdata = [4,4,4,4,'\n',4,3,3,4,'\n',4,3,3,4,'\n',4,4,4,4];
    this.load = function(){
	// returns raw map data as an array
	this.raw = function() {
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    this.data = this.responseText.split('');//to array
		    console.log(this.data);   
		}
	    };
	    xhttp.open("GET", this.path, true);
	    xhttp.send();
	}
	// returns map geometry
	this.geometry = function(data) {
	    var blocks = [], width = 0, height;
	    var size = 5;
	    var i = 0;
	    for (height = 0; (height * (width + 1)) < data.length; height++){
		i = ( height * (width + 1) );
		width = 0;
		for (width = 0; data[width] != '\n'; width++) {
		    
		    console.log("height: " + height + ", width: " + width);
		    if (data[i + width] == 4) {
			blocks[i] = new Block(width, -1, height, size, 0x00ff00);
			//console.log("Top at " + width + ", -1, " + height);
		    }
		    else if (data[i + width] == 3) {
			blocks[i] = new Block(width, 0, height, size, 0x0000ff);
		    }
		    else {
			blocks[i] = new Block(width, 0, height, size, 0xff0000);
		    }
		}
	    }
	    console.log("height: " + height + ", width: " + width);
	    return blocks;
	}
	var m = this.geometry(testdata);
//	for( var i = 0; i < m.length; i++);
	    //scene.add(m[i]);
	//console.log(this.geometry(this.raw(this.path)));
    };
};
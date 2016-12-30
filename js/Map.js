function Map(path) {
    this.path = path;
    var mapdata;
    var testdata = ['.','.','.','.','\n','.','0','0','.','\n','.','0','0','.','\n','.','.','.','.'];
    this.load = function(){
	// returns raw map data as an array
	this.raw = function() {
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
		mapdata = this.responseText.split('');//to array
		if (this.readyState == 4 && this.status == 200) {
		    // Check browser support
		    if (typeof(Storage) !== "undefined") {
			// Store
			sessionStorage.setItem("map", this.responseText);
		    } else {
			colsole.log("Sorry, your browser does not support Web Storage...");
		    }
		    
		    console.log(mapdata);//data defined
		}
	    };
	    xhttp.open("GET", this.path, true);
	    xhttp.send();
	    console.log(mapdata);//data undefined
	}
	// returns map geometry
	this.geometry = function(data) {
	    console.log(mapdata);//data undefined
	    var blocks = [], width = 0, height;
	    var size = 5;
	    var i = 0;
	    for (height = 0; (height * (width + 1)) < data.length; height++){
		i = ( height * (width + 1) );
		width = 0;
		for (width = 0; data[width] != '\n'; width++) {
		    if (data[i + width] == '.') {
			blocks[i + width] = new Block(width, -1, height, size, 0x00ff00);
		    }
		    else if (data[i + width] == '0') {
			blocks[i + width] = new Block(width, 0, height, size, 0x0000ff);
		    }
		    else {
			blocks[i + width] = new Block(width, 0, height, size, 0xff0000);
		    }
		}
		blocks[i + width] = 0;
	    }
	    console.log("height: " + height + ", width: " + width);
	    return blocks;
	}
	this.raw();
	var m = this.geometry(sessionStorage.getItem("map"));
	//console.log(m[0]);
	for( var i = 0; i < m.length; i++){
	    if (m[i] != 0) scene.add(m[i]);
	}
//	this.raw();
	console.log(mapdata);//data undefined
	//console.log(this.geometry(this.raw(this.path)));
    };
};
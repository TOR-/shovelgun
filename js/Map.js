function Map(path) {
    this.path = path;
   // var testdata = ['.','.','.','.','\n','.','0','0','.','\n','.','0','0','.','\n','.','.','.','.'];
    this.map;
    this.load = function(){
	// returns raw map data as an array
	this.raw = function() {
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    // Check browser support
		    if (typeof(Storage) !== "undefined") {
			// Store
			this.map = this.responseText;
			sessionStorage.setItem("map", this.responseText);
		    } else {
			console.log("Web Storage not supported in this browser. Get a better one");
		    }
		}
	    };
	    xhttp.open("GET", this.path, true);
	    xhttp.send();
	}
	// returns map geometry
	this.geometry = function(data) {
	    var blocks = [], w = 0, h;
	    var size = 5;
	    var i = 0;
	    for (h = 0; (h * (w + 1)) < data.length; h++){
		i = ( h * (w + 1) );
		w = 0;
		for (w = 0; data[w] != '\n'; w++) {
		    if (data[i + w] == '.') {
			blocks[i + w] = new Block(w, -1, h, size, 0x00ff00);
		    }
		    else if (data[i + w] == '0') {
			blocks[i + w] = new Block(w, 0, h, size, 0x0000ff);
		    }
		    else { // Just in case
			blocks[i + w] = new Block(w, 0, h, size, 0xff0000);
		    }
		}
		blocks[i + w] = 0;
	    }
	    return blocks;
	}
	this.raw();
	var m = this.geometry(sessionStorage.getItem("map"));
	for ( var i = 0; i < m.length; i++) if (m[i] != 0) scene.add(m[i]);
	return m;
    };
};
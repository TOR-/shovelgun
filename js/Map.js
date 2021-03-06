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
			console.log("Web Storage not supported in this browser. Do come back with a better one");
		    }
		}
	    };
	    xhttp.open("GET", this.path, true);
	    xhttp.send();
	}
	// returns map geometry
	this.geometry = function(data) {
	    var blocks = [];
	    this.bBox = [];
	    var w = 0, h;
	    this.size = 5;
	    var i = 0;
	    for (h = 0; (h * (w + 1)) < data.length; h++){
		i = ( h * (w + 1) );
		w = 0;
		for (w = 0; data[w] != '\n'; w++) {
		    if (data[i + w] == '.') {
			blocks[i + w] = new Block(w, 1, h, this.size, 0x00ff00);
			this.bBox[i + w] = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			this.bBox[i + w].setFromObject(blocks[i + w]);
			//Game.scene.add(this.bBox[i + w]);
			console.log("block");
		    }
		    else if (data[i + w] == '0') {
			blocks[i + w] = new Block(w, 0, h, this.size, 0x0000ff);
			this.bBox[i + w] = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			this.bBox[i + w].setFromObject(blocks[i + w]);
		    }
		    else { // Just in case
			blocks[i + w] = new Block(w, 1, h, this.size, 0xff0000);
		    }
		}
		blocks[i + w] = 0;
	    }
	    this.width = w;
	    return blocks;
	}
	this.raw();
	var m = this.geometry(sessionStorage.getItem("map"));
	for ( var i = 0; i < m.length; i++) {
	    if (m[i] != 0) Game.scene.add(m[i]);
	    //if (typeof this.bBox[i] != "undefined")
	//	Game.scene.add(this.bBox[i]);
	    //console.log(this.bBox[i]);
	}
	return m;
    };
};
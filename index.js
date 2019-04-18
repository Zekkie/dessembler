function lexer(input) {
	const split_cmd = input.split(" ");
	const [op,args] = split_cmd;
	const token = {
		operation: op,
		arguments: args
	};
	return token;
};

function updateIndexes() {
	const q = document.getElementById("q");
	const w = document.getElementById("w");
	const d = document.getElementById("d");

	const qChildren = Array.from(q.children);
	const wChildren = Array.from(w.children);
	const dChildren = Array.from(d.children);
	
	for(let i = 0; i < qChildren.length; i++) {
		qChildren[i].classList.remove("remove");
		qChildren[i].classList.remove("selected");
		qChildren[i].querySelector(".index").innerHTML = i+1;
	}

	for(let i = 0; i < wChildren.length; i++) {
		wChildren[i].classList.remove("remove");
		wChildren[i].classList.remove("selected");
		wChildren[i].querySelector(".index").innerHTML = i+1;
	}

	for(let i = 0; i < dChildren.length; i++) {
		dChildren[i].classList.remove("remove");
		dChildren[i].classList.remove("selected");
		dChildren[i].querySelector(".index").innerHTML = i+1;
	}
}

function move(args) {
	const split_args = args.split(",");
	const [dest,from,index] = split_args;
	const indexNum = parseInt(index);
	if(isNaN(indexNum)) {
		throwError("Index: " + index + " is geen nummer");
	} else if(!document.getElementById(dest)){
		throwError("Container: " + dest + " Bestaat niet");
	} else {
		const fromContainer = document.getElementById(from);
		const fromChildren = fromContainer.children;
		const target = document.getElementById(dest);
		fromChildren[indexNum-1].classList.add("remove");
		setTimeout(()=>{
			target.appendChild(fromChildren[indexNum-1]);
			updateIndexes();
		},500)
		
	}
};

function throwError(err) {
	const errorContainer = document.getElementById("error");
	errorContainer.innerHTML = err;
}

function parser(token) {
	switch(token.operation){
		case "m":
			move(token.arguments);
		break
		default:
			throwError(token.operation + " is geen functie");
	}
}


(() => {
	const btn = document.getElementById("run");
	const input = document.getElementById("input");
	btn.addEventListener("keypress",keyEventHandler,true);
	function keyEventHandler(e) {
		const {keyCode} = e;
		if(keyCode === 13) {
			parser(lexer(input.value));
			document.getElementById("input-dest").innerHTML = "";
			input.value = "";
		}
	};

})();




(() => {

	const inputDest = document.getElementById("input-dest");
	const input = document.querySelector("[type=text]");
	const dict = ["m"];
	input.addEventListener("keyup",handleKbEvents,true)
	
	function handleKbEvents(e) {
	  const {keyCode} = e;
	  inputDest.innerHTML = this.value;
		
		const tokens = this.value.split(",");

	  if(tokens.length > 2 && !isNaN(parseInt(tokens[2]))) {
	  	console.log(tokens.length);
	  	const [_,from,index] = tokens;
	  	const int = parseInt(index);

	  	document.getElementById(from).children[index-1].classList.add("selected")

	  	//console.log(index);
	  }else if(document.getElementById(tokens[1])){
	  	const {children} = document.getElementById(tokens[1]);
	  	for(let i = 0; i < children.length; i++) {
	  		children[i].classList.remove("selected");
	  	}
	  }


	  if(this.value.indexOf(" ") >= 0) {
	    const splitStr = this.value.split(" ");
	    const functionSpan = document.createElement("span");
	    const argSpan = document.createElement("span");
	    argSpan.setAttribute("class","args")
	    functionSpan.innerHTML = splitStr[0] + " ";
	    argSpan.innerHTML = splitStr[1];
	    if(dict.indexOf(splitStr[0]) >= 0) {
	      functionSpan.setAttribute("class","func");
	      inputDest.innerHTML = "";
	      inputDest.appendChild(functionSpan);
	      inputDest.appendChild(argSpan);
	    }else if(dict.indexOf(splitStr[0]) < 0) {
	      functionSpan.setAttribute("class","error");
	      inputDest.innerHTML = "";
	      inputDest.appendChild(functionSpan);
	      inputDest.appendChild(argSpan);
	    }
	  }
	}

})()
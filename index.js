function lexer(input) {
	const split_cmd = input.toLowerCase().split("");
	const token = {
		operation: split_cmd[0]
	};
	for(let i = 1; i < split_cmd.length; i++) {
		token["arg_"+i] = split_cmd[i]
	}
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
	let {_,arg_1,arg_2,arg_3} = args;	
	if(isNaN(arg_3)) {
		throwError("Argument 3 is geen nummer");
	}
	let num = parseInt(arg_3);
	const from = document.getElementById(arg_1);
	const target = document.getElementById(arg_2);
	let index = from.children[num-1];
	index.classList.add("remove");
	setTimeout(() => {
		target.appendChild(index);
		updateIndexes();
	},500)
	
};

function throwError(err) {
	const errorContainer = document.getElementById("error");
	errorContainer.innerHTML = err;
}

function parser(token) {
	switch(token.operation){
		case "m":
			move(token);
		break
		default:
			throwError(token.operation + " is geen functie");
	}
}


(() => {
	const btn = document.getElementById("run");
	const input = document.getElementById("input");
	input.addEventListener("keypress",eventHandler,true);
	btn.addEventListener("keypress",eventHandler,true);
	btn.addEventListener("click",eventHandler,true);
	input.addEventListener("keyup",upHandler,true)
	function upHandler() {
		let splitInput = this.value.toLowerCase().split("");
		const from = splitInput[1];
		const fromContainer = document.getElementById(from);
		if(splitInput.length > 3 && !isNaN(parseInt(splitInput[splitInput.length-1]))) {
			
			const index = parseInt(splitInput[3]) - 1;
			if(!fromContainer.children[index]) {
				throwError("Element: "+(index+1)+" bestaat niet :(");
			}
			fromContainer.children[index].classList.add("selected");

		}else {
			const children = fromContainer.children;

			for(let i = 0; i < children.length; i++) {
				children[i].classList.remove("selected");
			}
		}
	}
	function eventHandler(e) {
		const {keyCode} = e;
		if(keyCode === 13 || e.type === "click") {
			parser(lexer(input.value));
			input.value = "";
			const errorContainer = document.getElementById("error").innerHTML = "";
		}
	};

})();


function readFile(file, out, out2) {
	
var http = new XMLHttpRequest();
http.open('get', file);
http.onreadystatechange = function () {	
	
	if (http.readyState == 4) {
		
        if (http.responseText) {			
			out.innerHTML = http.responseText;			
			var buttonclass = "class=\"main_button_left\"";
			
			var result = "<img name='#top' src='images/espot_ikonit_empty.png' class='content_button active'/><br><br>";
			
			var contentheaders = out.getElementsByTagName("h2");	
			var buttonoffset = images[activebutton].offsetTop - images[activebutton].parentNode.getBoundingClientRect().top +18;
			
			for (i = 0; i < contentheaders.length; i++) {								
				result +=  "<img name=\""+contentheaders[i].id  +"\" src='images/espot_ikonit_empty.png' class='content_button'/><br><br>\n";				
			}
			
			
			
			out.scrollTop = 0;
			out2.innerHTML = result;	
			var contentbuttons = out2.getElementsByClassName("content_button");
			
			contentbuttons[0].style.top = buttonoffset +"px";
			contentbuttons[0].style.left = "0px";
			for(var i=1; i<contentbuttons.length; i++) {
				
				contentbuttons[i].style.top = parseInt(contentbuttons[i-1].style.top) + 23 +"px";
				
				if(parseInt(contentbuttons[i-1].style.left,10) < 5) {
					contentbuttons[i].style.left = 15 +"px";
				}
				else {
					contentbuttons[i].style.left = "0px";
				}
			}			
        }
    }	
};
http.send();
}
function makeMainClick(e) {						
	if(e.target.nodeName == "IMG") {
		
		var current = e.target;
		for(i=0; i<current.parentNode.children.length; i++) {
			current.parentNode.children[i].classList.remove("active");
		}
		current.classList.add("active");
		setMainButtons();
		readFile('database/' +current.name, document.getElementById('text-file'), document.getElementById('content_buttons'), document.getElementById('text-file').scrollTop);					
		
	
	}		
}
function makeContentClick(e) {						
	if(e.target.nodeName == "IMG") {
		var current = e.target;
		/*
		for(i=0; i<current.parentNode.children.length; i++) {
			e.target.parentNode.children[i].classList.remove("active");
		}
		current.classList.add("active");
		*/
		if(current.name === "#top") {
			 $('.content_text').animate({scrollTop:0}, 'slow');
		}
		else {
			var value = current.name;			
			var header = document.getElementById(value);			
			$('.content_text').animate({scrollTop:header.offsetTop}, 'slow');
		}
	}		
}

function setMainButtons() {				
						
	for(i=0;i<images.length; i++) {
		
		if(images[i].classList.contains("active")) {
			activebutton = i;
			break;
		}
	}
	images[activebutton].style.left = "50px";
	for(i = activebutton-1; i>= 0; i--) {
		offset = parseInt(images[i+1].style.top,10) -40;
		if(images[i+1].classList.contains("active") || parseInt(images[i+1].style.left,10) > 30) {
			images[i].style.left = "15px";
		}
		else {
			images[i].style.left = "40px";
		}
		images[i].style.top = offset +"px";
		
	}
	for(i = activebutton+1; i<images.length; i++) {
		offset = parseInt(images[i-1].style.top,10) +40;
		if(images[i-1].classList.contains("active") || parseInt(images[i-1].style.left,10) > 30) {
			images[i].style.left = "15px";
		}
		else {
			images[i].style.left = "40px";
		}
		images[i].style.top = offset +"px";
		
	}	
}


function checkHeader() {
	/*if(textfield.scrollTop > 20) {
		if(!header.classList.contains("scrolling")) {
			header.classList.add("scrolling");
			
		}
		
	}
	else {
		header.classList.remove("scrolling");
	}*/
	
	if(contentheaders[0].getBoundingClientRect().top-headerHeight > 10) {
		if(!buttons[0].classList.contains("active")) {
			
			for(j=1; j<buttons.length; j++) {
				buttons[j].classList.remove("active");
			}
			buttons[0].classList.add("active");
		}
	}
	else {
		var lowest = 0;
		for(var i = 0; i<contentheaders.length; i++) {					
			if(contentheaders[i].getBoundingClientRect().top-headerHeight < 10) {
				lowest = i;								
			}	
			else {
				break;
			}
		}
		if(!buttons[lowest+1].classList.contains("active")) {
			for(j=0; j<buttons.length; j++) {
				buttons[j].classList.remove("active");
			}
			
			buttons[lowest+1].classList.add("active");							
		}
	}
}


function drawScrollbar() {
	var c=document.getElementById("content_scrollbar");
	var y = 50;
	
	var r = 22;
	var ctx=c.getContext("2d");
	c.width = 50;
	var x = c.width/2;
	c.height =  document.getElementById("text-file").getBoundingClientRect().height;
	ctx.lineWidth=5;
	ctx.strokeStyle="#777777";	
	ctx.beginPath();	

	ctx.moveTo(x,y-r);	
	ctx.lineTo(x+r,(y-r)+r/2);	
	ctx.moveTo(x+r,(y-r)+r/2);
	ctx.lineTo(x+r,y+r/2);
	ctx.stroke(); 
	
}






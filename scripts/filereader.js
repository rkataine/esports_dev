
var contentbuttons;
var contentheaders;
function readFile(file, out, out2) {
	
var http = new XMLHttpRequest();
http.open('get', file);
http.onreadystatechange = function () {	
	
	if (http.readyState == 4) {
		
        if (http.responseText) {			
			out.innerHTML = http.responseText;			
			var buttonclass = "class=\"main_button_left\"";
			
			var result = "<img name='#top' src='images/espot_ikonit_empty.png' class='content_button active'/><br><br>";
			
			contentheaders = out.getElementsByTagName("h2");	
			var buttonoffset = images[activebutton].offsetTop - images[activebutton].parentNode.getBoundingClientRect().top +18;
			
			for (i = 0; i < contentheaders.length; i++) {								
				result +=  "<img name=\""+contentheaders[i].id  +"\" src='images/espot_ikonit_empty.png' class='content_button'/><br><br>\n";				
			}
			
			
			
			out.scrollTop = 0;
			out2.innerHTML = result;	
			contentbuttons = out2.getElementsByClassName("content_button");
			
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
		drawScrollbar();
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
var activebutton = 0;

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
		
		if(!contentbuttons[0].classList.contains("active")) {
			
			for(j=1; j<contentbuttons.length; j++) {
				contentbuttons[j].classList.remove("active");
			}
			contentbuttons[0].classList.add("active");
			activebutton = 0;
			drawScrollbar();		
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
		if(!contentbuttons[lowest+1].classList.contains("active")) {
			for(j=0; j<contentbuttons.length; j++) {
				contentbuttons[j].classList.remove("active");
			}
			
			contentbuttons[lowest+1].classList.add("active");	
			activebutton = lowest+1;
		}
		drawScrollbar();	
	}
	
}
function map(value,istart,istop,ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}


function drawScrollbar() {
	
	

	ctx.clearRect(0, 0, c.width, c.height);
	
	
	var preypos = 6;
	
	for(var i=0;i<contentheaders.length;i++) {
		var ypos = map(contentheaders[i].offsetTop,0,textfield.scrollHeight, 0, c.height);
		
		
		ctx.beginPath();
		ctx.moveTo(middle,ypos);
		ctx.lineTo(middle,preypos+20);		
		ctx.stroke(); 		
		if(i != activebutton-1) {
			drawHexagon(ctx,middle,ypos,10,5,basic);	
		}
		
		preypos = ypos;
	}
	if(activebutton > 0) {
		ypos = map(contentheaders[activebutton-1].offsetTop,0,textfield.scrollHeight, 0, c.height);
		drawHexagon(ctx,middle,ypos,10,5,active);	
		drawHexagon(ctx, middle, 6, 10, 5, basic);	
	}
	else {		
		drawHexagon(ctx, middle, 6, 10, 5, active);	
		
	}
	
}

function drawHexagon(context,x,y,r,thickness, color) {	
	
	context.fillStyle=color;	
	context.translate(x,y);
	context.rotate(-Math.PI/3);	
	context.fillRect(0,-thickness/2,thickness,r+thickness);
	for(var i=0;i<5;i++) {
		context.translate(0,r);
		context.rotate(Math.PI/3);		
		context.fillRect(0,-thickness/2,thickness,r+thickness);	
	}	
	context.setTransform(1, 0, 0, 1, 0, 0);
}





function readFile(file, out, out2, scrollpos) {
	
var http = new XMLHttpRequest();
http.open('get', file);
http.onreadystatechange = function () {	
	
	if (http.readyState == 4) {
		
        if (http.responseText) {
			
            out.innerHTML = http.responseText;			
			
			var x = out.getElementsByTagName("h2");
			
			var i;
			var buttonclass = "class=\"main_button_left\"";
			var result = "<input id='0' value=\"#top\" onclick=\"gotoHeader()\" type='radio' name='sub_radios' checked autocomplete='off'/><label for='0'><img src='images/espot_ikonit_empty.png' class='content_button_left'/></label><br><br>";
			scrollpos = out.scrollTop;
			for (i = 0; i < x.length; i++) {
				var rect = x[i].getBoundingClientRect();
				
				if(i%2 == 0) {
					buttonclass = "class=\"content_button_right\"";
				}
				else {
					buttonclass = "class=\"content_button_left\"";
				}
				result += "<input id='"+x[i].id +"' value=\""+parseInt(rect.top+scrollpos,10) +"\" onclick=\"gotoHeader()\" type='radio'  name='sub_radios'/><label for='"+x[i].id +"'><img src='images/espot_ikonit_empty.png' "+buttonclass +"/></label><br><br>\n";
				
			}
				
			out.scrollTop = 0;
			out2.innerHTML = result;
			
			
        }
    }	
};
http.send();
}

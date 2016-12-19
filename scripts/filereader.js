function readFile(file, out, out2) {
	
var http = new XMLHttpRequest();
http.open('get', file);
http.onreadystatechange = function () {	
	
	if (http.readyState == 4 && http.status == 200) {
        if (http.responseText) {
			
            out.innerHTML = http.responseText;			
			var x = out.getElementsByTagName("h2");
			
			var i;
			var result = "<input id='0' value=\"#top\" onclick=\"gotoHeader()\" type='radio' name='sub_radios' checked autocomplete='off'/><label for='0'><img src='images/espot_ikonit_empty.png' class='content_button'/></label><br>";
			
			for (i = 0; i < x.length; i++) {
				var rect = x[i].getBoundingClientRect();
				
				result += "<input id='"+x[i].id +"' value=\""+parseInt(rect.top,10) +"\" onclick=\"gotoHeader()\" type='radio'  name='sub_radios'/><label for='"+x[i].id +"'><img src='images/espot_ikonit_empty.png' class='content_button'/></label><br>\n";
				
			}
					
				
			out2.innerHTML = result;
			
			
        }
    }	
};
http.send();
}

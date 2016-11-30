function readFile(file, out) {
var http = new XMLHttpRequest();
http.open('get', file);
http.onreadystatechange = function () {
	out.innerHTML = http.responseText;
};
http.send();
}

readFile('database/description.txt', document.getElementById('text-file'));
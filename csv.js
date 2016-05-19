/**
 * Created by lavor on 15.05.2016.
 */


var button = document.getElementById('an5b');
button.addEventListener('click', function (event) {
    var input = document.getElementById('an5i').value;

    var xhr = new XMLHttpRequest();

    xhr.open('GET', input+'.csv', true);

    xhr.send();

    xhr.onreadystatechange = function() {

        if (this.readyState != 4) return;
        if (this.status != 200) {
            alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
            return;
        }
        makeCSV(this.responseText, input)

    };
});
function makeCSV(str, mod) {
    var last = document.getElementsByTagName('body')[0],
        csvString = str, i = 0, obj, csvRow, date, ul = document.createElement('ul'), li, liText;

    csvString = csvString.split('\n');
    for (i; i < csvString.length - 1; i++) {
        li = document.createElement('li');
        obj = {};
        csvRow = csvString[i].split(';');
        date = new Date(csvRow[0]);
        obj.date = date.getDate() +' '+ date.getMonth() +' '+ date.getFullYear() +', '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();
        obj.val = csvRow[1];
        obj.curr = csvRow[2];
        liText = document.createTextNode(obj.date +' '+ obj.val +' '+ obj.curr);
        li.appendChild(liText);
        ul.appendChild(li)
    }
    last.appendChild(ul);
}

/**
 * Created by lavor on 07.05.2016.
 */
var xhr = new XMLHttpRequest();

xhr.open('GET', 'pid.xml', true);

xhr.send();

xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;
    if (this.status != 200) {
        alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
        return;
    }
    parseXml(this.responseXML);
};
function parseXml(xml) {
    var XML = xml;
    var last = document.getElementsByTagName('body')[0],
        UL = document.createElement('ul'),
        LI, TXT, item, string, data, curr, val,
        histItems = XML.getElementsByTagName('histItem');
    for (item = 0; item < histItems.length; item++) {
        data = histItems[item].getElementsByTagName('data')[0].innerHTML;
        var dateStr = new Date(data);
        var nowDay = new Date().getDate();
        var dateStrDay = dateStr.getDate();
        if (dateStrDay > nowDay-3) {
            curr = histItems[item].getElementsByTagName('curr')[0].innerHTML;
            val = histItems[item].getElementsByTagName('val')[0].innerHTML;
            string = "Дата: " + data + ", валюта: " + curr + ", курс: " + val;
            TXT = document.createTextNode(string);
            LI = document.createElement('li');
            LI.appendChild(TXT);
            UL.appendChild(LI);
        }

    }
    last.appendChild(UL);
}
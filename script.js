"use strict";
// наш обьектик обьектиков валют
var currency = {
        USD: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1235px-Flag_of_the_United_States.svg.png',
            attirudeToUSD: '1',
            name: 'USD'
        },
        EUR: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/810px-Flag_of_Europe.svg.png',
            attirudeToUSD: '1.08',
            name: 'EUR'
        },
        GBR: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
            attirudeToUSD: '1.42',
            name: 'GBR'
        },
        CAD: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/1000px-Flag_of_Canada.svg.png',
            attirudeToUSD: '0.70',
            name: 'CAD'
        },
        CNY: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Flag_of_Eritrea.svg/1000px-Flag_of_Eritrea.svg.png',
            attirudeToUSD: '0.15',
            name: 'CNY'
        },
        RUB: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/900px-Flag_of_Russia.svg.png',
            attirudeToUSD: '78',
            name: 'RUB'
        },
        UAH: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1024px-Flag_of_Ukraine.svg.png',
            attirudeToUSD: '26',
            name: 'UAH'
        },
        MXN: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/840px-Flag_of_Mexico.svg.png',
            attirudeToUSD: '0.05',
            name: 'MXN'
        }
    }
    // переменные
var selectFrom = document.getElementById('currencyFrom'),
    selectTo = document.getElementById('currencyTo'),
    imageNearFrom = document.getElementById('imgFrom'),
    imageNearTo = document.getElementById('imgTo'),
    conBut = document.getElementsByTagName('button')[0],
    result = document.getElementById('result');
    
// вызов функций
makeSelect(selectFrom);
makeSelect(selectTo);
findAndChange(selectFrom, imageNearFrom);
findAndChange(selectTo, imageNearTo);
// обработчики
selectFrom.addEventListener('change', function() {
    findAndChange(selectFrom, imageNearFrom);
});
selectTo.addEventListener('change', function() {
    findAndChange(selectTo, imageNearTo);
});
conBut.addEventListener('click', function() {
	var benefits = document.getElementById('benefits'),
	    draft = document.getElementById('draft'),
	    number = document.getElementById('number').value,
	    from = selectFrom.options[selectFrom.selectedIndex].value,
	    to = selectTo.options[selectTo.selectedIndex].value,
	    res = 0;
	res = number / from * to;
	res = res.toFixed(1);
	result.innerHTML = '<p>Result: ' + res + '</p>';
});
// функкии
function makeSelect(elem) {
    for (var item in currency) {
        var option = document.createElement("option");
        option.text = currency[item].name;
        option.value = currency[item].attirudeToUSD;
        elem.add(option);
    }
}

function findAndChange(se, im) {
    var choosen = se.options[se.selectedIndex].value;
    for (var item in currency) {
        if (choosen == currency[item].attirudeToUSD) {
            im.src = currency[item].img;
            im.alt = currency[item].name;
            break;
        }
    }
}

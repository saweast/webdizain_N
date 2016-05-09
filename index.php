<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Converter</title>
    <link rel="stylesheet" type="text/css" href="normalize.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="wrapper">
        <div id='convertor'>
            <h1>Currency convertor</h1>
            <label for="number">Number</label>
            <input type="text" name='number' id="number" maxlength="4" placeholder="0">
            <div>
                <label for="currencyFrom">From</label>
                <select name="currencyFrom" id="currencyFrom">
                    <option disabled selected> -- select an option -- </option>
                </select>
                <img src="" alt="" id='imgFrom'>
                <div id="imgFromSell"></div>
                <div id="imgFromBuy"></div>
                <button id="swap"></button>
                <label for="currencyTo">To</label>
                <select name="currencyTo" id="currencyTo">
                    <option disabled selected> -- select an option -- </option>
                </select>
                <img src="" alt="" id='imgTo'>
                <div id="imgToSell"></div>
                <div id="imgToBuy"></div>
            </div>
            <div>
                <label for="benefits">Benefits</label>
                <input type="checkbox" name="benefits" value="" id='benefits'>
                <label for="draft">Draft</label>
                <input type="checkbox" name="draft" value="" id='draft'>
            </div>
            <div id="result">
                <p></p>
            </div>
            <div class='adder'>
                <label>Short name:
                    <input type="text" id="newName" placeholder="краткое имя валюты">
                </label>
                <label>Image src:
                    <input type="text" id="newSrc" placeholder="url картинки">
                </label>
                <label>Attirude to USD:
                    <input type="number" id="newAttitide" placeholder="отношение к $">
                </label>
                <button id='newCurr'>Add new currency</button>
            </div>
        </div>
        <div id="history"></div>
        <div>
            <ul id="USD"></ul>
        </div>
        <div class="newindow">
            <div>
                <h2>Общее задание 3 и 4 лабы</h2>
                <button id="third">Записать в список</button>
                <button id="thirdStyle">Отстилизировать список</button>
            </div>
            <div>
                <h2>Подгорный индивидуальные задания</h2>
                <h3>Задание к 2 лабораторной работе</h3>
                <button id="pid" onclick="getDraft();">Чек</button>
                <h3>Задание к 3 и 4 лабораторным работам</h3>
                <button id="thirdSecond" title="Подгорный, скопировать трансакции с $, если больше 3 копий поменять размер текста">copy USD actions</button>
                <button id="thirdSecond2">Если больше 3шт меняй цвет текста</button>
            </div>
            <div>
                <h2>Анохина индивидуальные задания</h2>
                <h3>Задание к 2 лабораторной работе</h3>
                <button id="ann" onclick="getBrowserInfo();">Браузер</button>
                <h3>Задание к 3 и 4 лабораторным работам</h3>
                <button id="thirdFirst" title="Анохина, выделяем значения больше 300, все остальные удаляем">more than 300</button>

            </div>
            <div>
                <h2>Лаворчук индивидуальные задания</h2>
                <h3>Задание к 3 и 4 лабораторным работам</h3>
                <button id="thirdThird" title="Лаворчук, отсортировать и закрасить данные">Sort</button>
            </div>            
        </div>
    </div>
<!--    -->
    <?php
    $filename = "file.json";
    $handle = fopen($filename, "r");
    $contents = fread($handle, filesize($filename));
    $azaza = json_decode($contents, true);
    foreach ($azaza as $key) {
        foreach ($key as $k => $value) {
            if ($k == 'img') {
                $image = $key[$k];
            }
            if ($k == 'name') {
                $curr = $key[$k];
            }
            if ($k == 'attitudetousd') {
                $val = $key[$k];
            }
            $f = fopen("$curr.json", 'w') or die('FUCK');
            $s = '{"url":"'.$image.'", "buy":"'.$val.'", "sell":"'.$val*0.95.'"}';
            fwrite($f, $s);
            fclose($f);
        }
    }
    fclose($handle);
//    echo $contents;
    ?>
<!--    <script type="text/javascript" src="script.js">-->
    <script type="text/javascript">
        "use strict";
        // наш обьектик обьектиков валют

        // переменные
        var selectFrom = document.getElementById('currencyFrom'),
            selectTo = document.getElementById('currencyTo'),
            imageNearFrom = document.getElementById('imgFrom'), // document.images[0]
            imageNearTo = document.getElementById('imgTo'), // document.images[1]
            imgFromSell = document.getElementById('imgFromSell'), // document.images[1]
            imgFromBuy = document.getElementById('imgFromBuy'), // document.images[1]
            imgToSell = document.getElementById('imgToSell'), // document.images[1]
            imgToBuy = document.getElementById('imgToBuy'), // document.images[1]
            swap = document.getElementsByTagName('button')[0],
            result = document.getElementById('result'),
            number = document.getElementById('number'),
            convertor = document.getElementById('convertor'),
            benefits = document.getElementById('benefits'),
            newCurr = document.getElementById('newCurr'),
            pid = document.getElementById("pid"),
            ann = document.getElementById("ann"),
            third = document.getElementById('third');

        function ajaxRequest() {
            var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
            if (window.ActiveXObject) {
                for (var i = 0; i < activexmodes.length; i++) {
                    try {
                        return new ActiveXObject(activexmodes[i]);
                    } catch (e) {}
                }
            } else if (window.XMLHttpRequest)
                return new XMLHttpRequest();
            else
                return false
        }

        var reqJSON = new ajaxRequest();
        var reqJSON2 = new ajaxRequest();

        reqJSON.onreadystatechange = function() {
            if (reqJSON.readyState == 4) {
                if (reqJSON.status == 200 || window.location.href.indexOf("http") == -1) {
                    var jsondata = JSON.parse(reqJSON.responseText);
                    imageNearTo.src = jsondata.url;
                    imgToSell.textContent = "sell: "+jsondata.sell;
                    imgToBuy.textContent = "buy: "+jsondata.buy;
                    return jsondata
                } else {
                    alert("An error has occured making the request")
                }
            }
        };
        reqJSON2.onreadystatechange = function() {
            if (reqJSON2.readyState == 4) {
                if (reqJSON2.status == 200 || window.location.href.indexOf("http") == -1) {
                    var jsondata = JSON.parse(reqJSON2.responseText);
                    imageNearFrom.src = jsondata.url;
                    imgFromSell.textContent = "sell: "+jsondata.sell;
                    imgFromBuy.textContent = "buy: "+jsondata.buy;
                    return jsondata
                } else {
                    alert("An error has occured making the request")
                }
            }
        };

        selectTo.addEventListener('change', function() { // обработчик на смену селекта
            var fileToOpen = selectTo.options[selectTo.selectedIndex].text;
            fileToOpen = fileToOpen.toLowerCase() + ".json";
            reqJSON.open("GET", fileToOpen, true);
            reqJSON.send(null)
        });
        selectFrom.addEventListener('change', function() { // обработчик на смену селекта
            var fileToOpen = selectFrom.options[selectFrom.selectedIndex].text;
            fileToOpen = fileToOpen.toLowerCase() + ".json";
            reqJSON2.open("GET", fileToOpen, true);
            reqJSON2.send(null)
        });


        var draft = document.getElementById("draft");
        draft.addEventListener('click', function() {
            if (draft.checked) {
                reqJSON.open("GET", "file.json", true);
                reqJSON.send(null)
            }
        });

        var currency = <?php echo $contents;?>;
        var curLength = (function() {
            var i = 0;
            for (var item in currency) {
                i++;
            }
            return i;
        })();

        // вызов функций
        makeSelect(selectFrom); // делаю селект
        makeSelect(selectTo); // делаю селект
        findAndChange(selectFrom, imageNearFrom); // это для начального отображения картинки
        findAndChange(selectTo, imageNearTo); // это для начального отображения картинки
        // обработчики
        selectFrom.addEventListener('change', function() { // обработчик на смену селекта
            findAndChange(selectFrom, imageNearFrom);
            makeDisable(selectFrom, selectTo);
        });
        selectTo.addEventListener('change', function() { // обработчик на смену селекта
            findAndChange(selectTo, imageNearTo);
            makeDisable(selectTo, selectFrom);
        });
        convertor.addEventListener('input', function() { // делегирую нажатия на инпут[текст] и селекты
            number.value = number.value.replace(/[^\d]/g, ''); // запрет ввода всего кроме чисел
            if (number.value.length == 4 && number.value[0] >= '1') { // ввод только до 1000
                number.value = '1000';
            }
            var target = event.target,
                draft = 0,
                numberV = 0,
                from = 0,
                to = 0,
                res = 0;
            if (target == number || target == selectFrom || target == selectTo) {
                if (number.length == 0 || selectFrom.selectedIndex == 0 || selectTo.selectedIndex == 0) { // когда не выбраны селекты и не введен инпут
                    return 0;
                }
                numberV = document.getElementById('number').value;
                from = selectFrom.options[selectFrom.selectedIndex].value;
                to = selectTo.options[selectTo.selectedIndex].value;
                if (benefits.checked && numberV > 100) { // начисление скидки в размере 5% если бенефит выбран и сумма превышает $100
                    res = ((+numberV + (+numberV * 0.05)) * +to / +from).toFixed(2);
                } else {
                    res = (+numberV * +to / +from).toFixed(2);
                }
                result.innerHTML = '<p>Result: ' + res + ' ' + selectTo.options[selectTo.selectedIndex].text + '</p>';
            }
        });
        benefits.addEventListener('click', function() { // обработчик на чекбокс бенефитс
            var res = 0;
            var numberV = document.getElementById('number').value;
            var from = selectFrom.options[selectFrom.selectedIndex].value;
            var to = selectTo.options[selectTo.selectedIndex].value;
            if (benefits.checked && numberV > 100) { // начисление скидки в размере 5% если бенефит выбран и сумма превышает $100
                res = ((+numberV + (+numberV * 0.05)) * +to / +from).toFixed(2);
            } else {
                res = (+numberV * +to / +from).toFixed(2);
            }
            result.innerHTML = '<p class="">Result: ' + res + ' ' + selectTo.options[selectTo.selectedIndex].text + '</p>';
        });
        swap.addEventListener('click', function() { // обработчик на кнопку "свап"
            var buffer = '';
            var benefits = 0,
                draft = 0,
                numberV = 0,
                from = 0,
                to = 0,
                res = 0;
            // меняю местами индексы в селектах
            buffer = selectFrom.selectedIndex
            selectFrom.selectedIndex = selectTo.selectedIndex;
            selectTo.selectedIndex = buffer;
            // меняю местами картинки
            buffer = imageNearFrom.src;
            imageNearFrom.src = imageNearTo.src;
            imageNearTo.src = buffer;
            // обновляю результат
            numberV = document.getElementById('number').value;
            from = selectFrom.options[selectFrom.selectedIndex].value;
            to = selectTo.options[selectTo.selectedIndex].value;
            res = (numberV * to / from).toFixed(2);
            result.innerHTML = '<p>Result: ' + res + ' ' + selectTo.options[selectTo.selectedIndex].text + '</p>';
            // обновляем disable
            makeDisable(selectFrom, selectTo);
            makeDisable(selectTo, selectFrom);

        });

        function makeFile(str) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                }
            };
            xmlhttp.open("GET", "writeJSON.php?q=" + str, true);
            xmlhttp.send();
        }
        newCurr.addEventListener('click', function() { // добавляю в мой обьект валют еще одну валюту
            var newName = document.getElementById('newName').value;
            var newSrc = document.getElementById('newSrc').value;
            var newAttitide = document.getElementById('newAttitide').value;
            if (newName == '' || newSrc == '' || newAttitide == '') {
                if (newName == '') {
                    document.getElementById('newName').className = 'error';
                    setTimeout(function () {
                        document.getElementById('newName').className = '';
                    }, 2000);
                }
                if (newSrc == '') {
                    document.getElementById('newSrc').className = 'error';
                    setTimeout(function () {
                        document.getElementById('newSrc').className = '';
                    }, 2000);
                }
                if (newAttitide == '') {
                    document.getElementById('newAttitide').className = 'error';
                    setTimeout(function () {
                        document.getElementById('newAttitide').className = '';
                    }, 2000);
                }
                return 0;
            }
            currency[newName] = {
                img: newSrc,
                attitudeToUSD: newAttitide,
                name: newName
            };
            makeFile(JSON.stringify(currency));

            // обновляю селекты
            var option = document.createElement('option');
            var option1 = document.createElement('option');
            option.text = currency[newName].name;
            option1.text = currency[newName].name;
            option.value = currency[newName].attitudeToUSD;
            option1.value = currency[newName].attitudeToUSD;
            selectFrom.add(option);
            selectTo.add(option1);
            // чищю инпуты
            document.getElementById('newName').value = "";
            document.getElementById('newSrc').value = "";
            document.getElementById('newAttitide').value = "";
        });
        // функции
        function makeSelect(elem) { // заполняет селект
            for (var item in currency) {
                var option = document.createElement("option");
                option.text = currency[item].name;
                option.value = currency[item].attitudeToUSD;
                elem.add(option);
            }
        }

        function findAndChange(se, im) { // картинки делает
            var choosen = se.options[se.selectedIndex].value;
            for (var item in currency) {
                if (choosen == currency[item].attitudeToUSD) {
                    im.src = currency[item].img;
                    im.alt = currency[item].name;
                    break;
                }
            }
        }

        function makeDisable(s1, s2) { // делаю disabled и убираю его из всех остальных
            var change = s1.selectedIndex;
            var i = 0;
            for (var option in s2.options) {
                var opt = s2.options[option];
                if (s2.options[option].hasAttribute('disabled')) {
                    s2.options[option].removeAttribute('disabled')
                }
                i++;
                if (i == s2.options.length) {
                    break;
                }
            }
            s2.options[change].setAttribute('disabled', 'true');
        }


        function getBrowserInfo() {
            var myWindow = window.open("", "", "width=500, height=100");
            myWindow.document.write("<p>" + navigator.userAgent + " " + navigator.platform + "</p>");
            setTimeout(function() { myWindow.close() }, 5000);
        }

        function getDraft() {
            var res = 0;
            var numberV = document.getElementById('number').value;
            var from = selectFrom.options[selectFrom.selectedIndex].value;
            var to = selectTo.options[selectTo.selectedIndex].value;
            if (benefits.checked && numberV > 100) { // начисление скидки в размере 5% если бенефит выбран и сумма превышает $100
                res = ((+numberV + (+numberV * 0.05)) * +to / +from).toFixed(2);
            } else {
                res = (+numberV * +to / +from).toFixed(2);
            }

            var myWindow = window.open("", "", "width=500, height=100");
            myWindow.document.write('<p>From ' + numberV + " " + selectFrom.options[selectFrom.selectedIndex].text + " you get: " + res + ' ' + selectTo.options[selectTo.selectedIndex].text + '</p>');
            var time = new Date();
            time = time.toUTCString();
            myWindow.document.write("<p>Now: " + time + "</p><p></p>");

            make();

            function make() {
                var i = 5;
                var int = setInterval(function() {
                    myWindow.document.write(i-- + " ");
                }, 1000)
                setTimeout(function() {
                    myWindow.close();
                    clearInterval(int);
                }, 6000)
            }
        }


        function writeToFile(str) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                }
            };
            xmlhttp.open("GET", "writeCSV.php?q=" + str, true);
            xmlhttp.send();
        }

        third.addEventListener("click", function(e) {
            var history = document.getElementById("history");
            var resString;
            var res = 0;
            var numberV = document.getElementById('number').value;
            var from = selectFrom.options[selectFrom.selectedIndex].value;
            var to = selectTo.options[selectTo.selectedIndex].value;
            if (benefits.checked && numberV > 100) { // начисление скидки в размере 5% если бенефит выбран и сумма превышает $100
                res = ((+numberV + (+numberV * 0.05)) * +to / +from).toFixed(2);
            } else {
                res = (+numberV * +to / +from).toFixed(2);
            }
            var newElement = document.createElement('p');

            newElement.innerHTML = res + " " + selectTo.options[selectTo.selectedIndex].text;
            resString = new Date() + "," + res + "," + selectTo.options[selectTo.selectedIndex].text;
            writeToFile(resString);
            history.appendChild(newElement);
        });

        var thirdStyle = document.getElementById('thirdStyle');

        thirdStyle.addEventListener('click', function() {
            var history = document.getElementById("history");
            var p = history.getElementsByTagName('p');
            for (var item in p) {
                p[item].style.background = "red";
                p[item].style.color = "blue";
            }
        });
        var thirdFirst = document.getElementById('thirdFirst');
        thirdFirst.addEventListener("click", function() {
            getSparta();
            removeNonSparta();
            removeNonSparta();
            removeNonSparta();
        });
        var thirdSecond = document.getElementById('thirdSecond');
        thirdSecond.addEventListener("click", function() {

            USDtoUL("history");

        });
        var thirdSecond2 = document.getElementById('thirdSecond2');
        thirdSecond2.addEventListener("click", function() {
            findThree("history");
        });
        var thirdThird = document.getElementById('thirdThird');
        thirdThird.addEventListener("click", function() {
            sort("history");
            colorize("history");
        });

        function getSparta() {
            var history = document.getElementById("history")
            var histElems = document.getElementById("history").children;
            for (var item in histElems) {
                if (parseFloat(histElems[item].innerHTML) >= 300) {
                    histElems[item].style.background = "yellow";
                }
            }
        }

        function removeNonSparta() {
            var history = document.getElementById("history")
            var histElems = document.getElementById("history").children;
            for (var item in histElems) {
                if (parseFloat(histElems[item].innerHTML) < 300) {
                    history.removeChild(histElems[item]);
                }
            }
        }

        function sort(blockId, desc) {
            var desc = desc || false;
            var mainBlock = document.getElementById(blockId);
            var childBlock = mainBlock.children;
            var buf = 0;
            var length = childBlock.length;
            for (var i = length - 1; i > 0; i--) {
                for (var j = 0; j < i; j++) {
                    if (parseFloat(childBlock[j].innerHTML) > parseFloat(childBlock[j + 1].innerHTML)) {
                        buf = childBlock[j];
                        childBlock[j] = childBlock[j + 1];
                        childBlock[j + 1] = buf;
                        mainBlock.insertBefore(childBlock[j + 1], childBlock[j]);
                    }
                }
            }
        }

        function colorize(block) {
            var mainBlock = document.getElementById(block);
            var childBlock = mainBlock.children;
            var length = childBlock.length;
            var colArr = ["#000000", "#110000", "#220000", "#330000", "#440000", "#550000", "#660000", "#770000", "#880000", "#990000", "#aa0000", "#bb0000", "#cc0000", "#dd0000", "#ee0000", "#ff0000"];
            for (var item in childBlock) {
                childBlock[item].style.background = colArr[length - item];
                childBlock[item].style.color = "#fff";
            }
        }

        function USDtoUL(block) {
            var mainBlock = document.getElementById(block);
            var childBlock = mainBlock.children;
            var length = childBlock.length;
            var ulBlock = document.getElementById("USD");
            for (var item in childBlock) {
                if (childBlock[item].innerHTML.match('USD')) {
                    var newLi = document.createElement("li");
                    newLi.innerHTML = childBlock[item].innerHTML;

                    ulBlock.appendChild(newLi);
                } else {
                    continue;
                }
            }
            var newLi = document.createElement('li');
        }

        function findThree(block) {
            var mainBlock = document.getElementById(block);
            var childBlock = mainBlock.children;
            var length = childBlock.length;
            var ulBlock = document.getElementById("USD");
            var count = 0;
            for (var i = 0; i < length; i++) {
                for (var j = 1; j < length; j++) {
                    if (childBlock[i].innerHTML == childBlock[j].innerHTML) {
                        count++;
                    }

                }
                if (count >= 3) {
                    for (var item in childBlock) {
                        childBlock[item].style.color = "#c4c4c4";
                    }
                }
            }
        }

    </script>
    <script type="text/javascript" src="xml.js"></script>
</body>

</html>
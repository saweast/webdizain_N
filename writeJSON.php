<?php
/**
 * Created by PhpStorm.
 * User: lavor
 * Date: 08.05.2016
 * Time: 17:30
 */
$q = $_REQUEST["q"];
//$q .= '
//';
$data = json_decode($q);

$azaza = json_decode($q, true);
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
    }
    $f = fopen("$curr.json", 'w') or die('cannot do this ');
    $s = '{"url":"'.$image.'", "buy":"'.$val.'", "sell":"'.$val*0.95.'"}';
    fwrite($f, $s);
    fclose($f);
}

$newfile = fopen('new.json', 'w') or die('Unable to file!');
fwrite($newfile, $data);
fclose($newfile);

$myfile = fopen("file.json", "w") or die("Unable to open file!");
fwrite($myfile, $q);
fclose($myfile);

?>
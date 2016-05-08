<?php
/**
 * Created by PhpStorm.
 * User: lavor
 * Date: 07.05.2016
 * Time: 15:43
 */


$q = $_REQUEST["q"];
$q = strtolower($q);
$q .= '
';
$myfile = fopen("ann.csv", "a+") or die("Unable to open file!");
fwrite($myfile, $q);
fclose($myfile);
?>
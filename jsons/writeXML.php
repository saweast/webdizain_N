<?php
/**
 * Created by PhpStorm.
 * User: lavor
 * Date: 15.05.2016
 * Time: 14:49
 */

$q = $_REQUEST["q"];
$q = strtolower($q);
$q .= '
';
$myfile = fopen("new.xml", "a+") or die("Unable to open file!");
fwrite($myfile, $q);
fclose($myfile);
?>
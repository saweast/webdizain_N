<?php
$q = $_REQUEST["q"];
$q = strtolower($q);
$q .= '
'; 
$myfile = fopen("new.xml", "a+") or die("Unable to open file!");
fwrite($myfile, $q);
fclose($myfile);
?>
<html>
<body>

<?php
$botname = $_POST["botname"];
if(is_null($botname)) {
    Redirect('/', false);
    die();
}

$file = fopen("test.txt","w");
fwrite($file, "test");

fclose($file);
?>

</body>
</html>

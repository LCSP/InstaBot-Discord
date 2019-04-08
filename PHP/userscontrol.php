<?php 

$mode = $_GET['mode']??'';
$username = $_GET['user']??'';
$channel = $_GET['channel']??''; 
$lastPost = $_GET['lastpost']??'';
$ts = $_GET['ts']??'';

$jsonFile = 'channelList.json';
$jsonString = file_get_contents($jsonFile);
$jsonOBJ = json_decode($jsonString, true);

if ($mode == '1') {
	if (!multiKeyExists($jsonOBJ, $username)) {
		$newUser = array('channel' => $channel, 'lastPost' => $lastPost);
		$jsonOBJ['botUsers'][$username] = $newUser;
		$newJson = json_encode($jsonOBJ);
		file_put_contents($jsonFile, $newJson);
		echo 'done';
		exit();
	}else{
		echo "1";
		exit();
	}
}


if ($mode == '2') {
	if (multiKeyExists($jsonOBJ, $username)) {
		unset($jsonOBJ['botUsers'][$username]);
		$newJson = json_encode($jsonOBJ);
		file_put_contents($jsonFile, $newJson);
		echo 'done';
		exit();
	}else{
		echo "2";
		exit();
	}
}

if ($mode == '3'){
	$jsonOBJ['botUsers'][$username]['lastPost'] = $ts;
	$newJson = json_encode($jsonOBJ);
	file_put_contents($jsonFile, $newJson);
	echo 'done';
	exit();
}


function multiKeyExists(array $arr, $key) {

    // is in base array?
    if (array_key_exists($key, $arr)) {
        return true;
    }

    // check arrays contained in this array
    foreach ($arr as $element) {
        if (is_array($element)) {
            if (multiKeyExists($element, $key)) {
                return true;
            }
        }

    }

    return false;
}



?>
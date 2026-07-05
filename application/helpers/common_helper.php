<?php
function generateRandomString($length)
{
    $base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $max = strlen($base)-1;
    $randomString = '';
    mt_srand((double)microtime()*1000000);
    while (strlen($randomString)< $length+1)
        $randomString = $randomString.$base[mt_rand(0, $max)];

    return $randomString;
}
function time_now()
{
    $timestampInSeconds = now();

    $timezone = 'UP45';
    $daylight_saving = TRUE;

    $timestampInSeconds= gmt_to_local($timestampInSeconds, $timezone, $daylight_saving);
    $dateTimeNow= gmdate("Y-m-d H:i:s", $timestampInSeconds);

    return $dateTimeNow;
}

function is_valid_date($date, $format = 'd-m-Y')
{
    $d = DateTime::createFromFormat($format, $date);
    // The Y ( 4 digits year ) returns TRUE for any integer with any number of digits so changing the comparison from == to === fixes the issue.
    return $d && $d->format($format) === $date;
}

function indent($json) {

    $tab = "    ";
    $new_json = "";
    $indent_level = 0;
    $in_string = false;

    $json_obj = json_decode($json);

    if($json_obj === false)
        return false;

    $json = json_encode($json_obj);
    $len = strlen($json);

    for($c = 0; $c < $len; $c++)
    {
        $char = $json[$c];
        switch($char)
        {
            case '{':
            case '[':
                if(!$in_string)
                {
                    $new_json .= $char . "\n" . str_repeat($tab, $indent_level+1);
                    $indent_level++;
                }
                else
                {
                    $new_json .= $char;
                }
                break;
            case '}':
            case ']':
                if(!$in_string)
                {
                    $indent_level--;
                    $new_json .= "\n" . str_repeat($tab, $indent_level) . $char;
                }
                else
                {
                    $new_json .= $char;
                }
                break;
            case ',':
                if(!$in_string)
                {
                    $new_json .= ",\n" . str_repeat($tab, $indent_level);
                }
                else
                {
                    $new_json .= $char;
                }
                break;
            case ':':
                if(!$in_string)
                {
                    $new_json .= ": ";
                }
                else
                {
                    $new_json .= $char;
                }
                break;
            case '"':
                if($c > 0 && $json[$c-1] != '\\')
                {
                    $in_string = !$in_string;
                }
            default:
                $new_json .= $char;
                break;
        }
    }

    return $new_json;
}

function timeDif($from_time,$to_time)
{

    $timeDiff=round(abs($to_time - $from_time) / 60,0);
    $differenceTxt=" min. ago";

    if($timeDiff>=60)
    {
        $timeDiff=round(abs($timeDiff) /60,0);
        $differenceTxt=" hours ago";
        if($timeDiff>=24)
        {
            $timeDiff=round(abs($timeDiff)/24,0);
            $differenceTxt=" days ago";
            if($timeDiff>=7)
            {
                $timeDiff=round(abs($timeDiff)/7,0);
                $differenceTxt=" weeks ago";
                if($timeDiff>4)
                {
                    $timeDiff=round(abs($timeDiff)/4,0);
                    $differenceTxt=" months ago";
                    if($timeDiff>=12)
                    {
                        $timeDiff=round(abs($timeDiff)/12,0);
                        $differenceTxt=" years ago";
                    }
                }
            }
        }
    }

    return $timeDiff.$differenceTxt;



}
/*
* Sorts json object by the specified index
*/
function sortArray($objectJson, $index)
{
    $object=json_decode($objectJson);
    $sorted=array();
    foreach($object as $obj)
    {
        $sorted[$obj->$index]=$obj;
    }
    ksort($sorted);
    return json_encode($sorted);
}

/*
* Sorts json object by the specified index in reverse order
*/
function sortArrayRev($objectJson, $index)
{
    $object=json_decode($objectJson);
    $sorted=array();
    uksort($object,"localCompare");
    foreach($object as $obj)
    {
        $sorted[$obj->$index]=$obj;
    }
    krsort($sorted);
    $retData=array();
    foreach($sorted as $item)
    {
        $retData[]=$item;
    }
    return json_encode($retData);
}

function popularityCompare($a,$b){
    log_message('info',indent(json_encode($a)));
    log_message('info',indent(json_encode($b)));
    return ($a->popularityCount > $b->popularityCount) ? -1 : (($a->popularityCount == $b->popularityCount) ? 0 : 1);
}
/*
 * FORMATS date
 */

function formatDate($unixTimestamp)
{
    return date("d M y",$unixTimestamp);
}

/*
 * Formats time
 */
function formatTime($unixTimestamp)
{
    return date('g:i A',$unixTimestamp);
}

function round_half($input)
{
    $output = round(($input*2), 0)/2;
    return $output;
}

function objectify($array)
{
    return json_decode(json_encode($array));
}

/**
 * Ajax utilities
 */

/**
 * @param $array array of post data to check
 * @return bool
 */
function checkPost($array)
{
    $status=true;
    foreach($array as $postItem)
    {
        if(!(isset($_POST[$postItem])))
        {
            $status=false;
            break;
        }

    }
    return $status;
}

/**
 *
 * Will add the calling function and file with line number
 *
 * @param $level Codeigniter debug level
 * @param $msg String message
 */
function debugPrint($level,$msg){
    $chunks = explode('/', debug_backtrace()[0]['file']);
    $header = $chunks[count($chunks)-1]."(".debug_backtrace()[0]['line'].") : ".debug_backtrace()[1]['function']."() - ";
    $msg = $header.$msg;
    log_message($level,$msg);
}

function setTimeZone($timeZone){
    if($timeZone!='')
    {
        $sign=substr($timeZone,0,1);
        $difference=$timeZone;
        if(in_array($sign, array('+', '-')))
            $difference=substr($timeZone,1);
        else{
            $sign='+';
        }

        $arr=explode(":", $difference);

        $timeZone=$sign.$arr[0].":".$arr[1].":00";

        $seconds=intval(timeToSeconds($timeZone));
        $timezone=timezone_name_from_abbr("", $seconds, 0);

        $timezone=tz_offset_to_name($sign,$arr[0],$arr[1]);

        date_default_timezone_set($timezone);
    }
}

function timeToSeconds($time)
{
    $time=explode(":",$time);
    return $time[0]*3600+$time[1]*60+$time[2];
}

function tz_offset_to_name($sign, $hour, $minute)
{
    $offset = $sign.(intval($hour)*3600 + intval($minute)*60); // convert hour offset to seconds
    $abbrarray = timezone_abbreviations_list();
    foreach ($abbrarray as $abbr)
    {
        foreach ($abbr as $city)
        {
            if ($city['offset'] == $offset)
            {
                return $city['timezone_id'];
            }
        }
    }

    return FALSE;
}

function send_sms($mobileNumber,$message){
    //Your authentication key
    $authKey = SMS_AUTH_KEY;

    //Multiple mobiles numbers separated by comma
    $mobileNumber = $mobileNumber;

    //Sender ID,While using route4 sender id should be 6 characters long.
    $senderId = SMS_SENDER_ID;

    //Your message to send, Add URL encoding here.
    $message = urlencode($message);

    //Define route (1 -Promotional 4 - Transactional)
    $route = "4";
    //Prepare you post parameters
    $postData = array(
        'authkey' => $authKey,
        'mobiles' => $mobileNumber,
        'message' => $message,
        'sender' => $senderId,
        'route' => $route
    );

    //API URL
    $url="https://sms.globehost.in/api/sendhttp.php?";

    // init the resource
    $ch = curl_init();
    curl_setopt_array($ch, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postData
        //,CURLOPT_FOLLOWLOCATION => true
    ));


    //Ignore SSL certificate verification
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);


    //get response
    $output = curl_exec($ch);

    //Print error if any
    if(curl_errno($ch))
    {
        echo 'error:' . curl_error($ch);
    }

    curl_close($ch);

    //    echo $output;
}

function send_email($to, $subject, $msg, $email_bcc = null){

    $config = Array(
        'protocol' => MAIL_PROTOCOL,
        'smtp_host' => SMTP_HOST,
        'smtp_port' => SMTP_PORT,
        'smtp_user' => SMTP_USER, // Your email
        'smtp_pass' => SMTP_PASS, // Password
        'mailtype' => 'html',
        'charset' => 'utf-8',
        'wordwrap' => TRUE
    );

    $CI = get_instance();
    $CI->email->initialize($config);
    $CI->load->library('email', $config);

    $from = SMTP_FROM_MAIL;
    $CI->email->set_newline("\r\n");
    $CI->email->from($from, SMTP_FROM); // Email
    $CI->email->to($to);    // Password
    $CI->email->bcc($email_bcc);
    $CI->email->subject($subject);
    $CI->email->message($msg);

    if($CI->email->send()){
        return true;
    } else {
        show_error($CI->email->print_debugger());
        return false;
    }

}

function send_email_attachment($to, $subject, $msg, $attachment){

    $config = Array(
        'protocol' => MAIL_PROTOCOL,
        'smtp_host' => SMTP_HOST,
        'smtp_port' => SMTP_PORT,
        'smtp_user' => SMTP_USER, // Your email
        'smtp_pass' => SMTP_PASS, // Password
        'mailtype' => 'html',
        'charset' => 'utf-8',
        'wordwrap' => TRUE
    );

    $CI = get_instance();
    $CI->email->initialize($config);
    $CI->load->library('email', $config);

    $from = SMTP_FROM_MAIL;
    $CI->email->set_newline("\r\n");
    $CI->email->from($from, SMTP_FROM); // Email
    $CI->email->to($to);// Password
    $CI->email->subject($subject);
    $CI->email->message($msg);
    $total=explode(',',$attachment);
    $totalImage=count($total);
    for($i=0;$i<$totalImage;$i++){
        $CI->email->attach($total[$i]);
    }

    if($CI->email->send()){
        return true;
    } else {
        show_error($CI->email->print_debugger());
        return false;
    }

}

function getDatesFromRange($start, $end, $format = 'd-m-Y') {

    // Declare an empty array
    $array = array();

    // Variable that store the date interval
    // of period 1 day
    $interval = new DateInterval('P1D');

    $realEnd = new DateTime($end);
    $realEnd->add($interval);

    $period = new DatePeriod(new DateTime($start), $interval, $realEnd);

    // Use loop to store date into array
    foreach($period as $date) {
        $array[] = $date->format($format);
    }

    // Return the array elements
    return $array;
}

function sendDataToS3($fileData){
    $CI =& get_instance();
    $CI->load->library('S3');
    //Since we've decided to optimize the uploads, do all the things that codeigniter's default upload library did including from checking allowed file types to allowed max file size to generating a random string and appending it so that multiple same file upload wont overwrite the existing file.

    if (isset($fileData["name"]))
        $target_file = basename($fileData["name"]);
    else
        $target_file = date('dmyhis');
    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
    $imageFileType = strtolower($imageFileType);
    $rawFileName = basename($target_file, "." . $imageFileType);

    $validFileType = explode('|', $CI->config->item('document_allowed_file_types'));

    $modRawNames = $rawFileName . "_" . generateRandomString(10); // Removed salt as its being handled from mobile side
    $modRawName = preg_replace('/\s+/', '', $modRawNames);
    //converting Bytes to KB, for some reason it says 1 MB if we specify 10 MB
    $validSize = $CI->config->item('upload_max_file_size') * 1000;

    if (in_array($imageFileType, $validFileType)) {
        //valid file type
        if (isset($fileData['tmp_name']) && $fileData['tmp_name']!="")
            $file = $fileData['tmp_name'];

        $bucket = S3BUCKETNAME;
        if (isset($fileData['size']) && $fileData['size']!= 0 && $fileData['size'] <= $validSize){

//            $relPath = "logos/" . $modRawName.".".$imageFileType;
            $relPath = "submittal/" . $modRawName.".".$imageFileType;
//            log_message('dev',"<<ATTACHED FILE>>".$relPath);

            if (S3::putObject(S3::inputFile($file), $bucket, $relPath, S3::ACL_PUBLIC_READ)) {
//                log_message("dev","file link - ".S3BUCKETURL.$relPath);
                return S3BUCKETURL.$relPath;
            } else {
//                log_message("dev","failed to upload file to S3");
                return FALSE;
            }
        } else {
//            log_message('dev', 'File size > max upload file size');
            return FALSE;
        }
    } else {
        //invalid file type
        return FALSE;
    }
}

/**
 * @param $timestamp    : Unix timestamp in the given timezone
 * @param $timezone     : timezone (+/-hh:mm) e.g. +05:30
 * @return int          :  unix timestamp in GMT
 */
function convertUnixToGMT($timestamp, $timezone){

    $sign = substr($timezone,0,1);
    $time = substr($timezone,1,strlen($timezone));
    $time = explode(":",$time);
    $utcTime = $time[0]*3600+$time[1]*60+$time[2];
    if($sign == "+"){
        $endTime = $timestamp - $utcTime ;
    }else{
        $endTime = $timestamp + $utcTime;
    }
    return $endTime;
}

/**
 * @param $dt           : date string in given timezone in format Y-m-d (e.g. 2016-07-13)
 * @param $time         : time staring in give timezone in format H:i:s (e.g. 17:31:00)
 * @param $timezone     : timezone (+/-hh:mm) e.g. +05:30
 * @return int|mixed    :  unix timestamp in GMT
 */
function convertToGMT($dt ,$time,$timezone){
    $timestamp = strtotime("$dt $time");
    // echo $timestamp;
    return convertUnixToGMT($timestamp, $timezone);
}


/**
 * @param $timestamp    : Unix timestamp in the given timezone
 * @param $timezone     : timezone (+/-hh:mm) e.g. +05:30
 * @return int          :  unix timestamp in GMT
 */

function convertUnixToLocal($timestamp, $timezone){
    //echo $timestamp;
    $sign = substr($timezone,0,1);
    //echo '    '.$sign;
    $time = substr($timezone,1,strlen($timezone));
    //echo '    '.$time;
    $time = explode(":",$time);
    // print_r($time);
    $utcTime = $time[0]*3600+$time[1]*60+$time[2];
    // print_r($utcTime);

    if($sign == "+"){
        $endTime = $timestamp + $utcTime ;
    }else{
        $endTime = $timestamp -$utcTime;
    }

    return $endTime;
}

/**
 * @param $dt           : date string in given timezone in format Y-m-d (e.g. 2016-07-13)
 * @param $time         : time staring in give timezone in format H:i:s (e.g. 17:31:00)
 * @param $timezone     : timezone (+/-hh:mm) e.g. +05:30
 * @return int|mixed    :  unix timestamp in GMT
 */

function convertToLocal($dt,$time,$timezone){
    $timestamp = strtotime("$dt $time");
    return convertUnixToLocal($timestamp,$timezone);
}

/*upload multiple image in s3 bucket*/
function multi_image($name)
{
    $CI =& get_instance();

// retrieve the number of images uploaded;
    $number_of_files = sizeof($_FILES[$name]['tmp_name']);
    // considering that do_upload() accepts single files, we will have to do a small hack so that we can upload multiple files. For this we will have to keep the data of uploaded files in a variable, and redo the $_FILE.
    $files = $_FILES[$name];
    $errors = array();
    $data = array();
    $names = array();

    // first make sure that there is no error in uploading the files
    for ($i = 0; $i < $number_of_files; $i++) {
        if ($_FILES[$name]['error'][$i] != 0) $errors[$i][] = 'Couldn\'t upload file ' . $_FILES[$name]['name'][$i];
    }
    if (sizeof($errors) == 0) {

        for ($i = 0; $i < $number_of_files; $i++) {
            $_FILES[$name]['name'] = $files['name'][$i];
            $_FILES[$name]['type'] = $files['type'][$i];
            $_FILES[$name]['tmp_name'] = $files['tmp_name'][$i];
            $_FILES[$name]['error'] = $files['error'][$i];
            $_FILES[$name]['size'] = $files['size'][$i];


            // we retrieve the number of files that were uploaded
            $data[] = sendDataToS3($_FILES[$name]);
            $names[] = $_FILES[$name]['name'];

            if($i == 20){
                break;
            }
        }
    }

    return array(
        'image_path' => $data,
        'image_names' => $names
    );

}

/*validate unix timestamp*/
function isValidTimeStamp($timestamp)
{
    return ((string) (int) $timestamp === $timestamp)
        && ($timestamp <= PHP_INT_MAX)
        && ($timestamp >= ~PHP_INT_MAX);
}

/*show last seen*/
function get_timeago( $ptime )
{
    $etime = time() - $ptime;

    if( $etime < 1 )
    {
        return 'less than '.$etime.' second ';
    }

    $a = array( 12 * 30 * 24 * 60 * 60  =>  'year',
        30 * 24 * 60 * 60       =>  'month',
        24 * 60 * 60            =>  'day',
        60 * 60             =>  'hour',
        60                  =>  'minute',
        1                   =>  'second'
    );

    foreach( $a as $secs => $str )
    {
        $d = $etime / $secs;

        if( $d >= 1 )
        {
            $r = round( $d );
            return  $r . ' ' . $str . ( $r > 1 ? 's' : '' ) . ' ';
        }
    }
}

function allEquals_val($vals,$chkstr) {
    if (!is_array($vals)) { die('allEquals() $vals not an array'); }
    foreach ($vals AS $v) {
        if ($chkstr != $v) { return false; }
    }
    return true;
}


/*upload multi files in local*/
function multi_image_local($name)
{
    $CI =& get_instance();

// retrieve the number of images uploaded;
    $filesCount = count($_FILES[$name]['name']);
    // considering that do_upload() accepts single files, we will have to do a small hack so that we can upload multiple files. For this we will have to keep the data of uploaded files in a variable, and redo the $_FILE.
    $data = array();
    $names = array();
    for($i = 0; $i < $filesCount; $i++) {
        $set_name = date('d-m-y h:i',time());
        $_FILES['file']['name']     = $set_name.'_'.$_FILES[$name]['name'][$i];
        $_FILES['file']['name']     = $set_name.'_'.$_FILES[$name]['name'][$i];
        $_FILES['file']['type']     = $_FILES[$name]['type'][$i];
        $_FILES['file']['tmp_name'] = $_FILES[$name]['tmp_name'][$i];
        $_FILES['file']['error']     = $_FILES[$name]['error'][$i];
        $_FILES['file']['size']     = $_FILES[$name]['size'][$i];

        // File upload configuration
        $uploadPath = 'uploads/';
        $config['upload_path'] = $uploadPath;
        $config['allowed_types'] = '*';

        // Load and initialize upload library
        $CI->load->library('upload', $config);
        $CI->upload->initialize($config);

        // Upload file to server
        if ($CI->upload->do_upload('file')) {
            // Uploaded file data
            $fileData = $CI->upload->data();
            $data[] = $fileData['file_name'];
            $names[] = $_FILES[$name]['name'][$i];
        }else{
            $error = array('error' => $CI->upload->display_errors());
        }

        if($i == 20){
            break;
        }
    }

    return array(
        'image_path' => $data,
        'image_names' => $names
    );

}

/*upload single files in local*/
function upload_file($name, $type, $user_name) {
    $CI =& get_instance();

    // Format tanggal hari ini
    $date = date('Ymd');

    // Bersihkan nama user untuk menghindari karakter aneh
    $clean_user_name = preg_replace('/[^a-zA-Z0-9]/', '_', strtolower($user_name));

    // Tentukan prefix berdasarkan tipe file
    $prefix = ($type == 'surat_izin_ortu') ? 'SIO' : 'SK';

    // Buat nama file baru
    $new_file_name = "{$date}_{$prefix}_{$clean_user_name}.pdf";

    // Konfigurasi upload
    $uploadPath = 'debug/assets/uploads/';
    $config['upload_path']   = $uploadPath;
    $config['allowed_types'] = 'pdf';
    $config['file_name']     = $new_file_name;
    $config['overwrite']     = true; // Supaya file lama dengan nama sama tertimpa

    // Load dan inisialisasi library upload
    $CI->load->library('upload', $config);
    $CI->upload->initialize($config);

    if ($CI->upload->do_upload($name)) {
        return $new_file_name; // Simpan nama file ke database
    } else {
        return false; // Gagal upload
    }
}

/*upload single image in local bucket*/
function single_image_local($file_name,$fieldName,$file_path)
{

    $CI =& get_instance();

    // considering that do_upload() accepts single files, we will have to do a small hack so that we can upload multiple files. For this we will have to keep the data of uploaded files in a variable, and redo the $_FILE.
    $files = $file_name;

    $target_file = '';

    if($files['name']) {

        // now, taking into account that there can be more than one file, for each file we will have to do the upload
        // we first load the upload library
        $CI->load->library('upload');
        // next we pass the upload path for the images

        // also, we make sure we allow only certain type of images

        $fileSaveName=time();
        $config = array();
        $config['upload_path'] = $file_path;
        $config['allowed_types'] = 'jpg|png|jpeg';
        $config['file_name'] = $fileSaveName;
        if (!is_dir($config['upload_path'])) {
            mkdir($config['upload_path'], 0777, TRUE);
        }
        $CI->load->library('upload', $config, 'lib');  // Create custom object for catalog upload
        $CI->lib->initialize($config);
        $upload_catalog=$CI->lib->do_upload($fieldName);
        //$upload_catalog = $CI->lib->do_upload($files['name']);
        if ($upload_catalog) {
            $data = $CI->lib->data();
            $realPath = $file_path;
            $trimPart = '../www/';
            $trimmed = str_replace($trimPart, '', $realPath);
            $target_file = $trimmed . $fileSaveName . $data['file_ext'];
        }

    }

    return $target_file;


}

function float_decimal($number,$decimal){
    return number_format((float)$number, $decimal, '.', '');
}

function time_greeting(){

    /* This sets the $time variable to the current hour in the 24 hour clock format */
    $time = date("H");

    /* If the time is less than 1200 hours, show good morning */
    if ($time < "12") {
        echo "Good Morning";
    }
    /* If the time is grater than or equal to 1200 hours, but less than 1700 hours, so good afternoon */
    if ($time >= "12" && $time < "17") {
        echo "Good Afternoon";
    } /* Should the time be between or equal to 1700 and 1900 hours, show good evening */
    if ($time >= "17" && $time < "19") {
        echo "Good Evening";
    }
    /* Finally, show good night if the time is greater than or equal to 1900 hours */
    if ($time >= "19") {
        echo "Good Evening";
    }


}

function getWorkingDaysCount($startDate,$endDate,$holidays) {
    $start = new DateTime($startDate);
    $end = new DateTime($endDate);
    // otherwise the  end date is excluded (bug?)
    $end->modify('+1 day');

    $interval = $end->diff($start);

    // total days
    $days = $interval->days;

    // create an iterateable period of date (P1D equates to 1 day)
    $period = new DatePeriod($start, new DateInterval('P1D'), $end);

    foreach($period as $dt) {
        $curr = $dt->format('D');

        // substract if Saturday or Sunday
        if ($curr == 'Sat' || $curr == 'Sun') {
            $days--;
        }

        // (optional) for the updated question
        elseif (in_array($dt->format('Y-m-d'), $holidays)) {
            $days--;
        }
    }

    return $days;
}

function getWorkingDays($startDate,$endDate,$holidays) {
    $start = new DateTime($startDate);
    $end = new DateTime($endDate);
    // otherwise the  end date is excluded (bug?)
    $end->modify('+1 day');

    $interval = $end->diff($start);

    // create an iterateable period of date (P1D equates to 1 day)
    $period = new DatePeriod($start, new DateInterval('P1D'), $end);

    // Declare an empty array
    $dates_array = array();

    // Use loop to store date into array
    foreach($period as $dt) {

        $day_num = $dt->format("N"); /* 'N' number days 1 (mon) to 7 (sun) */
        if($day_num < 6) { /* weekday */
            if (!in_array($dt->format('Y-m-d'), $holidays)) {
                $dates_array[] = $dt->format('Y-m-d');
            }
        }

    }

    return $dates_array;
}

function getMonths($startDate,$endDate) {

    $start    = new DateTime($startDate);
    $start->modify('first day of this month');
    $end      = new DateTime($endDate);
    $end->modify('first day of next month');
    $interval = DateInterval::createFromDateString('1 month');
    $period   = new DatePeriod($start, $interval, $end);

    // Declare an empty array
    $months = array();

    foreach ($period as $dt) {
        $months[] = $dt->format('m-Y');
    }

    return $months;
}

function get_brightness($hex) {
    // returns brightness value from 0 to 255
    // strip off any leading #
    $hex = str_replace('#', '', $hex);
    $c_r = hexdec(substr($hex, 0, 2));
    $c_g = hexdec(substr($hex, 2, 2));
    $c_b = hexdec(substr($hex, 4, 2));

    return (($c_r * 299) + ($c_g * 587) + ($c_b * 114)) / 1000;
}

function rest_client($contact_us_name,$contact_us_email,$contact_us_phone,$lead_company_name,$contact_us_message,$lead_url,$ip_address_contact_us){

    //Prepare you post parameters
    $postData = array(
        'lead_name' => $contact_us_name,
        'lead_phone' => $contact_us_phone,
        'lead_email' => $contact_us_email,
        'lead_company_name' => $lead_company_name,
        'lead_message' => $contact_us_message,
        'lead_ip_address' => $ip_address_contact_us,
        'lead_url' => $lead_url,
    );

    //API URL
    $url="https://crm.techasoft.com/welcome/techasoftfoundation_form";

    // init the resource
    $ch = curl_init();
    curl_setopt_array($ch, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postData
        //,CURLOPT_FOLLOWLOCATION => true
    ));


    //Ignore SSL certificate verification
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);


    //get response
    $output = curl_exec($ch);

    //Print error if any
    if(curl_errno($ch))
    {
        echo 'error:' . curl_error($ch);
    }

    curl_close($ch);

    //    echo $output;
}






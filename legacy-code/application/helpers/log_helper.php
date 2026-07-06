<?php
/**
 * Created by PhpStorm.
 * User: cyberrspiritt
 * Date: 10/06/17
 * Time: 18:22
 */



function logHttpRequests($userID = false, $return = false){
    $message = '';
    $url = base_url(uri_string());
    $api  = stristr($url,"api");
    $method = $_SERVER['REQUEST_METHOD'];
    log_message("dev","-------------------------------------");
    $message = logHeaders($return);
    if($return){
        $message .= "<br />----------- API AND PARAMS START ---------------<br/>";
    }
    else{
        log_message("dev","----------- API AND PARAMS START ---------------");
    }
    if($userID == false){
        if(!$return)
            log_message("dev",$api."_" .strtolower($method). " User not logged in");
        else
            $message .= $api."_" .strtolower($method). " User not logged in<br />";
    } else {
        if(!$return)
            log_message("dev",$api."_" .strtolower($method). " User_id:" .$userID);
        else
            $message .= $api."_" .strtolower($method). " User_id:" .$userID . "<br />";
    }
    $params = array();
    switch ($method) {
        case 'PUT':
            $params = array();
            parse_str(file_get_contents("php://input"),$params);
            break;
        case 'POST':
            $params = $_POST;
            break;
        case 'GET':
            $params = $_GET;
            break;
        case 'DELETE':
//            if (isset($_SERVER['CONTENT_TYPE']) && stripos($_SERVER["CONTENT_TYPE"], "application/json")===false) {
            //$_POST = json_decode(file_get_contents("php://input"));
            parse_str(file_get_contents('php://input'), $params);
//            } else {
//                $params = (array)json_decode(file_get_contents("php://input"));
//            }
            break;
        default:
            break;
    }

    $message .= logParams($params, $return);
    if(!$return){
        log_message("dev","----------- API AND PARAMS END ---------------");
        log_message("dev","-------------------------------------");
    }
    else{
        $message .= '<br />----------- API AND PARAMS END ---------------';
        return $message;
    }

}

function logHeaders($return = FALSE){
    $msg = '';
    if($return){
        $msg = '----------- HEADERS START ----------------';
    }
    else{
        log_message("dev","----------- HEADERS START ----------------");
    }

    $arr_main_array = getallheaders();
    $logString = " \n ";
    foreach($arr_main_array as $key => $value){
        $exp_key = explode('-', $key);
        if($exp_key[0] == 'FMC'){
            $arr_result[] = $value;
            $logString .= $key." : ".$value." \n ";
        }
    }
    if($return){
        $msg .= "<br />". nl2br($logString);
        $msg .= "----------- HEADERS END ----------------";
        return $msg;
    }
    else{
        log_message('dev', $logString);
        log_message("dev","----------- HEADERS END ----------------");
    }

}

function logParams($params, $return = FALSE){
    $logString = " \n ";
    foreach ($params as $key => $value){

        //check if value is array
        if(is_array($value)) {
            $value  = 'array => '.implode(',',$value);
        }
        $logString .= $key . " : " . $value . " \n ";

    }
    if($return)
        return nl2br($logString);
    else
        log_message('dev', $logString);
}

/*set custom handler*/
function errorHandler($errNo, $errString, $errFile, $errLine){


    $message = "<h2>Error from </h2>" .WEBSITE_NAME;
    $title = '';
    switch ($errNo){
        case E_USER_ERROR:
            $title = "<b>USER ERROR</b> [$errNo] : $errString";
            break;
        case E_USER_WARNING:
            $title = "<b>USER WARNING</b> [$errNo] : $errString";
            break;
        case E_ERROR:
            $title = "<b>FATAL ERROR</b> [$errNo] : $errString";
            break;
        case E_WARNING:
            $title = "<b>WARNING</b> [$errNo] : $errString";
            break;
        case E_PARSE:
            $title = "<b>PARSE ERROR</b> [$errNo] : $errString";
            break;
        case E_NOTICE:
            $title = "<b>NOTICE ERROR</b> [$errNo] : $errString";
            break;
        case E_STRICT:
            $title = "<b>STRICT ERROR</b> [$errNo] : $errString";
            break;

    }
    if($title){
        $exp = new Exception();
        $errExpt = new ErrorException();
        if((int) $errExpt->getSeverity() == 8192){
            return;
        }
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        $message .= '<p>Base-URL: '.base_url().'</p>';
        $message .= '<p>Remote-IP: '.$ip.'</p>';
        $message .= '<p>Type: '.$title.'</p>';
        $message .= '<p>Code: '.$errNo.'</p>';
        $message .= '<p>Message: '. $errString .'</p>';
        $message .= '<p>Filename: '. $errFile .'</p>';
        $message .= '<p>Line Number: '. $errLine .'</p>';
        $message .= '<p>Backtrace: </p>';
        foreach ($exp->getTrace() as $error){
            if(isset($error['file'])) {
                $message .= '<p style="margin-left:10px">
                            File: ' . $error['file'] . '<br />
                            Line: ' . $error['line'] . '<br />
                            Function: ' . $error['function']
                    . '</p>';
            }
        }

        $message .= "<br/>".logHttpRequests(false, TRUE);

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
        $CI->email->from($from, SMTP_FROM); // Email:  mnkmr48@gmail.com,masumjaz@gmail.com,spkumar257@gmail.com
        $CI->email->to('masumjaz@gmail.com,mnkmr48@gmail.com,sundeepc25@gmail.com');// Password
        $CI->email->subject(''.WEBSITE_NAME.' web Error ('.date('d-m-y h:i:s',time()).')');
        $CI->email->message($message);

        if ($CI->email->send()) {
            log_message("dev","----------- Error email sent-------------");
        } else {
            log_message("dev","----------- Error email failed-------------");
        }
        echo $message."Something Went Wrong Please Try Again Later";
        die;
    }
}

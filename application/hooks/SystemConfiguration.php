<?php
/**
 * Created by PhpStorm.
 * User: mayur
 * Date: 1/21/15
 * Time: 11:30 AM
 */
class SystemConfiguration
{

    public $CI;

    function __construct() {
//        $CI=&get_instance();

    }

    function initConfig(){
       
        $this->CI =& get_instance();
        /* Init db migrations */
        log_message('info',"INIT DB MIGRATIONS");
        $this->CI->load->library('migration');

        //$this->CI->migration->version(20180313185622);

        if(!$this->CI->migration->latest()){
            show_error($this->CI->migration->error_string());
        }
    }
}
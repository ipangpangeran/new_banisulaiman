<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$autoload['packages'] = array();

$autoload['libraries'] = array('ion_auth','database', 'session','user_agent','email','form_validation','upload','Asynch_task','pagination','excel');

$autoload['drivers'] = array();

$autoload['helper'] = array('url','file', 'common_helper', 'date','form','security','string', 'log_helper');

$autoload['config'] = array('basicSettings');

$autoload['language'] = array('ion_auth_lang','auth_lang');

$autoload['model'] = array('Generic_model','Ion_auth_model','Common_model');

<?php
defined('BASEPATH') OR exit('No direct script access allowed');


if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
    $uri = 'https://';
} else {
    $uri = 'https://';
}

if(ENVIRONMENT == 'production'){
    $uri = "https://";
}

$root = $uri.$_SERVER['HTTP_HOST'];
$root .= str_replace(basename($_SERVER['SCRIPT_NAME']),"",$_SERVER['SCRIPT_NAME']);
#$config['base_url']    = "$root";
$config['base_url'] = 'https://banisulaiman.or.id/';
$config['index_page'] = '';
$config['uri_protocol'] = 'AUTO';
$config['enable_query_strings'] = FALSE;

$config['url_suffix'] = '';


$config['language']	= 'english';


$config['charset'] = 'UTF-8';


$config['enable_hooks'] = TRUE;


$config['subclass_prefix'] = 'MY_';


$config['composer_autoload'] = FALSE;


$config['permitted_uri_chars'] = 'a-z 0-9~%.:_\-=';

$config['controller_trigger'] = 'c';
$config['function_trigger'] = 'm';
$config['directory_trigger'] = 'd';


$config['allow_get_array'] = TRUE;


$config['log_threshold'] = 2;


$config['log_path'] = '';


$config['log_file_extension'] = '';


$config['log_file_permissions'] = 0644;


$config['log_date_format'] = 'Y-m-d H:i:s';


$config['error_views_path'] = '';


$config['cache_path'] = '';


$config['cache_query_string'] = FALSE;


$config['encryption_key'] = '';


$config['sess_driver'] = 'files';
$config['sess_cookie_name'] = 'elm_session';
$config['sess_expiration'] = 604800;
$config['sess_save_path'] = '/tmp';
$config['sess_match_ip'] = FALSE;
$config['sess_time_to_update'] = 1000;
$config['sess_regenerate_destroy'] = FALSE;


$config['cookie_prefix']	= '';
$config['cookie_domain']	= '';
$config['cookie_path']		= '/';
$config['cookie_secure']	= FALSE;
$config['cookie_httponly'] 	= FALSE;


$config['standardize_newlines'] = FALSE;


$config['global_xss_filtering'] = FALSE;


$config['csrf_protection'] = FALSE;
$config['csrf_token_name'] = 'elm_csrf';
$config['csrf_cookie_name'] = 'elm_csrf';
$config['csrf_expire'] = 7200;
$config['csrf_regenerate'] = False;
$config['csrf_exclude_uris'] = array();


$config['compress_output'] = FALSE;


$config['time_reference'] = 'local';


$config['rewrite_short_tags'] = FALSE;


$config['proxy_ips'] = '';

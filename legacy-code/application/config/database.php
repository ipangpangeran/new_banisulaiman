<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$active_group = 'development';
$query_builder = TRUE;

$db['development'] = array(
    'dsn'      => '',
    'hostname' => getenv('DB_HOSTNAME') ?: 'localhost',
    'port'     => getenv('DB_PORT') ?: 3306,
    'username' => getenv('DB_USERNAME') ?: 'root',
    'password' => getenv('DB_PASSWORD') ?: '',
    'database' => getenv('DB_DATABASE') ?: 'my_database',
    'dbdriver' => 'mysqli',
    'dbprefix' => '',
    'pconnect' => FALSE,
    'db_debug' => (ENVIRONMENT !== 'production'),
    'cache_on' => FALSE,
    'cachedir' => '',
    'char_set' => 'utf8',
    'dbcollat' => 'utf8_general_ci',
    'swap_pre' => '',
    'encrypt' => FALSE,
    'compress' => FALSE,
    'stricton' => FALSE,
    'failover' => array(),
    'save_queries' => TRUE
);
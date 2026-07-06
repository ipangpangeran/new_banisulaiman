<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
$route['login'] = 'Auth/login';
$route['robots\.txt'] = '/welcome/robot';
$route['blogs'] = '/welcome/blogs';
$route['signin'] = 'welcome/signin';
$route['post/(:any)'] = '/welcome/post/$1';
$route['thank-you'] = '/welcome/thankyou';

//menu
$route['berita'] = '/welcome/berita';
$route['contact-us'] = '/welcome/contact_us';
$route['donasi'] = '/welcome/donasi';
$route['fasilitas'] = '/welcome/fasilitas';
$route['galeri'] = '/welcome/galeri';
$route['informasi'] = 'welcome/informasi';
$route['kegiatan'] = '/welcome/kegiatan';
$route['kegiatan-harian'] = '/welcome/kegiatan_harian';
$route['kegiatan-mingguan'] = '/welcome/kegiatan_mingguan';
$route['kegiatan-tahunan'] = '/welcome/kegiatan_tahunan';
$route['program_pendidikan'] = 'welcome/program_pendidikan';

//pendaftaran
$route['pendaftaran'] = '/welcome/pendaftaran';
$route['pendaftaran/submit'] = 'pendaftaran/submit';
$route['registrasi'] = '/welcome/registrasi';

//redirect to website
$route['(:any)'] = 'Auth/login/$1';


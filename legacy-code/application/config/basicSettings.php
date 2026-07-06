<?php

if(ENVIRONMENT == 'development'){
    /* developer mode */
    $config['developer_mode_on'] = true;
    define('EMAIL_ERRORS', TRUE);
} else {
    $config['developer_mode_on'] = false;
    define('EMAIL_ERRORS', TRUE);
}


/* Utility constants */
define('MB', 1024);
define('defaultCountry', 102);


/**
 * General configuration
 */

/**
 * Search Configuration
 */
define('SEARCH_DISTANCE', 10000);

/**
 * Default coverage area (km)
 * This distance would be used as a radius for searching mentors
 * This configuration can be changed by the administrator. Refer to SystemConfiguration hook for this.
 */


/**
 * chat configuration
 */
if(ENVIRONMENT == 'development')
    $config['chat_host'] = ""; //put production ip
else
    $config['chat_host'] = ""; //put local ip
    $config['chat_port'] = "";
    $config['media_allowed_file_types'] = "jpg|jpeg|bmp|png|gif|mp4|mkv|flv|avi|m4v|mov";
    $config['document_allowed_file_types'] = "pdf|doc|docx|rtf|jpg|jpeg|bmp|png|gif|PDF";
    $config['upload_max_file_size'] = 250 * MB;



/**
 * Google reCAPTCHA Key
 */
$config['re_captcha']='';


/**
 * Basic List for home screen
 */
define('QUERY_LIMIT',1000);
define('OFFSET_LIMIT',0);

define('WEBSITE_NAME', 'Ma\'had Bani Sulaiman');
/**
 * MAIL configurations
 */
define('MAIL_PROTOCOL', 'smtp');
define('SMTP_HOST', 'ssl://mail.banisulaiman.or.id');  // Updated to your SMTP server
define('SMTP_PORT', 465);  // No change needed, as your server uses port 465
define('SMTP_USER', 'admin@banisulaiman.or.id');  // Updated to your username
define('SMTP_PASS', 'ingatmatiAA26!');  // Replace with your actual email account password
define('SMTP_FROM_MAIL', 'admin@banisulaiman.or.id');  // Updated to your "from" email address
define('SMTP_FROM', WEBSITE_NAME);  // Assuming WEBSITE_NAME is still valid in your context


/*set admin emails to receive emails*/
define('ADMIN_EMAILS','admin@banisulaiman.or.id');




/**
 * DO NOT EDIT
 *
 * These settings are based on definitions above
 *
 * If you really want to edit you better know what you are doing
 *
 */
if ($config['developer_mode_on']) {
    /*
     * This path for login page
     * */
    define('JS_PATH', $this->config['base_url'] . "debug/assets/js/");
    define('JS_EXT', ".js");
    define('CSS_PATH', $this->config['base_url'] . "debug/assets/css/");
    define('CSS_EXT', ".css");
    define('IMAGE_PATH', $this->config['base_url'] . "debug/assets/images/");
    define('LAMPIRAN_PATH', $this->config['base_url'] . "debug/assets/lampiran/");
    define('FONT_AWESOME', $this->config['base_url'] . "debug/assets/font-awesome/css/");
    define('PLUGIN_PATH', $this->config['base_url'] . "debug/assets/plugins/");
    define('ASSETS_PATH', $this->config['base_url'] . "debug/assets/");
    // define('UPLOAD_PATH', $this->config['base_url'] . "uploads/");
    define('UPLOAD_PATH', FCPATH . "debug/assets/uploads/");
    define('DB_BACKUP_PATH', $this->config['base_url'] . "db/");
    define('FONT_PATH', $this->config['base_url'] . "debug/assets/fonts/");
    define('IMAGE_BLOG_PATH', $this->config['base_url'] . "");

} else {
    define('JS_PATH', $this->config['base_url'] . "debug/assets/js/");
    define('JS_EXT', ".min.js");
    define('CSS_PATH', $this->config['base_url'] . "debug/assets/css/");
    define('CSS_EXT', ".min.css");
    define('IMAGE_PATH', $this->config['base_url'] . "debug/assets/images/");
    define('LAMPIRAN_PATH', $this->config['base_url'] . "debug/assets/lampiran/");
    define('PLUGIN_PATH', $this->config['base_url'] . "debug/assets/plugins/");
    define('FONT_PATH', $this->config['base_url'] . "debug/assets/fonts/");
}


//gender
define('MALE', '1');
define('FEMALE', '2');
define('OTHER', '3');
define('NOT_SHARE', '4');

/*
 * This Status for Activate or Deactivate Store From super admin
 */

define('DEACTIVATE',0);
define('ACTIVATE',1);
define('DRAFT',2);

/*settings for account activation*/
define('NOT_VERIFIED',0);
define('VERIFIED',1);

/**
 * USER GROUp CODES
 * This can be changed from database so please check before changing
 */
define('ADMIN',1);
define('SUB_ADMIN',2);
define('COMPANY_ADMIN',3);
define('MENTOR',4);
define('MENTEE',5);


/* Goal Status */
define('STATUS_PENDING', 0);
define('STATUS_DECLINE', 1);
define('STATUS_APPROVED', 2);

define('TYPE_JOB',1);
define('TYPE_WEEKEND_DRIVE',2);
define('TYPE_INTERNSHIP',3);
define('TYPE_FRESHER',4);

/*error messages*/
define('SOMETHING_WRONG', 'Something Went Wrong, Please Try Again.');

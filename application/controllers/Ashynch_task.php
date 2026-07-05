<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ashynch_task extends CI_Controller {


    function __construct() {
        parent::__construct();
    }


    public function send_email()
    {

        $send_to = $this->input->post('send_to');
        $message = $this->input->post('message');
        $subject = $this->input->post('subject');
        $email_bcc = $this->input->post('email_bcc');

        $sent = send_email($send_to, $subject, $message, $email_bcc);
    }

    public function send_email_attachment()
    {

        $send_to = $this->input->post('send_to');
        $message = $this->input->post('message');
        $subject = $this->input->post('subject');
        $attachment = $this->input->post('attachment');

        $sent = send_email_attachment($send_to, $subject, $message,$attachment);
    }

    public function send_sms()
    {

        $phone = $this->input->post('phone');
        $message = $this->input->post('message');

        send_sms($phone,$message);
    }

}

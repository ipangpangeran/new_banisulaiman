<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_contact_us extends CI_Migration {

    public function up() {

        //add enquiry us form
        $fields = array(
            'enquiry_id' => array(
                'type' => 'INT',
                'constraint' => 8,
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'enquiry_name_pop_up' => array(
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => TRUE,
            ),
            'enquiry_phone_pop_up' => array(
                'type' => 'INT',
                'constraint' => 64,
                'null' => TRUE,
            ),
            'enquiry_email_pop_up' => array(
                'type' => 'VARCHAR',
                'constraint' => 64,
                'null' => TRUE,
            ),
            'enquiry_services_pop_up' => array(
                'type' => 'INT',
                'constraint' => 64,
                'null' => TRUE,
            ),
            'enquiry_message_pop_up' => array(
                'type' => 'TEXT',
                'null' => TRUE,
            ),
            'creation_time' => array(
                'type' => 'INT',
            ),
            'is_active' => array(
                'type' => 'TINYINT',
            ),
        );
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('enquiry_id', TRUE);
        $this->dbforge->create_table('enquiry_form');

    }

    public function down() {

        $this->dbforge->drop_table('enquiry_form',TRUE);
    }
}

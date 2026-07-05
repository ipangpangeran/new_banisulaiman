<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_base_table extends CI_Migration {

    public function up(){

        /*create add new emp roles table*/
        $fields = array(
            'function_id' => array(
                'type' => 'INT',
                'constraint' => '16',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'function_name' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE,
            ),
            'creation_time' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => TRUE,
            ),
            'created_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'update_time' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => TRUE,
            ),
            'updated_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'is_published' => array(
                'type' => 'TINYINT',
                'constraint' => '1',
                'null' => TRUE,
            ),
            'is_active' => array(
                'type' => 'TINYINT',
                'constraint' => '1',
                'null' => TRUE,
            ),
        );
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('function_id',TRUE);
        $this->dbforge->create_table('function',TRUE);

    }

    public function down(){

        $this->dbforge->drop_table('function',TRUE);

    }

}

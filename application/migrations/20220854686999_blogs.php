<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_blogs extends CI_Migration {

    public function up() {

        $fields = array(
            'category_id' => array(
                'type' => 'INT',
                'constraint' => '16',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'category_name' => array(
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
        $this->dbforge->add_key('category_id',TRUE);
        $this->dbforge->create_table('category',TRUE);

        /*Blog Table*/
        $fields = array(
            'blog_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'category_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'null' => TRUE,
            ),
            'blog_title' => array(
                'type' => 'VARCHAR',
                'constraint' => '256',
                'null' => TRUE,
            ),
            'blog_url' => array(
                'type' => 'VARCHAR',
                'constraint' => '512',
                'null' => TRUE,
            ),
            'blog_description' => array(
                'type' => 'LONGTEXT',
                'null' => TRUE,
            ),
            'seo_description' => array(
                'type' => 'TEXT',
                'AFTER'=>'blog_url'
            ),
            'blog_image' => array(
                'type' => 'VARCHAR',
                'constraint' => '256',
                'null' => TRUE,
            ),
            'comment_publish' => array(
                'type' => 'TINYINT',
                'null' => TRUE,
            ),
            'total_view' => array(
                'type' => 'int',
                'constraint' => '8',
                'null' => TRUE,
                'AFTER'=>'blog_image'
            ),
            'created_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'creation_time' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'updated_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'updation_time' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'is_active' => array(
                'type' => 'TINYINT',
                'null' => TRUE,
            ),

        );
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('blog_id',TRUE);
        $this->dbforge->create_table('blogs',TRUE);

        /*Blog History Table*/
        $fields = array(
            'blog_history_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'category_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'null' => TRUE,
            ),
            'blog_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'unsigned' => TRUE,
            ),
            'blog_title' => array(
                'type' => 'VARCHAR',
                'constraint' => '256',
                'null' => TRUE,
            ),
            'blog_url' => array(
                'type' => 'VARCHAR',
                'constraint' => '256',
                'null' => TRUE,
            ),
            'blog_description' => array(
                'type' => 'LONGTEXT',
                'null' => TRUE,
            ),
            'blog_image' => array(
                'type' => 'VARCHAR',
                'constraint' => '256',
                'null' => TRUE,
            ),
            'comment_publish' => array(
                'type' => 'TINYINT',
                'null' => TRUE,
            ),
            'created_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'creation_time' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'updated_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'updation_time' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'is_active' => array(
                'type' => 'TINYINT',
                'null' => TRUE,
            ),

        );
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('blog_history_id',TRUE);
        $this->dbforge->create_table('blog_history',TRUE);

        /*Blog Comment Table*/
        $fields = array(
            'blog_comment_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'blog_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'unsigned' => TRUE,
            ),
            'comment_name' => array(
                'type' => 'VARCHAR',
                'constraint' => '64',
                'null' => TRUE,
            ),
            'comment_email' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE,
            ),
            'comment_website' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE,
            ),
            'comment_description' => array(
                'type' => 'LONGTEXT',
                'null' => TRUE,
            ),
            'created_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'creation_time' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'updated_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'updation_time' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'is_active' => array(
                'type' => 'TINYINT',
                'null' => TRUE,
            ),

        );
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('blog_comment_id',TRUE);
        $this->dbforge->create_table('blog_comments',TRUE);

        /*Blog Comment Reply Table*/
        $fields = array(
            'blog_reply_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'blog_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'unsigned' => TRUE,
            ),
            'comment_id' => array(
                'type' => 'MEDIUMINT',
                'constraint' => '8',
                'unsigned' => TRUE,
            ),
            'reply_name' => array(
                'type' => 'VARCHAR',
                'constraint' => '64',
                'null' => TRUE,
            ),
            'reply_email' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE,
            ),
            'reply_website' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE,
            ),
            'reply_description' => array(
                'type' => 'LONGTEXT',
                'null' => TRUE,
            ),
            'created_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'creation_time' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'updated_by' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'updation_time' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'is_active' => array(
                'type' => 'TINYINT',
                'null' => TRUE,
            ),

        );
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('blog_reply_id',TRUE);
        $this->dbforge->create_table('blog_replys',TRUE);

    }

    public function down() {

        $this->dbforge->drop_table('category',TRUE);
        $this->dbforge->drop_table('blogs',TRUE);
        $this->dbforge->drop_table('blog_history',TRUE);
        $this->dbforge->drop_table('blog_comments',TRUE);
        $this->dbforge->drop_table('blog_replys',TRUE);
    }
}
<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Install_ion_auth extends CI_Migration {

    public function up()
    {
        // Drop table 'groups' if it exists
        $this->dbforge->drop_table('groups', TRUE);

        // Table structure for table 'groups'
        $this->dbforge->add_field(array(
            'id' => array(
                'type' => 'INT',
                'constraint' => '8',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'name' => array(
                'type' => 'VARCHAR',
                'constraint' => '20',
            ),
            'description' => array(
                'type' => 'VARCHAR',
                'constraint' => '100',
            )
        ));
        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('groups');

        // Dumping data for table 'groups'
        $data = array(
            array(
                'id' => '1',
                'name' => 'SUPER ADMIN',
                'description' => 'SUPER ADMIN'
            ),
            array(
                'id' => '2',
                'name' => 'SUB ADMIN',
                'description' => 'SUB ADMIN'
            ),
            array(
                'id' => '3',
                'name' => 'COMPANY ADMIN',
                'description' => 'COMPANY ADMIN'
            ),
            array(
                'id' => '4',
                'name' => 'MENTOR',
                'description' => 'MENTOR'
            ),
            array(
                'id' => '5',
                'name' => 'MENTEE',
                'description' => 'MENTEE'
            ),
        );
        $this->db->insert_batch('groups', $data);

        // Drop table 'users' if it exists
        $this->dbforge->drop_table('users', TRUE);

        // Table structure for table 'users'
        $this->dbforge->add_field(array(
            'id' => array(
                'type' => 'INT',
                'constraint' => '8',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'ip_address' => array(
                'type' => 'VARCHAR',
                'constraint' => '16'
            ),
            'username' => array(
                'type' => 'VARCHAR',
                'constraint' => '100',
            ),
            'password' => array(
                'type' => 'VARCHAR',
                'constraint' => '80',
            ),
            'salt' => array(
                'type' => 'VARCHAR',
                'constraint' => '40'
            ),
            'email' => array(
                'type' => 'VARCHAR',
                'constraint' => '100'
            ),
            'activation_code' => array(
                'type' => 'VARCHAR',
                'constraint' => '40',
                'null' => TRUE
            ),
            'last_otp' => array(
                'type' => 'VARCHAR',
                'constraint' => '40',
                'null' => TRUE
            ),
            'forgotten_password_code' => array(
                'type' => 'VARCHAR',
                'constraint' => '40',
                'null' => TRUE
            ),
            'forgotten_password_time' => array(
                'type' => 'INT',
                'constraint' => '11',
                'unsigned' => TRUE,
                'null' => TRUE
            ),
            'remember_code' => array(
                'type' => 'VARCHAR',
                'constraint' => '40',
                'null' => TRUE
            ),
            'created_on' => array(
                'type' => 'INT',
                'constraint' => '11',
                'unsigned' => TRUE,
            ),
            'last_login' => array(
                'type' => 'INT',
                'constraint' => '11',
                'unsigned' => TRUE,
                'null' => TRUE
            ),
            'active' => array(
                'type' => 'TINYINT',
                'constraint' => '1',
                'unsigned' => TRUE,
                'null' => TRUE
            ),
            'auth_token' => array(
                'type' => 'VARCHAR',
                'constraint' => 512,
            ),
            'first_name' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE
            ),
            'last_name' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE
            ),
            'phone' => array(
                'type' => 'VARCHAR',
                'constraint' => 64,
                'null' => TRUE
            ),
            'gender' => array(
                'type' => 'VARCHAR',
                'constraint' => 8,
                'null' => TRUE
            ),
            'dob' => array(
                'type' => 'VARCHAR',
                'constraint' => '16',
                'null' => TRUE,
            ),
            'account_verified' => array(
                'type' => 'INT',
                'default' => 0
            ),
            'personal_email' => array(
                'type' => 'VARCHAR',
                'constraint' => '64',
                'null' => TRUE,
            ),
            'doj' => array(
                'type' => 'VARCHAR',
                'constraint' => '16',
                'null' => TRUE,
            ),
            'user_profile' => array(
                'type' => 'TEXT',
                'null' => TRUE,
            ),
            'status' => array(
                'type' => 'VARCHAR',
                'constraint' => '16',
                'null' => TRUE,
            ),
            'emp_id' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE,
            ),
            'job_seeker_id' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE,
            ),
            'company_name' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE,
            ),
            'designation' => array(
                'type' => 'VARCHAR',
                'constraint' => '128',
                'null' => TRUE,
            ),
            'country_id' => array(
                'type' => 'VARCHAR',
                'constraint' => '16',
                'null' => TRUE,
            ),
            'state_id' => array(
                'type' => 'VARCHAR',
                'constraint' => '16',
                'null' => TRUE,
            ),
            'city_id' => array(
                'type' => 'VARCHAR',
                'constraint' => '16',
                'null' => TRUE,
            ),
            'zipcode' => array(
                'type' => 'VARCHAR',
                'constraint' => '16',
                'null' => TRUE,
            ),
            'location' => array(
                'type' => 'TEXT',
                'null' => TRUE,
            ),
            'address' => array(
                'type' => 'TEXT',
                'null' => TRUE,
            ),
            'is_profile_complete' => array(
                'type' => 'INT',
                'null' => TRUE,
            ),
            'profile_img' => array(
                'type' => 'TEXT',
                'null' => TRUE,
            ),
            'company_logo' => array(
                'type' => 'TEXT',
                'null' => TRUE,
            ),

        ));
        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('users');

        // Dumping data for table 'users'
        $data = array(
            array(
                'id' => '1',
                'ip_address' => '127.0.0.1',
                'username' => 'superadmin',
                'password' => '$2a$07$SeBknntpZror9uyftVopmu61qg0ms8Qv1yV6FG.kQOSM.9QhmTo36',
                'salt' => '',
                'email' => 'admin@sln.com',
                'activation_code' => '',
                'forgotten_password_code' => NULL,
                'created_on' => time(),
                'last_login' => time(),
                'active' => '1',
                'auth_token' => 'bf1d387bd6c98ffd8df97bcbf53ff0e7',
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'account_verified' =>1
            ),
            array(
                'id' => '2',
                'ip_address' => '127.0.0.1',
                'username' => 'companyadmin@sln.com',
                'password' => '$2a$07$SeBknntpZror9uyftVopmu61qg0ms8Qv1yV6FG.kQOSM.9QhmTo36',
                'salt' => '',
                'email' => 'companyadmin@sln.com',
                'activation_code' => '',
                'forgotten_password_code' => NULL,
                'created_on' => time(),
                'last_login' => time(),
                'active' => '1',
                'auth_token' => 'bf1d387bd6c98ffd8df97bcbf53ff0e7',
                'first_name' => 'Company',
                'last_name' => 'Admin',
                'account_verified' =>1
            ),
            array(
                'id' => '3',
                'ip_address' => '127.0.0.1',
                'username' => 'mentor@sln.com',
                'password' => '$2a$07$SeBknntpZror9uyftVopmu61qg0ms8Qv1yV6FG.kQOSM.9QhmTo36',
                'salt' => '',
                'email' => 'mentor@sln.com',
                'activation_code' => '',
                'forgotten_password_code' => NULL,
                'created_on' => time(),
                'last_login' => time(),
                'active' => '1',
                'auth_token' => 'bf1d387bd6c98ffd8df97bcbf53ff0e7',
                'first_name' => 'Mentor',
                'last_name' => 'Mentor',
                'account_verified' =>1
            ),
            array(
                'id' => '4',
                'ip_address' => '127.0.0.1',
                'username' => 'mentee@sln.com',
                'password' => '$2a$07$SeBknntpZror9uyftVopmu61qg0ms8Qv1yV6FG.kQOSM.9QhmTo36',
                'salt' => '',
                'email' => 'mentee@sln.com',
                'activation_code' => '',
                'forgotten_password_code' => NULL,
                'created_on' => time(),
                'last_login' => time(),
                'active' => '1',
                'auth_token' => 'bf1d387bd6c98ffd8df97bcbf53ff0e7',
                'first_name' => 'Mentee',
                'last_name' => 'Mentee',
                'account_verified' =>1
            )
        );
        $this->db->insert_batch('users', $data);

        // Drop table 'users_groups' if it exists
        $this->dbforge->drop_table('users_groups', TRUE);

        // Table structure for table 'users_groups'
        $this->dbforge->add_field(array(
            'id' => array(
                'type' => 'INT',
                'constraint' => '8',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'user_id' => array(
                'type' => 'INT',
                'constraint' => '8',
                'unsigned' => TRUE
            ),
            'group_id' => array(
                'type' => 'INT',
                'constraint' => '8',
                'unsigned' => TRUE
            )
        ));
        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('users_groups');

        // Dumping data for table 'users_groups'
        $data = array(
            array(
                'id' => '1',
                'user_id' => '1',
                'group_id' => '1',
            ),
            array(
                'id' => '2',
                'user_id' => '2',
                'group_id' => '3',
            ),
            array(
                'id' => '3',
                'user_id' => '3',
                'group_id' => '4',
            ),
            array(
                'id' => '4',
                'user_id' => '4',
                'group_id' => '5',
            )
        );
        $this->db->insert_batch('users_groups', $data);


        // Drop table 'login_attempts' if it exists
        $this->dbforge->drop_table('login_attempts', TRUE);
        // Table structure for table 'login_attempts'
        $this->dbforge->add_field(array(
            'id' => array(
                'type' => 'INT',
                'constraint' => '8',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'ip_address' => array(
                'type' => 'VARCHAR',
                'constraint' => '16'
            ),
            'login' => array(
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => TRUE
            ),
            'time' => array(
                'type' => 'INT',
                'constraint' => '11',
                'unsigned' => TRUE,
                'null' => TRUE
            )
        ));
        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('login_attempts');

    }

    public function down()
    {
        $this->dbforge->drop_table('users', TRUE);
        $this->dbforge->drop_table('groups', TRUE);
        $this->dbforge->drop_table('users_groups', TRUE);
        $this->dbforge->drop_table('login_attempts', TRUE);
    }
}

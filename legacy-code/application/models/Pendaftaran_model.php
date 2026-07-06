<?php
class Pendaftaran_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
    }

    public function insert_pendaftaran($data) {
        return $this->db->insert('pendaftaran', $data);
    }
}
?>

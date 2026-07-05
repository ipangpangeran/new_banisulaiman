<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {

    public function index() {
        // 1. Cek apakah env terbaca oleh PHP
        echo "<h3>Hasil Pengecekan .env:</h3>";
        echo "DB Host: " . getenv('DB_HOSTNAME') . "<br>";
        echo "DB User: " . getenv('DB_USERNAME') . "<br>";
        
        // 2. Cek apakah database berhasil terkoneksi menggunakan kredensial tersebut
        echo "<h3>Koneksi Database:</h3>";
        if ($this->load->database()) {
            echo "✅ Sukses! CodeIgniter berhasil terhubung ke database.";
        } else {
            echo "❌ Gagal terhubung ke database.";
        }
    }
}
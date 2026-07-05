<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Pendaftaran extends CI_Controller {
    
    public function __construct() {
        parent::__construct();
        $this->load->model('Pendaftaran_model');
        $this->load->helper(array('form', 'url', 'common')); // Load helper common untuk fungsi upload_file
        $this->load->library('form_validation');
        $this->load->library('upload');        
    }

    public function index() {
        $this->session->keep_flashdata('success');
        $this->session->keep_flashdata('error');
        $this->load->view('website/pendaftaran_form');
    }

    public function submit() {
        $this->form_validation->set_rules('nama', 'Nama Lengkap', 'required|trim');
        $this->form_validation->set_rules('tempat_tanggal_lahir', 'Tempat, Tanggal Lahir', 'required|trim');
        $this->form_validation->set_rules('usia', 'Usia', 'required|integer');
        $this->form_validation->set_rules('alamat_lengkap', 'Alamat Lengkap', 'required|trim');
        $this->form_validation->set_rules('alamat_domisili', 'Alamat Domisili', 'required|trim');
        $this->form_validation->set_rules('status_perkawinan', 'Status Perkawinan', 'required');
        $this->form_validation->set_rules('program', 'Program', 'required');
        $this->form_validation->set_rules('aktivitas', 'Aktivitas', 'required');
        $this->form_validation->set_rules('no_hp', 'No HP / WA', 'required|trim');
        $this->form_validation->set_rules('pendidikan_terakhir', 'Pendidikan Terakhir', 'required');
        $this->form_validation->set_rules('tahun_kelulusan', 'Tahun Kelulusan', 'required|numeric');
        $this->form_validation->set_rules('jumlah_hafalan', 'Jumlah Hafalan', 'required|numeric');
        $this->form_validation->set_rules('nama_ayah', 'Nama Ayah', 'required|trim');
        $this->form_validation->set_rules('pekerjaan_ayah', 'Pekerjaan Ayah', 'required|trim');
        $this->form_validation->set_rules('nama_ibu', 'Nama Ibu', 'required|trim');
        $this->form_validation->set_rules('pekerjaan_ibu', 'Pekerjaan Ibu', 'required|trim');
        $this->form_validation->set_rules('alasan', 'Alasan Masuk Ma\'had', 'required|trim');

        if ($this->form_validation->run() == FALSE) {
            $this->session->set_flashdata('error', 'Harap isi semua bidang yang wajib!');
            redirect('registrasi');
        } else {
            $data = [
                'nama' => $this->input->post('nama'),
                'tempat_tanggal_lahir' => $this->input->post('tempat_tanggal_lahir'),
                'usia' => $this->input->post('usia'),
                'alamat_lengkap' => $this->input->post('alamat_lengkap'),
                'alamat_domisili' => $this->input->post('alamat_domisili'),
                'status_perkawinan' => $this->input->post('status_perkawinan'),
                'program' => $this->input->post('program'),
                'aktivitas' => $this->input->post('aktivitas') === 'Other' ? $this->input->post('aktivitas_other') : $this->input->post('aktivitas'),
                'no_hp' => $this->input->post('no_hp'),
                'email' => $this->input->post('email'),
                'pendidikan_terakhir' => $this->input->post('pendidikan_terakhir') === 'Other' ? $this->input->post('pendidikan_other') : $this->input->post('pendidikan_terakhir'),
                'tahun_kelulusan' => $this->input->post('tahun_kelulusan'),
                'jumlah_hafalan' => $this->input->post('jumlah_hafalan'),
                'nama_ayah' => $this->input->post('nama_ayah'),
                'pekerjaan_ayah' => $this->input->post('pekerjaan_ayah'),
                'nama_ibu' => $this->input->post('nama_ibu'),
                'pekerjaan_ibu' => $this->input->post('pekerjaan_ibu'),
                'alasan' => $this->input->post('alasan'),
                'surat_izin_ortu' => $this->input->post('surat_izin_ortu'),
                'surat_kesiapan' => $this->input->post('surat_kesiapan'),
                'created_at' => date('Y-m-d H:i:s')
            ];

            // Ambil nama user dari input form
            $user_name = $this->input->post('nama');

            // Upload file dan simpan nama file ke database
            $data['surat_izin_ortu'] = upload_file('surat_izin_ortu', 'surat_izin_ortu', $user_name);
            $data['surat_kesiapan'] = upload_file('surat_kesiapan', 'surat_kesiapan', $user_name);

            if ($this->Pendaftaran_model->insert_pendaftaran($data)) {
                $this->session->set_flashdata('success', 'Pendaftaran berhasil!');
            } else {
                $this->session->set_flashdata('error', 'Pendaftaran gagal, coba lagi.');
            }

            redirect('registrasi');
        }
    }
}
?>

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller
{

    public $user_id;
    public $role_id;

    function __construct()
    {
        parent::__construct();
        date_default_timezone_set('Asia/Jakarta');

        $this->user_id = $this->session->userdata('user_id');
        $this->role_id = $this->session->userdata('user_role_id');
    }

    function __destruct()
    {
    }

    public function check_email() {
        send_email('ilman.pangeran26@gmail.com','hi','hi');
    }

    public function index(){

        $data['title'] = '<title>Ma\'had Bani Sulaiman</title>';
        $this->load->view('website/web_header',$data);
        $this->load->view('website/home');
        $this->load->view('website/web_footer');
    }

    /*View All Sub Categories Search for Home*/
 
  
 	/*Robot Page*/
	public function robot()
	{
		$this->load->view('website/robot');
	}

	/*Sitemap Page*/
	public function sitemap()
	{
		$this->load->view('website/sitemap');
	}

    public function  contact_us()  
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Contact Us</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/contact_us');
        $this->load->view('website/web_footer');
    }
   
    public function submit_contact_us(){

        // Check validation for user input
        $this->form_validation->set_error_delimiters('<div class="error" style="color: red">', '</div>');
        $this->form_validation->set_rules('contact_fname', 'Name', 'required|min_length[3]|max_length[30]|xss_clean');
        $this->form_validation->set_rules('contact_email', 'Email', 'trim|min_length[10]|max_length[64]|xss_clean');
        $this->form_validation->set_rules('contact_phone', 'Phone', 'required|min_length[10]|max_length[16]|xss_clean');

        if ($this->form_validation->run() == FALSE) {

            $errors = validation_errors();
            $data = array(
                'status' => 401,
                'data' => $errors
            );
            echo json_encode($data);


        }else {

            $contact_fname = $this->input->post('contact_fname');
            $contact_email = $this->input->post('contact_email');
            $contact_phone = $this->input->post('contact_phone');
            $contact_message = $this->input->post('contact_message');
            $lead_url = $this->input->post('lead_url');
            $ip_address         = $this->input->ip_address();

            $add_detail = array(
                'enquiry_name_pop_up' => $contact_fname,
                'enquiry_phone_pop_up' => $contact_phone,
                'enquiry_email_pop_up' => $contact_email,
                'enquiry_message_pop_up' => $contact_message,
                'creation_time' => time(),
                'is_active' => ACTIVATE,
            );
            $this->Generic_model->addGenericData('enquiry_form', $add_detail);

            rest_client($contact_fname,$contact_email,$contact_phone,'',$contact_message,$lead_url,$ip_address);

            /*send email to admin*/
            $email_data =  array(
                'name' => $contact_fname,
                'email' => $contact_email,
                'phone' => $contact_phone,
                'message' => $contact_message,
                'ip_address' => $ip_address,
                'lead_url' => $lead_url,

            );

            $message = $this->load->view('email_templates/contact_us', $email_data, true);
            /*send Notify email*/
            $urls = base_url(). 'Ashynch_task/send_email';
            $param1 = array(
                'send_to' => ADMIN_EMAILS,
                'message' => $message,
                'subject' => 'Ma\'had Bani Sulaiman | Contact Us'. " | ".date('d-m-y H:i A',time())
            );
            $this->asynch_task->do_in_background($urls, $param1);

            /*send email to who submit*/
            $message = $this->load->view('email_templates/contact_us_confirm', $email_data, true);
            /*send Notify email*/
            $urls = base_url(). 'Ashynch_task/send_email';
            $param1 = array(
                'send_to' => $contact_email,
                'message' => $message,
                'subject' => 'Ma\'had Bani Sulaiman Feedback'. " | " .date('d-m-y H:i A',time()),
            );
            $this->asynch_task->do_in_background($urls, $param1);

            $data = array(
                'status' => 200,
                'data' => "Thanks For Contacting Us! We Will Be In Touch With You Shortly."
            );


        }
        echo json_encode($data);
    }

    public function  thankyou()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Thanks</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/thankyou');
        $this->load->view('website/web_footer');
    }

    public function program_pendidikan()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Program Pendidikan</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/program_pendidikan');
        $this->load->view('website/web_footer');
    }
    
    public function informasi()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Informasi</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/informasi');
        $this->load->view('website/web_footer');
    }
    
    public function fasilitas()
        { 
            $data['title'] = '<title>Ma\'had Bani Sulaiman | Fasilitas</title>';
            $this->load->view('website/web_header', $data);
            $this->load->view('website/fasilitas');
            $this->load->view('website/web_footer');
        }

    public function kegiatan()
        { 
            $data['title'] = '<title>Ma\'had Bani Sulaiman | Kegiatan</title>';
            $this->load->view('website/web_header', $data);
            $this->load->view('website/kegiatan');
            $this->load->view('website/web_footer');
        }
  
    public function  pendaftaran()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Pendaftaran</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/pendaftaran');
        $this->load->view('website/web_footer');
    }

    public function  registrasi()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Registrasi</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/pendaftaran_form');
        $this->load->view('website/web_footer');
    }

    public function pendaftaran_submit() {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Hasil Pendaftaran</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/hasil_pendaftaran');
        $this->load->view('website/web_footer');
    }
    
    public function hasil_pendaftaran() {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Hasil Pendaftaran</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/hasil_pendaftaran');
        $this->load->view('website/web_footer');
    }
    
    public function gagal_pendaftaran() {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Pendaftaran Gagal</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/gagal_pendaftaran');
        $this->load->view('website/web_footer');
    }
    
    public function invalid_pendaftaran() {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Validasi Pendaftaran Gagal</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/invalid_pendaftaran');
        $this->load->view('website/web_footer');
    }

    public function  berita()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Berita dan Artikel</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/berita');
        $this->load->view('website/web_footer');
    }

    public function  galeri()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Galeri</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/galeri');
        $this->load->view('website/web_footer');
    }

    public function  donasi()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Donasi</title>';
        $this->load->view('website/web_header', $data);
        $this->load->view('website/donasi');
        $this->load->view('website/web_footer');
    }

    public function kegiatan_harian()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Kegiatan Harian</title>';
        $this->load->view('website/web_header');
        $this->load->view('website/kegiatan_harian');
        $this->load->view('website/web_footer');
    }

    public function kegiatan_mingguan()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Kegiatan Mingguan</title>';
        $this->load->view('website/web_header');
        $this->load->view('website/kegiatan_mingguan');
        $this->load->view('website/web_footer');
    }

    public function kegiatan_tahunan()
    {
        $data['title'] = '<title>Ma\'had Bani Sulaiman | Kegiatan Tahunan</title>';
        $this->load->view('website/web_header');
        $this->load->view('website/kegiatan_tahunan');
        $this->load->view('website/web_footer');
    }

    public function political_services()
    { 
        $this->load->view('website/web_header');
        $this->load->view('website/political_services');
        $this->load->view('website/web_footer');
    }

    public function government_services()
    { 
        $this->load->view('website/web_header');
        $this->load->view('website/government_services');
        $this->load->view('website/web_footer');
    }

    public function digital_government_service()
    { 
        $this->load->view('website/web_header');
        $this->load->view('website/digital_government_service');
        $this->load->view('website/web_footer');
    }
    
    /*check if any users want to do wrong with any wrong url or null url*/
    public function redirector($url = NULL)
    {
        if ($url == NULL) {
            $referrer = $this->agent->referrer();
        } else {
            $referrer = base_url() . $url;
        }
        redirect($referrer, 'refresh');
    }


     /*=================BLOGS IN WEBSITE================*/

    /*blogs*/
    public function blogs(){

        $blogList= $this->Common_model->getAllBlogList($searchData=null,$searchStatus = null,$category_id = null,$date_range = null,$limit=4,$offset=null);
        $this->session->unset_userdata('checkAdded');
        $datap['blogList'] = $blogList;

        $category=$this->Generic_model->getGenericData('category',array('is_active'=>ACTIVATE));
        $datap['category'] = $category;

        $data['title'] = '<title>Ma\'had Bani Sulaiman</title>';
        $data['metatags'] = '<meta name="description" content="" />
                                <meta property="og:title" content="">
                                <meta property="og:description" content="">
                                <meta property="og:type" content="website">
								<meta property="og:url" content="'.base_url().'blogs">
                                <meta property="og:image" content="'.IMAGE_PATH.'logo.png" />
                                <meta name="twitter:card" content="summary_large_image" />
                                <meta name="twitter:description" content="" />
                                <meta name="twitter:title" content="Ma\'had Bani Sulaiman" />
                                <meta name="twitter:site" content="@banisulaiman" />
                                <meta name="twitter:image" content="'.IMAGE_PATH.'logo.png" />
                                <link rel="canonical" href="'.base_url().'blogs" />';
        $this->load->view('website/web_header',$data);
        $this->load->view('website/blogs',$datap);
        $this->load->view('website/web_footer');
    }

    /*post*/
    public function post($blogUrl=null){
        $checkAdded=$this->session->userdata('checkAdded');
        //  $blog_id = base64_decode($blogId);
        $getBlog = $this->Generic_model->getGenericData('blogs', array('blog_url'=>$blogUrl,'is_active' => ACTIVATE));
        if ($getBlog) {

            if($checkAdded!=1) {
                //$blog_id=base64_decode($blogId);


                $total_view = $getBlog[0]->total_view;
                if ($total_view > 0) {
                    $total_views = $total_view + 1;
                } else {
                    $total_views = 1;
                }
                $this->Generic_model->updateGenericData('blogs', array('blog_url' => $blogUrl), array('total_view' => $total_views));
                $this->session->set_userdata('checkAdded', 1);
            }
            $blogList= $this->Generic_model->joinGenericData('blogs','created_by',$attr=null,'users','id',array('blog_url'=>$blogUrl,'is_active' => ACTIVATE));

            $datap['blogList'] = $blogList;
            $blog_id=$blogList[0]->blog_id;
            $datap['blog_id'] = $blog_id;
            $data['title'] = '<title>'.$blogList[0]->blog_title.'</title>';
            /*show data in header*/


            $data['metatags'] = '<meta name="description" content="'.$blogList[0]->seo_description.'" />
                            <meta name="keywords" content="'.$blogList[0]->blog_title.'" />
                            <meta property="og:title" content="'.$blogList[0]->blog_title.'">
                            <meta property="og:description" content="'.$blogList[0]->seo_description.'">
                            <meta property="og:type" content="website">
                            <meta property="og:url" content="'.base_url().'post/'.$blogList[0]->blog_url.'">
                            <meta property="og:image" content="'.base_url().$blogList[0]->blog_image.'" />
                            <meta name="twitter:image" content="'.base_url().$blogList[0]->blog_image.'" />
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:description" content="'.$blogList[0]->seo_description.'" />
                            <meta name="twitter:title" content="'.$blogList[0]->blog_title.'" />
                            <link rel="canonical" href="'.base_url().'post/'.$blogList[0]->blog_url.'" />';

            $blog_list = $this->Common_model->get_recent_blogs($getBlog[0]->blog_id,$limit=4,$offset=null);
            $datap['blog_list'] = $blog_list;

            $this->load->view('website/web_header',$data);
            $this->load->view('website/post', $datap);
            $this->load->view('website/web_footer');
        } else {
            redirect('');
        }

    }

    /*blog Ajax List*/
    public function blogAjaxList(){
        $searchData = $this->input->post('searchData');
        $searchStatus = $this->input->post('searchStatus');
        $category_id = $this->input->post('category_id');
        $date_range = $this->input->post('date_range');
        $limit = $this->input->post('limit');

        $total_count = $this->Common_model->getAllBlogCount($searchData,$searchStatus,$category_id,$date_range);
        $config = array();
        $config["base_url"] = "#";
        $config["total_rows"] = $total_count;
        $config["per_page"] = $limit;
        $config["uri_segment"] = 3;
        $config["use_page_numbers"] = TRUE;
        $config['full_tag_open'] = '<div class="pagging text-center"><nav><ul class="pagination">';
        $config['full_tag_close'] = '</ul></nav></div>';
        $config['num_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['num_tag_close'] = '</span></li>';
        $config['cur_tag_open'] = '<li class="page-item active"><span class="page-link">';
        $config['cur_tag_close'] = '<span class="sr-only">(current)</span></span></li>';
        $config['next_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['next_tag_close'] = '<span aria-hidden="true"></span></span></li>';
        $config['prev_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['prev_tag_close'] = '</span></li>';
        $config['first_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['first_tag_close'] = '</span></li>';
        $config['last_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['last_tag_close'] = '</span></li>';

        $this->pagination->initialize($config);

        $pages = $this->uri->segment(3);
        if ($pages) {
            $page = $pages;
        } else {
            $page = 1;
        }
        $offset = ($page - 1) * $config["per_page"];

        $blogList = $this->Common_model->getAllBlogList($searchData,$searchStatus,$category_id,$date_range, $limit, $offset);
        $html = '';
        $count = 0;
        if ($blogList) {
            foreach ($blogList as $blogLists) {
                $blogFile =$blogLists->blog_image;
                if ($blogFile) {
                    $blogFile = $blogLists->blog_image;
                } else {
                    $blogFile = IMAGE_PATH . 'no_blogs.jpg';
                }


                if (strlen($blogLists->blog_title) > 105) {
                    $subTitle = substr($blogLists->blog_title, 0, 105) . '...';
                } else {
                    $subTitle = $blogLists->blog_title;
                }

                if (strlen($blogLists->blog_description) > 180) {
                    $subDescription = substr(strip_tags($blogLists->blog_description), 0, 180) . '...';
                } else {
                    $subDescription = $blogLists->blog_description;
                }
                $blog_url=$blogLists->blog_url;


                $html .= '<div class="col-md-4 px-2 py-3">';
                $html .= '<div class="card all-blog-cards">';
                $html .= ' <a  href="'.base_url().'post/'.$blog_url.'"><img class="blog_sec_img img-fluid" src="'.$blogFile.'" alt="'.$subTitle.'"></a>';
                $html .= '<div class="card-body all-card-box p-2">';
                if ($blogLists->category_id) {
                    $html .= '<div class="category blogs">';
                    $html .= '<a href="'.base_url().'post/'.$blog_url.'" style="font-size:14px"> '.$blogLists->category_name.'</a>';
                    $html .= '<p class="date meta-last">' . date('d-m-Y', $blogLists->creation_time) . '</p>';
                    $html .= '</div>';
                } else {
                    $html .= ' <div class="category blogs">';
                    $html .= '<a href="#">Uncategorised</a>';
                    $html .= '</div>';
                }
                $html .= '<div class="card-title blog_title mb-0" style="height: 130px">';
                $html .= '<a href="'.base_url().'post/'.$blog_url.'">';
                $html .= '<h3 class="blog-titles mb-0 font-weight-bold" style="color: #000000;text-align: justify; height:60px"> ' . $subTitle . '</h3>';
                $html .= '</a>';
                $html .='<p class="mb-0" style="font-size: 16px;text-align: justify">'. $subDescription .'</p>';
                $html .= '</div>';
                $html .= '<div class="row sharelinks-blogs">';
                $html .= '<div class="col-12" style="text-align: right">';
                $html .='<a href="https://www.facebook.com/sharer/sharer.php?u='.base_url().'post/'.$blog_url.'" target="_blank"><img src="'.IMAGE_PATH.'facebook_blog.svg" alt="" class="blog_social_media_icons pr-2 w-75"></a>';
                $html .='<a href="http://www.twitter.com/intent/tweet?url='.base_url().'post/'.$blog_url.'&text='.$subTitle.'" target="_blank"><img src="'.IMAGE_PATH.'twitter_blog.svg" alt="" class="blog_social_media_icons pr-2 w-75"></a>';
                $html .='<a href="https://www.linkedin.com/shareArticle?mini=true&url='.base_url().'post/'.$blog_url.'&title='.$subTitle.'&source=SushantTravels" target="_blank"><img src="'.IMAGE_PATH.'linkedin.svg" style="width: 30px;" alt="" class="blog_social_media_icons pr-2 w-75"></a>';
                $html .= '</div>';
                $html .= '</div>';
                $html .= '</div>';
                $html .= '</div>';
                $html .= '</div>';

            }

            $pagination = $this->pagination->create_links();
            $status = 200;
        } else {
            $status = 201;
            $pagination = '';
            $html = '<tr><td colspan="10">No Blog found</td></tr>';
        }

        $view_more = '';
        if ($total_count >= 9) {
            $view_more = '<button type="button" class="btn btn-lightblue btn-readmore mt-4" onclick="read_more_blog();">
                        Read More
                    </button>';
        }

        $data = array(
            'status' => $status,
            'data' => $html,
            'pagination' => $pagination,
            'view_more' => $view_more
        );
        echo json_encode($data);
    }

    public function blogAjaxListSearch(){
        $searchData = $this->input->post('searchData');
        $searchStatus = $this->input->post('searchStatus');
        $category_id = $this->input->post('category_id');
        $date_range = $this->input->post('date_range');

        $blogList = $this->Common_model->getAllBlogListSearch($searchData,$searchStatus,$category_id,$date_range);
        $html = '';
        $count = 0;
        if ($blogList) {
            foreach ($blogList as $blogLists) {
                $blogFile =$blogLists->blog_image;
                if ($blogFile) {
                    $blogFile = $blogLists->blog_image;
                } else {
                    $blogFile = IMAGE_PATH . 'noImage.png';
                }


                if (strlen($blogLists->blog_title) > 105) {
                    $subTitle = substr($blogLists->blog_title, 0, 105) . '...';
                } else {
                    $subTitle = $blogLists->blog_title;
                }

                if (strlen($blogLists->blog_description) > 180) {
                    $subDescription = substr(strip_tags($blogLists->blog_description), 0, 180) . '...';
                } else {
                    $subDescription = $blogLists->blog_description;
                }
                $blog_url=$blogLists->blog_url;

                $html .= '<div class="col-md-6 col-lg-4 mb-4 px-2" style="height: 525px; border-radius: 14px;">
                     <div class="card latest__blog_card">
                          <a href="'.base_url().'post/'.$blog_url.'">
                               <img src="'.$blogFile.'" class="w-100 card-image-top" alt="blog">
                          </a>
                         <div class="card-body p-2">
                             <div class="blog-category">
                                <a href="'.base_url().'post/'.$blog_url.'" style="font-size: 13px;">'.$blogLists->category_name.'</a>
                                <p>'.date('d', $blogLists->creation_time).' '.date('M', $blogLists->creation_time).', '.date('Y', $blogLists->creation_time).'</p>
                             </div> 
                              <div class="card_title" style="height: 130px;">
                              <a href="'.base_url().'post/'.$blog_url.'">
                                  <h3 style="height:60px" class="blog-titles">
                                    '.$subTitle.'
                                </h3>
                              </a>
                              <p style="font-size: 14px; text-align: justify;">'.$subDescription.'</p>
                            </div>
                         </div>
                          <div class="blog_footer d-flex justify-content-between align-items-end mb-1">
                                <a href="https://www.facebook.com/clairvoyancetech1" class="ml-2">
                                  <img src="'.IMAGE_PATH.'facebook_blog.svg" class="" alt="blog" style="width: 75%;">
                              </a>
                              <a href="https://twitter.com/Clairvoyancetec" class="ml-2">
                                  <img src="'.IMAGE_PATH.'twitter_blog.svg" class="" alt="blog" style="width: 75%;">
                              </a>
                              <a href="https://www.linkedin.com/company/clairvoyance-tech" class="ml-2">
                                  <img src="'.IMAGE_PATH.'linkedin_png.png" class="" alt="blog" style="width: 75%;">
                              </a>
                              
                          </div>
                     </div>
                 </div>';
            }

            $pagination = $this->pagination->create_links();
            $status = 200;
        } else {
            $status = 201;
            $pagination = '';
            $html = '<tr><td colspan="10">No Blog found</td></tr>';
        }
        $data = array(
            'status' => $status,
            'data' => $html,
            'pagination' => $pagination
        );
        echo json_encode($data);
    }

    public function latest_blogs(){

        $blogList = $this->Common_model->get_home_blogs();
        $html = '';
        $count = 0;
        if ($blogList) {
            foreach ($blogList as $blogLists) {
                $blogFile =$blogLists->blog_image;
                if ($blogFile) {
                    $blogFile = $blogLists->blog_image;
                } else {
                    $blogFile = IMAGE_PATH . 'noImage.png';
                }


                if (strlen($blogLists->blog_title) > 105) {
                    $subTitle = substr($blogLists->blog_title, 0, 105) . '...';
                } else {
                    $subTitle = $blogLists->blog_title;
                }

                if (strlen($blogLists->blog_description) > 180) {
                    $subDescription = substr(strip_tags($blogLists->blog_description), 0, 180) . '...';
                } else {
                    $subDescription = $blogLists->blog_description;
                }
                $blog_url=$blogLists->blog_url;

                $html .= '<div class="col-md-6 col-lg-4 mb-4 px-2">
                     <div class="card latest__blog_card" style="height: 480px; border-radius: 14px;">
                           <a href="'.base_url().'post/'.$blog_url.'">
                               <img src="'.$blogFile.'" class="w-100 card-image-top" alt="blog" style="border-top-left-radius: 14px; border-top-right-radius: 14px;">
                           </a>
                           <div class="card-body p-2">
                             <div class="blog-category">
                                <a href="'.base_url().'post/'.$blog_url.'" style="font-size: 13px;">'.$blogLists->category_name.'</a>
                                <p>'.date('d', $blogLists->creation_time).' '.date('M', $blogLists->creation_time).', '.date('Y', $blogLists->creation_time).'</p>
                             </div> 
                              <div class="card_title" style="height: 130px;">
                              <a href="'.base_url().'post/'.$blog_url.'">
                                  <h3 style="height:60px" class="blog-titles">
                                    '.$subTitle.'
                                </h3>
                              </a>
                              <p style="font-size: 14px; text-align: justify;">'.$subDescription.'</p>
                            </div>
                         </div>
                          <div class="blog_footer d-flex justify-content-between align-items-end mb-1">
                                <a href="https://www.facebook.com/clairvoyancetech1" class="ml-2">
                                  <img src="'.IMAGE_PATH.'facebook_blog.svg" class="" alt="blog" style="width: 75%;">
                              </a>
                              <a href="https://twitter.com/Clairvoyancetec" class="ml-2">
                                  <img src="'.IMAGE_PATH.'twitter_blog.svg" class="" alt="blog" style="width: 75%;">
                              </a>
                              <a href="https://www.linkedin.com/company/clairvoyance-tech" class="ml-2">
                                  <img src="'.IMAGE_PATH.'linkedin_png.png" class="" alt="blog" style="width: 75%;">
                              </a>
                              
                          </div>
                     </div>
                 </div>';
            }

            $status = 200;
        } else {
            $status = 201;
            $html = '<tr><td colspan="10">No Blog found</td></tr>';
        }
        $data = array(
            'status' => $status,
            'data' => $html,
        );
        echo json_encode($data);
    }

    /*=================END BLOGS IN WEBSITE================*/

}

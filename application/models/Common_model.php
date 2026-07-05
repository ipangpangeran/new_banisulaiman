<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Common_model extends CI_Model
{

    /** Constructor **/
    function __construct()
    {
        parent::__construct();
    }

     /* User Profile */
    function get_profile($user_id){
        $this->db->select('u.account_verified,u.phone as user_phone,u.email as user_email,u.first_name as first_name,u.last_name as last_name,gp.name as group_name,u.id as user_id,u.auth_token,ug.group_id as role_id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id');
        $this->db->join('groups gp', 'gp.id = ug.group_id');
        $this->db->where('u.id',$user_id);
        $this->db->where('u.active',ACTIVATE);
        $data = $this->db->get()->row();
        return $data;
    }

    function emp_detail($user_id){
        $this->db->select('cu.emp_job_title_id,cu.emp_grade_id,u.employee_id,er.role_name,ol.location_name,d.department_name,c.current_cycle_id AS current_cycle_id,c.company_id AS company_id,c.comp_color AS comp_color,c.comp_name AS comp_name,c.comp_logo AS comp_logo,u.account_verified,u.phone as user_phone,u.email as user_email,u.first_name as first_name,u.last_name as last_name,u.user_profile,gp.name as group_name,u.id as user_id,ug.group_id  as role_id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id');
        $this->db->join('company_users cu', 'cu.user_id = u.id');
        $this->db->join('company c', 'c.company_id = cu.company_id');
        $this->db->join('groups gp', 'gp.id = ug.group_id');
        $this->db->join('department d', 'd.department_id = u.department_id','left');
        $this->db->join('emp_roles er', 'er.emp_roles_id = u.emp_roles_id','left');
        $this->db->join('office_location ol', 'ol.office_location_id = u.office_location_id','left');
        $this->db->where('u.id',$user_id);
        $this->db->where('cu.is_active',ACTIVATE);
        $data = $this->db->get()->result();
        return $data;
    }

    function get_profile_email($email){
        $this->db->select('*,u.id AS id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id','left');
        $this->db->join('groups gp', 'gp.id = ug.group_id');
        $this->db->where('u.email',$email);
        $data = $this->db->get()->result();
        return $data;
    }

    function get_profile_emp_id($emp_id){
        $this->db->select('*,u.id AS id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id','left');
        $this->db->join('groups gp', 'gp.id = ug.group_id');
        $this->db->where('u.employee_id',$emp_id);
        $data = $this->db->get()->result();
        return $data;
    }

    function get_employee($user_id){
        $this->db->select('*,u.id AS user_id,u.account_verified');
        $this->db->from('users u');
        $this->db->where('u.id',$user_id);
        $data = $this->db->get()->row();
        return $data;
    }

    function total_employers(){
        $this->db->select('u.id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id');
        $this->db->where('ug.group_id', EMPLOYER);
        $this->db->where('u.active',ACTIVATE);
        return $this->db->get()->num_rows();
    }

    function total_job_seeker(){
        $this->db->select('u.id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id');
        $this->db->where('ug.group_id', JOB_SEEKER);
        $this->db->where('u.active',ACTIVATE);
        return $this->db->get()->num_rows();
    }

    function total_job(){
        $this->db->select('j.job_id');
        $this->db->from('job j');
        $this->db->where('j.is_active',ACTIVATE);
        return $this->db->get()->num_rows();
    }

    function total_job_application(){
        $this->db->select('ja.job_applied_id');
        $this->db->from('job_applied ja');
        $this->db->where('ja.job_applied_id',ACTIVATE);
        return $this->db->get()->num_rows();
    }

    function all_emp_date_count($date){

        $this->db->select('u.id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id');
        $this->db->where('ug.group_id', EMPLOYER);
        $this->db->where('u.active',ACTIVATE);

        $from=strtotime(date('d-m-Y 00:00:00',strtotime($date)));
        $this->db->where('u.created_on >=',$from);

        $to=strtotime(date('d-m-Y 23:59:59',strtotime($date)));
        $this->db->where('u.created_on <=',$to);

        return $this->db->get()->num_rows();
    }

    function all_job_seeker_date_count($date){

        $this->db->select('u.id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id');
        $this->db->where('ug.group_id', JOB_SEEKER);
        $this->db->where('u.active',ACTIVATE);

        $from=strtotime(date('d-m-Y 00:00:00',strtotime($date)));
        $this->db->where('u.created_on >=',$from);

        $to=strtotime(date('d-m-Y 23:59:59',strtotime($date)));
        $this->db->where('u.created_on <=',$to);

        return $this->db->get()->num_rows();
    }

    function all_job_date_count($date){

        $this->db->select('j.job_id');
        $this->db->from('job j');
        $this->db->where('j.is_active',ACTIVATE);

        $from=strtotime(date('d-m-Y 00:00:00',strtotime($date)));
        $this->db->where('j.creation_time >=',$from);

        $to=strtotime(date('d-m-Y 23:59:59',strtotime($date)));
        $this->db->where('j.creation_time <=',$to);

        return $this->db->get()->num_rows();
    }

    function all_job_applied_date_count($date){

        $this->db->select('j.job_applied_id');
        $this->db->from('job_applied j');
        $this->db->where('j.is_active',ACTIVATE);

        $from=strtotime(date('d-m-Y 00:00:00',strtotime($date)));
        $this->db->where('j.creation_time >=',$from);

        $to=strtotime(date('d-m-Y 23:59:59',strtotime($date)));
        $this->db->where('j.creation_time <=',$to);

        return $this->db->get()->num_rows();
    }

    function get_last_job_city_count_id($city_id){
        $this->db->select('c.max_job_count');
        $this->db->from('city c');
        $this->db->where('c.city_id',$city_id);
        return $this->db->get()->result();

    }

    function get_last_emp_job_count_id($user_id){
        $this->db->select('u.max_job_count');
        $this->db->from('users u');
        $this->db->where('u.id',$user_id);
        return $this->db->get()->result();

    }

    function get_job_location_list(){

        $this->db->select('c.city_name,c.city_id');
        $this->db->from('city c');
        $this->db->order_by('c.max_job_count','DESC');
        $this->db->limit('5,0');
        return $this->db->get()->result();
    }

    function all_job_location_count($city_id, $date_from, $date_to){

        $this->db->select('j.job_id');
        $this->db->from('job j');
        $this->db->where('j.city_id',$city_id);
        $this->db->where('j.creation_time >=',$date_from);
        $this->db->where('j.creation_time <=',$date_to);
        return $this->db->get()->num_rows();
    }

    function get_last_job_key_skills_count_id($key_skills_id){
        $this->db->select('k.max_key_skills_count');
        $this->db->from('key_skills k');
        $this->db->where('k.key_skills_id',$key_skills_id);
        return $this->db->get()->result();

    }

    function get_key_skills_list(){

        $this->db->select('k.key_skills_name,k.key_skills_id');
        $this->db->from('key_skills k');
        $this->db->order_by('k.max_job_count','DESC');
        $this->db->limit('5,0');
        return $this->db->get()->result();
    }

    function all_key_skills_count($key_skills_id, $date_from, $date_to){

        $this->db->select('jk.job_key_skills_id');
        $this->db->from('job_key_skills jk');
        $this->db->where('jk.key_skills_id',$key_skills_id);
        $this->db->where('jk.creation_time >=',$date_from);
        $this->db->where('jk.creation_time <=',$date_to);
        $this->db->group_by('jk.job_id');
        return $this->db->get()->num_rows();
    }

    function get_employers_company_list(){

        $this->db->select('u.company_name,u.id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id');
        $this->db->where('ug.group_id', EMPLOYER);
        $this->db->order_by('u.max_job_count','DESC');
        $this->db->limit('5,0');
        return $this->db->get()->result();
    }

    function all_employers_company_count($user_id, $date_from, $date_to){

        $this->db->select('u.max_job_count');
        $this->db->from('users u');
        $this->db->where('u.id',$user_id);
        $this->db->where('u.created_on >=',$date_from);
        $this->db->where('u.created_on <=',$date_to);
        return $this->db->get()->result();
    }

    function all_portal_hits_count($date){

        $this->db->select('sum(j.job_total_view) AS total_job_view');
        $this->db->from('job j');
        $this->db->where('j.is_active',ACTIVATE);

        $from=strtotime(date('d-m-Y 00:00:00',strtotime($date)));
        $this->db->where('j.creation_time >=',$from);

        $to=strtotime(date('d-m-Y 23:59:59',strtotime($date)));
        $this->db->where('j.creation_time <=',$to);

        return $this->db->get()->result();
    }

    function last_emp_id(){
        $this->db->select('u.emp_id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id');
        $this->db->where('ug.group_id', EMPLOYER);
        $this->db->order_by('u.id','DESC');
        $this->db->limit('1,0');
        $data = $this->db->get()->result();
        return $data;
    }

    function last_job_id(){
        $this->db->select('u.job_seeker_id');
        $this->db->from('users u');
        $this->db->join('users_groups ug', 'ug.user_id = u.id');
        $this->db->where('ug.group_id', JOB_SEEKER);
        $this->db->order_by('u.id','DESC');
        $this->db->limit('1,0');
        $data = $this->db->get()->result();
        return $data;
    }

    /* User Profile superadmin*/
    function get_user_details($user_id){
           $this->db->select('*,u.profile_img, u.city_id, u.state_id, u.country_id, u.phone, u.account_verified,u.email,u.first_name as first_name,u.last_name as last_name,gp.name as group_name,u.id as user_id,ug.group_id  as role_id');
           $this->db->from('users u');
           $this->db->join('users_groups ug', 'ug.user_id = u.id');
           $this->db->join('groups gp', 'gp.id = ug.group_id');
           $this->db->where('u.id',$user_id);
           $this->db->where('u.active',ACTIVATE);
           $data = $this->db->get()->row();
           return $data;
    }
   /*=========Blogs==============*/

    /*get all get Blog List */
    function getAllBlogCount($searchData = null,$searchStatus = null){
        $this->db->select('*,bg.is_active as is_active,bg.updation_time as updation_time');
        $this->db->from('blogs bg');
        $this->db->join('category c', 'c.category_id=bg.category_id','left');
        $this->db->join('users u', 'u.id=bg.updated_by');
        if($searchData){
            $this->db->where("(`bg.blog_title` LIKE '%$searchData%' OR `bg.blog_description` LIKE '%$searchData%')");
        }
        if($searchStatus){
            $this->db->where('bg.is_active',$searchStatus);
        }else{
            $this->db->where('bg.is_active',ACTIVATE);
        }
        $this->db->where('bg.is_active',ACTIVATE);

        return $this->db->get()->num_rows();
    }

    /*get all get Blog List */
    function getAllBlogList($searchData = null,$searchStatus = null,$limit,$offset){
        $this->db->select('*,bg.is_active as is_active,bg.updation_time as updation_time,bg.creation_time as creation_time');
        $this->db->from('blogs bg');
        $this->db->join('category c', 'c.category_id=bg.category_id','left');
        $this->db->join('users u', 'u.id=bg.updated_by');
        if($searchData){
            $this->db->where("(`bg.blog_title` LIKE '%$searchData%' OR `bg.blog_description` LIKE '%$searchData%')");
        }
        if($searchStatus){
            $this->db->where('bg.is_active',$searchStatus);
        }else{
            $this->db->where('bg.is_active ',ACTIVATE);
        }
        $this->db->where('bg.is_active ',ACTIVATE);
        $this->db->order_by('bg.blog_id ','DESC');

        if($limit){
            $this->db->limit($limit,$offset);
        }
        return $this->db->get()->result();
    }

    /*get all Category*/
    function getAllCategoryCount($searchData = null){
        $this->db->select('c.category_id');
        $this->db->from('category c');
        if($searchData){
            $this->db->where("(`c.category_name` LIKE '%$searchData%')");
        }
        $this->db->where('c.is_active',ACTIVATE);

        return $this->db->get()->num_rows();
    }

    /*get all get Blog List */
    function getAllCategoryList($searchData,$limit,$offset){
        $this->db->select('*');
        $this->db->from('category c');
        if($searchData){
            $this->db->where("(`c.category_name` LIKE '%$searchData%')");
        }
        $this->db->limit($limit,$offset);
        $this->db->order_by('c.category_id ','DESC');
        $this->db->where('c.is_active ',ACTIVATE);
        return $this->db->get()->result();
    }

    /*get all get Blog List */
    function getAllBlogListSearch($searchData,$searchStatus,$category_id,$date_range){
        $this->db->select('*,bg.is_active as is_active,bg.updation_time as updation_time');
        $this->db->from('blogs bg');
        $this->db->join('category c', 'c.category_id=bg.category_id','left');
        $this->db->join('users u', 'u.id=bg.updated_by');
        if($searchData){
            $this->db->where("(`bg.blog_title` LIKE '%$searchData%' OR `bg.blog_description` LIKE '%$searchData%')");
        }if($searchStatus){
            $this->db->where('bg.is_active',$searchStatus);
        }else{
            $this->db->where('bg.is_active ',ACTIVATE);
        }
        if($category_id){
            $this->db->where('bg.category_id',$category_id);
        }
        if($date_range){
            $date_from =  substr($date_range, 0, -13);
            $date_to =  substr($date_range, -10, 13);

            $from=strtotime(date('d-m-Y 00:00:00',strtotime($date_from)));
            $this->db->where('bg.creation_time >=',$from);

            $to=strtotime(date('d-m-Y 23:59:59',strtotime($date_to)));
            $this->db->where('bg.creation_time <=',$to);

        }
        $this->db->order_by('bg.blog_id ','DESC');
        return $this->db->get()->result();
    }

    /*get recent 4 Blogs List */
    function get_recent_blogs($blog_id=null,$limit,$offset){
        $this->db->select('bg.blog_id,bg.blog_title,bg.blog_url,bg.blog_image,');
        $this->db->from('blogs bg');
        $this->db->where('bg.is_active',ACTIVATE);
        $this->db->where('bg.blog_id !=',$blog_id);
        $this->db->order_by('bg.blog_id ','DESC');

        if($limit){
            $this->db->limit($limit,$offset);
        }
        return $this->db->get()->result();
    }

    /*get recent home blogs List */
    function get_home_blogs(){
        $this->db->select('bg.blog_id,bg.blog_title,bg.blog_url,bg.blog_description,bg.blog_image,bg.creation_time');
        $this->db->from('blogs bg');
        $this->db->where('bg.is_active',ACTIVATE);
        $this->db->order_by('bg.blog_id ','DESC');
        $this->db->limit(10);
        return $this->db->get()->result();
    }

    /*=========Blogs END==============*/
}


/**
 * End of model
 */

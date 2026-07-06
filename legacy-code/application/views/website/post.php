<style>

#header{
    position: static;
}
.blog-post .post-body p {
    text-align: justify;
}

.blog-post .post-body p {
    margin-bottom: 10px !important;
    color: #212529;
}

.image img {
    height: 126px !important;
}

.widget.latest-posts .image {
    max-width: 100% !important;
    height: 126px !important;
    margin-right: 0px !important;
}

.jssocials-share-link {
    color: #fff !important;
}

.fixed-form {
    position: fixed !important;
    top: 50%;
    width: 100% !important;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(-43%);
}

.form-hide {
    position: static !important;
}
.post .title, .post .date, .post .comments, .post .views {
    font-weight: 400;
    color: #999;
    text-transform: capitalize;
}
.widget.latest-posts strong{
    font-size: 1rem;
}
.blog-post .post-thumbnail img {
    width: 100%;
    margin-bottom: 10px;
}

@media (max-width:767px) {
    .fixed-form {
        width: 100% !important;
    }
}
</style>

<main class="bg-white our_bogs mt-5" style="padding-bottom: 2rem">
    <div class="container">
        <div class="row justify-content-center">
            <!-- Latest Posts -->
            <div class=" post blog-post col-lg-8">
            <div class="image-div">
                <div class="container-fluid px-0">
                    <div class="mt-3">
                        <h1 class="text-center blog-post-heading"><strong>POST</strong></h1>
                    </div>
                </div>
            </div>
            <div class="post-single">
                <div class="post-thumbnail">
                    <?php if($blogList){ ?>
                    <?php foreach($blogList as $blogLists){

                            if($blogLists->blog_image){
                                $blog_image=IMAGE_BLOG_PATH.$blogLists->blog_image;
                            }else{
                                $blog_image=IMAGE_PATH.'no_blogs.jpg';
                            }

                            ?>
                    <img src="<?php echo $blog_image;?>" alt="<?php echo $blogList[0]->blog_title;?>" class="img-fluid">
                </div>
                <?php }} ?>
                <div class="post-details">

                    <h1 class="blog-post-head-txt py-2"><?php echo $blogList[0]->blog_title;?></h1>
                    <div class="post-footer d-flex align-items-center flex-column flex-sm-row">
                        <a href="#" class="author d-flex align-items-center flex-wrap">
                            <div class="avatar">
                                <img src="<?php echo IMAGE_PATH?>avatar-mini.jpg" alt="..." class="img-fluid">
                            </div>
                            <div class="title">
                                <span><?php echo $blogList[0]->first_name;?></span>
                            </div>
                        </a>
                        
                        <div class="d-flex align-items-center flex-wrap">
                            <div class="date">
                                <?php
                                        $a='';
                                        $from=$blogList[0]->creation_time;
                                        $to=time();
                                        $a=timeDif($from,$to);
                                        ?>
                                <i class="fa fa-clock pl-2"></i> <?php echo $a;?>
                            </div>
                            <div class="views">


                                <i class="fa fa-eye pl-2"></i> <?php echo $blogList[0]->total_view;?>
                            </div>
                            <!-- <div class="comments meta-last pl-2">
                                <i class="fa fa-comment">&nbsp;<span class="countComment"></span></i>
                            </div> -->
                            <div class="shareRound d-md-inline-block pl-2">
                                <div id="shareRoundIcons" class="jssocials">
                                    <div class="jssocials-shares">
                                        <div class="jssocials-share jssocials-share-twitter"><a target="_blank"
                                                href="#"
                                                class="jssocials-share-link">
                                                <i class="fab fa-twitter jssocials-share-logo"></i></a></div>
                                        <div class="jssocials-share jssocials-share-facebook"><a target="_blank"
                                                href="#"
                                                class="jssocials-share-link">
                                                <i class="fab fa-facebook jssocials-share-logo"></i></a></div>
                                        <div class="jssocials-share jssocials-share-linkedin"><a target="_blank"
                                                href="#"
                                                class="jssocials-share-link"> 
                                                <i class="fab fa-linkedin jssocials-share-logo"></i></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="post-body">
                        <p class="lead"><?php echo $blogList[0]->blog_description;?></p>

                    </div>
                    <?php if($blogList[0]->comment_publish==1){?>
                    <div class="post-comments" hidden>
                        <header>
                            <h3 class="h6">Post Comments
                                <span class="no-of-comments countComment"></span>
                            </h3>
                        </header>
                        <div class="allComment">
                        </div>

                    </div>
                    <?php }?>


                    <div class="add-comment" hidden>
                        <header>
                            <h3 class="h6">Leave a reply</h3>
                        </header>
                        <form class="commenting-form" id="addCommentForm">
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <input type="hidden" name="blogId" required class="form-control blogId"
                                        value="<?php echo $blog_id;?>">

                                    <input type="text" name="username" id="username" placeholder="Name"
                                        class="form-control">
                                </div>
                                <div class="form-group col-md-6">
                                    <input type="email" name="useremail" id="useremail"
                                        placeholder="Email Address (will not be published)" class="form-control">
                                </div>
                                <div class="form-group col-md-12">
                                    <textarea name="usercomment" id="usercomment" placeholder="Type your comment"
                                        class="form-control"></textarea>
                                </div>
                                <span style="color: red" class="add_error"></span>

                                <div class="form-group col-md-12">
                                    <button type="submit" id="submit" class="btn btn-secondary  add_button">Submit
                                        Comment<span class="add_fa_spin_icon"></span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="scroll-to"></div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="row">
                <div class="col-12 order-lg-1 order-2">
                    <!-- Widget [Latest Posts Widget]-->
                    <?php if($blog_list){?>
                    <div class="widget latest-posts">
                        <header>

                            <h3 class="h6">Latest Posts</h3>
                        </header>
                        <?php foreach($blog_list as $blog_lists){?>
                        <div class="blog-posts"><a href="<?php base_url();?><?php echo $blog_lists->blog_url;?>">
                                <div class="item align-items-center">
                                    <?php if(strlen($blog_lists->blog_image)>10):
												$blogImage = IMAGE_BLOG_PATH.$blog_lists->blog_image;
											else :
												$blogImage =  IMAGE_PATH . 'no_blogs.jpg';

											endif;?>
                                    <div class="image"><img src="<?php echo $blogImage;?>" alt="..." class="img-fluid"
                                            width="100%"></div>
                                    <div class="title pt-2"><strong><?php echo $blog_lists->blog_title;?></strong>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php }?>
                    </div>
                    <?php }?>
                </div>
            </div>
        </div>
    </div>
    </div>
</main>

<!--send contact us -->
<script type="text/javascript">
var controller = 'Welcome';
var base_url = '<?php echo site_url(); //you have to load the "url_helper" to use this function ?>';


/*Add Contact Form*/
$("#add_contact_form").on('submit', function(e) {

    $('.add_contact_fa_spin_icon').html(
        '<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>\n');
    $(".add_contact_button").attr("disabled", true);
    $('.add_contact_error').html('');

    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: base_url + controller + '/add_apply_form',
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        'dataType': "json",
        success: function(data) {
            if (data.status == 200) {

                window.location.href = base_url + "thank-you";

            } else {
                $('.add_contact_error').html(data.data);
                $('.add_contact_fa_spin_icon').html('');
                $(".add_contact_button").attr("disabled", false);
            }
        }
    });
});
</script>

<script type="text/javascript">
var controller = 'Auth';
var base_url = '<?php echo site_url(); //you have to load the "url_helper" to use this function ?>';
var blog_id = '<?php echo $blog_id;?>';

function allComment() {

    $.ajax({
        'url': base_url + controller + '/allComment/',
        'type': 'POST', //the way you want to send data to your URL
        'dataType': "json",
        data: 'blog_id=' + blog_id,
        'success': function(data) { //probably this request will return anything, it'll be put in var "data"
            if (data.status == 200) {
                // $('').html(data.pagination);
                $('.allComment').html(data.data);
                $('.countComment').html(data.countComment);
            } else {
                $('.allComment').html(data.data);
                $('.countComment').html(data.countComment);

            }

        }
    });

}
allComment();


$("#addCommentForm").on('submit', function(e) {
    $('.add_error').html('');

    $('.add_fa_spin_icon').html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>\n');
    $(".add_button").attr("disabled", true);
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: base_url + 'Auth/addCommentPost',
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        'dataType': "json",
        success: function(data) {
            if (data.status == 200) {

                show_snackbar(data.data);
                setTimeout(function() {
                    location.reload();
                }, 500);
                allComment();
            } else {
                $('.add_error').html(data.data);
                $('.add_fa_spin_icon').html('');
                $(".add_button").attr("disabled", false);
            }
        }
    });
});
</script>
<script>
var fixTop = $('.web_analysis').offset().top;
$(window).scroll(function() {
    var currentScroll = $(window).scrollTop();
    if (currentScroll >= fixTop) {
        $('.web_analysis').addClass('fixed-form');
    } else {
        $('.web_analysis').removeClass('fixed-form');
    }
});
$(window).scroll(function() {
    var hT = $('#scroll-to').offset().top,
        hH = $('#scroll-to').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
    console.log((hT - wH), wS);
    if (wS > (hT + hH - wH)) {
        $('.web_analysis').addClass('form-hide');
    } else {
        $('.web_analysis').removeClass('form-hide');
    }
});
</script>
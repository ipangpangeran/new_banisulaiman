<!doctype html>
<html lang="en">
<head>
    <title>SLN</title>
    <!--<link rel="shortcut icon" href="<?php /*echo IMAGE_PATH*/?>happynotes_logo.png">-->

    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo IMAGE_PATH?>favicon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo IMAGE_PATH?>favicon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo IMAGE_PATH?>favicon.png">
    <link rel="manifest" href="<?php echo IMAGE_PATH?>site.webmanifest">
    <link rel="mask-icon" href="<?php echo IMAGE_PATH?>safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="theme-color" content="#ffffff">

    <!--[if IE 9]>
    <link href="<?php echo CSS_PATH. 'style-ie' .CSS_EXT?>" rel="stylesheet" type="text/css" />
    <link href="https://cdn.jsdelivr.net/gh/coliff/bootstrap-ie8/css/bootstrap-ie9.min.css" rel="stylesheet">
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <![endif]-->
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <script src="https://use.fontawesome.com/546d623f10.js"></script>

     <!-- Open Sans -->
     <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
         body{
            font-family: 'Open Sans', sans-serif !important;
         }
         @font-face {
             font-family: "Gilroy-ExtraBold";
             src: url("<?php echo FONT_PATH?>Gilroy-ExtraBold.otf");
         }
         @font-face {
            font-family: "circular-std-medium-500";
            src: url("<?php echo FONT_PATH?>circular-std-medium-500.ttf");
            }
         @font-face {
            font-family: "CircularStdBook";
            src: url("<?php echo FONT_PATH?>CircularStdBook.ttf");
          }
        #snackbar {
            visibility: hidden;
            min-width: 250px;
            /*margin-left: -125px;*/
            background-color: #3e956a;
            color: #fff;
            text-align: center;
            border-radius: 2px;
            padding: 16px;
            position: fixed;
            z-index: 9999;
            right: 1%;
            top: 10%;
            font-size: 17px;
        }

        #snackbar.show {
            visibility: visible;
            -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }

        @-webkit-keyframes fadein {
            from {top: 0; opacity: 0;}
            to {top: 10%; opacity: 1;}
        }

        @keyframes fadein {
            from {top: 0; opacity: 0;}
            to {top:  10%; opacity: 1;}
        }

        @-webkit-keyframes fadeout {
            from {top: 10%; opacity: 1;}
            to {top: 0; opacity: 0;}
        }

        @keyframes fadeout {
            from {top: 10%; opacity: 1;}
            to {top: 0; opacity: 0;}
        }

        #snackbar_error {
            visibility: hidden;
            min-width: 250px;
            /*margin-left: -125px;*/
            background-color: #FF5733;
            color: #fff;
            text-align: center;
            border-radius: 2px;
            padding: 16px;
            position: fixed;
            z-index: 9999;
            right: 1%;
            top: 10%;
            font-size: 17px;
        }

        #snackbar_error.show {
            visibility: visible;
            -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }

    </style>
    <style>
        /*:root {*/
        /*--input-padding-x: 1.5rem;*/
        /*--input-padding-y: .75rem;*/
        /*}*/

        body {
            background: #007bff;
            background: linear-gradient(to right, #00000026, #00000026);
            height: 100vh;
            font-family: "CircularStdBook";
        }

        .card-signin {
            border: 0;
            border-radius: 2px;
            box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
        }

        .card-signin .card-title {
            margin-bottom: 2rem;
            font-weight: 300;
            font-size: 35px;
            opacity:0.8;
            font-weight: bolder;
        }

        .card-signin .card-body {
            padding: 2rem;
        }
        .form-signin {
            width: 100%;
        }
        input, input:placeholder{
             font-family: "CircularStdBook";
        }
        .btn-sign-in {
            font-size: 18px;
            border-radius: 4px;
            letter-spacing: .1rem;
            font-weight: bold;
            padding:0.3rem 1rem;
            transition: all 0.2s;
            width: 50%;
            border:1px solid #FF2B3C;
            font-family: "circular-std-medium-500";
        }
        .form-label-group {
            position: relative;
            margin-bottom: 1rem;
        }
        .fontAwesome {
            font-family: 'Helvetica', FontAwesome, sans-serif;
        }
        .form-label-group input {
            height: auto;
            border-radius: 4px;
        }

        .form-label-group>input,
        .form-label-group>label {
            padding: .75rem 1.5rem;
        }

        .form-label-group>label {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            margin-bottom: 0;
            /* Override default `<label>` margin */
            line-height: 1.5;
            color: #495057;
            border: 1px solid transparent;
            border-radius: .25rem;
            transition: all .1s ease-in-out;
        }

        .form-label-group input::-webkit-input-placeholder {
            color: transparent;
        }

        .form-label-group input:-ms-input-placeholder {
            color: transparent;
        }

        .form-label-group input::-ms-input-placeholder {
            color: transparent;
        }

        .form-label-group input::-moz-placeholder {
            color: transparent;
        }

        .form-label-group input::placeholder {
            color: transparent;
        }

        .form-label-group input:not(:placeholder-shown) {
            padding-top: calc(.75rem + .75rem * (2 / 3));
            padding-bottom: calc(.75rem / 3);
        }

        .form-label-group input:not(:placeholder-shown)~label {
            padding-top: calc(.75rem / 3);
            padding-bottom: calc(.75rem / 3);
            font-size: 12px;
            color: #777;
        }

        .btn-google {
            color: white;
            background-color: #ea4335;
        }

        .btn-facebook {
            color: white;
            background-color: #3b5998;
        }
        .forget_text {
            text-decoration: none !important;
            color: #212529 !important;
        }
        .show-hide .input-group-text  {
            background-color: transparent !important;
            border: 0;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            cursor: pointer;
        }
        .modal-header{
            background: #007bff;
            background: linear-gradient(to right, #0062E6, #33AEFF);
            padding: 0px;
            height: 45px;
        }
        .modal-header .close{
            padding: 10px;
            margin: 0;
            opacity: 1;
        }
        @media (max-width: 1200px) {
            .font-sm-12 {
                font-size: 14px;
            }
        }

        @media (max-width: 767px) {
            .card-signin .card-body {
                padding: 1rem;
            }
        }

        @media (max-width: 475px) {
            .card-signin .card-body {
                padding: 1rem;
            }
            .font-sm-12 {
                font-size: 12px;
            }
        }

        @supports (-ms-ime-align: auto) {
            .form-label-group>label {
                display: none;
            }
            .form-label-group input::-ms-input-placeholder {
                color: #777;
            }
        }

        @media all and (-ms-high-contrast: none),
        (-ms-high-contrast: active) {
            .form-label-group>label {
                display: none;
            }
            .form-label-group input:-ms-input-placeholder {
                color: #777;
            }
        }

    </style>
    <script>
        function show_snackbar(e) {
            var x = document.getElementById("snackbar");
            x.className = "show";
            $('#snackbar').html(e);
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        function show_snackbar_error(e) {
            var x = document.getElementById("snackbar_error");
            x.className = "show";
            $('#snackbar_error').html(e);
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    </script>
</head>
<body>
<div id="snackbar"></div>
<div id="snackbar_error"></div>
<?php
$success_message = $this->session->flashdata('success_message');
$error_message = $this->session->flashdata('error_message');

if (isset($success_message)) {

    echo " <div class=\"alert alert-success alert-square alert-dismissable\">
        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>
        <strong>Success!</strong> $success_message
    </div>";
}

if (isset($error_message)) {

    echo " <div class=\"alert alert-danger alert-square alert-dismissable\">
        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>
        <strong>Warning!</strong> $error_message
        </div>";
}

unset($_SESSION['success_message']);
unset($_SESSION['error_message']);
?>
<div class="container h-100">
    <div class="row h-100">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto d-flex">
            <div class="card card-signin my-auto w-100">
                <div class="card-body">
                    <div class="col-12 text-center mb-4">
                        <!-- <img src="<?php echo IMAGE_PATH?>TS-Logo-LArge-1.png" width="100px" height="auto" class="logo-login"> -->
                    </div>
                    <h5 class="card-title text-center"> Welcome</h5>
                    <?php echo form_open( 'Auth/check_login',array('class' =>"form-login1")) ?>
                    <div class="form-label-group">
                        <input type="email" name="email" id="inputEmail" class="form-control" placeholder="" required autofocus>
                        <label for="inputEmail"><i class="fa fa-envelope" aria-hidden="true"></i> Email address</label>
                    </div>

                    <div class="form-label-group">
                        <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" autocomplete="off" required>
                        <label for="inputPassword"><i class="fa fa-key" aria-hidden="true"></i> Password</label>
                        <div class="input-group-append show-ie-right show-hide">
                            <span class="input-group-text" id="showpassword">Show</span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label font-sm-12" for="customCheck1">Remember password</label>
                        </div>
                        <div>
                            <a href="javascript:void(0);" class="float-right mt-1 mt-md-0 forget_text font-sm-12 " id="onForgot"><span  data-toggle="modal" data-target="#forgot">Forgot Password?</span></a>
                        </div>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-lg btn-primary text-uppercase mt-3 btn-sign-in" type="submit" style="background-color: #FF2B3C;">Sign in</button>
                    </div>
                    <?php echo form_close()?>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Forgot Password-->
<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="forgot" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="forgotForm">
                <div class="modal-header">
                    <h5 class="modal-title w-100 text-light mt-2 pl-2">Forgot Password ?</h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Enter your Email Id below to reset your password.</p>
                    <input required type="text" name="email" id="forgot-email" placeholder="Email Id / Emp Id" autocomplete="off" class="forget_password_email form-control placeholder-no-fix">
                </div>
                <div class="modal-footer">
                    <span class="forgot_error" style="color: red"></span>
                    <b class="error_forget_email" style="color: red"></b>
                    <button type="submit" class="btn btn-success forgot_button" style="border: none;color: #fff;background: #536ae2; !important;border-radius: 0;">
                        Submit <span class="forgot_fa_spin_icon"></span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>



</body>
<script>
    var controller = 'Auth';
    var base_url = '<?php echo site_url(); //you have to load the "url_helper" to use this function ?>';

    document.getElementById("showpassword").addEventListener("click", showpasswords);
    function showpasswords() {
        var x = document.getElementById("inputPassword");
        var showText = document.getElementById("showpassword");
        if (x.type === "password") {
            x.type = "text";
            showText.innerHTML = 'Hide ';
        } else {
            x.type = "password";
            showText.innerHTML = 'Show  ';
        }
    }

    /*Login floating label solved*/
    /*$(document).ready(function() {
     setTimeout(function () {
     this._toggleClass(this._isWebkitAutofilled());
     }.bind(this), 2000);
     });*/

    /*Forgot password email*/
    $('#onForgot').click(function() {
        var userEmail = $('#EmployeeId').val();
        $('#forgot-email').val(userEmail);
    })

    function forgot_get_email(){

        var email = $('.login_email').val();
        $('.forget_password_email').val(email);
    }

    function activate_get_email(){

        var email = $('.login_email').val();
        $('.active_email').val(email);
    }
    /*Forgot password*/
    $("#forgotForm").on('submit', function (e) {
        $('.forgot_error').html('').fadeIn('');
        $('.forgot_fa_spin_icon').html(' <div class="spinner-border spinner-border-sm"></div>\n');
        $(".forgot_button").attr("disabled", true);
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: base_url + controller + '/forgotPassword',
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            'dataType': "json",
            success: function (data) {
                if (data.status == 200) {
                    $('.forgot_fa_spin_icon').html('');
                    $(".forgot_button").attr("disabled", false);
                    show_snackbar(data.data);
                    // setTimeout(function () {
                    //     location.reload();
                    // }, 500);
                } else {
                    $('.forgot_error').html(data.data).delay(3200).fadeOut(300);
                    $('.forgot_fa_spin_icon').html('');
                    $(".forgot_button").attr("disabled", false);
                }
            }
        });
    });

</script>
</html>

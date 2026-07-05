<!DOCTYPE html>
<html lang="en">
<head>
   <?php
      if(isset($title)){
      echo $title;
      }
   ?>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta name="author" content="Ma'had Bani Sulaiman WebApp">
      <?php
         if(isset($metatags)){
         echo $metatags;
         }
      ?>
   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   <link rel="apple-touch-icon" sizes="180x180" href="<?php echo IMAGE_PATH?>logo.png">
   <link rel="icon" type="image/png" sizes="32x32" href="<?php echo IMAGE_PATH?>logo.png">
   <link rel="icon" type="image/png" sizes="16x16" href="<?php echo IMAGE_PATH?>logo.png">
   <link rel="icon" type="image/x-icon" href="<?php echo IMAGE_PATH?>favicon.ico">
   <link rel="manifest" href="<?php echo IMAGE_PATH?>site.webmanifest">
   <meta name="msapplication-TileColor" content="#da532c">
   <meta name="theme-color" content="#ffffff">
   <link href="<?php echo CSS_PATH. 'bootstrap.min' .CSS_EXT?>" rel="stylesheet" type="text/css" />
   <link href="<?php echo FONT_AWESOME?>all.css" rel="stylesheet" type="text/css" />
   <link href="<?php echo CSS_PATH. 'style_home' .CSS_EXT?>" rel="stylesheet" type="text/css" />
   <link href="<?php echo CSS_PATH. 'style_web' .CSS_EXT?>" rel="stylesheet" type="text/css" />
   <link href="<?php echo CSS_PATH. 'style_ie' .CSS_EXT?>" rel="stylesheet" type="text/css" />
   <link href="<?php echo CSS_PATH. 'animate' .CSS_EXT?>" rel="stylesheet" type="text/css" />
   <link href="<?php echo CSS_PATH. 'style-ombak' .CSS_EXT?>" rel="stylesheet" type="text/css" />
   <link href="<?php echo CSS_PATH. 'style-thanks' .CSS_EXT?>" rel="stylesheet" type="text/css" />
   <link href="<?php echo CSS_PATH. 'style-tambahan' .CSS_EXT?>" rel="stylesheet" type="text/css" />
   <link rel="stylesheet" href="<?php echo CSS_PATH?>owl.carousel.min.css">
   <link rel="stylesheet" href="<?php echo CSS_PATH?>owl.theme.default.min.css">
   <link href="<?php echo CSS_PATH. 'theme.min' .CSS_EXT?>" rel="stylesheet" />
   <script src="<?php echo JS_PATH. 'jquery.min.js' ?>"></script>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
   <!-- Swiper Css -->
   <link rel="stylesheet"  href="<?php echo CSS_PATH. 'swiper-bundle.min' .CSS_EXT?>" />
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
   <!-- date range picker-- -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" integrity="sha512-mSYUmp1HYZDFaVKK//63EcZq4iFWFjxSL+Z3T/aCt4IO9Cejm03q3NKKYN6pFQzY0SBOr8h+eCIAZHPXcpZaNw==" crossorigin="anonymous" />
   <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
   <!-- ------AOS------- -->
   <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
   <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
   <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"> -->
   <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"> -->
   <!-- ---------conditional comments for IE------- -->
   <!--[if IE 9]>
   <link href="https://cdn.jsdelivr.net/gh/coliff/bootstrap-ie8/css/bootstrap-ie9.min.css" rel="stylesheet">
   <![endif]-->
   <!--[if lte IE 8]>
   <link href="https://cdn.jsdelivr.net/gh/coliff/bootstrap-ie8/css/bootstrap-ie8.min.css" rel="stylesheet">
   <script src="https://cdn.jsdelivr.net/g/html5shiv@3.7.3"></script>
   <![endif]-->
   <!-- --------/conditional comments for IE----- -->
   <!-- -----fonts----- -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
   <link href="https://fonts.cdnfonts.com/css/cooper-black" rel="stylesheet">
   <link href="https://fonts.cdnfonts.com/css/cooper-black-cyrillic" rel="stylesheet">
   <link href="https://fonts.cdnfonts.com/css/agbalumo" rel="stylesheet">
   <link href="https://fonts.cdnfonts.com/css/edu-vic-wa-nt-beginner" rel="stylesheet">

   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

   <style>
      .goog-te-gadget-icon {
      display: none !important;
      }
      .goog-te-gadget-simple {
      font-size: 16px !important;
      color: #23233f !important;
      font-weight: 500 !important;
      border: none !important;
      }
      html,
      body {
      height: 100%;
      }
      #wrap {
      min-height: 92%;
      }
      tfoot {
      display: table-header-group;
      }
   </style>

   <!--START snackbar CSS and JS-->
   <style>
      #snackbar {
      visibility: hidden;
      width: 280px;
      background-color: #289949;
      color: #fff;
      text-align: center;
      border-radius: 2px;
      padding: 16px;
      position: fixed;
      z-index: 9999;
      bottom: 30px;
      font-size: 17px;
      left: 0;
      right: 0;
      margin: 0 auto;
      }
      #snackbar.show {
      visibility: visible;
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
      }
      #snackbar_error {
      visibility: hidden;
      min-width: 250px;
      margin-left: -125px;
      background-color: #FF5733;
      color: #fff;
      text-align: center;
      border-radius: 2px;
      padding: 16px;
      position: fixed;
      z-index: 9999;
      left: 50%;
      bottom: 30px;
      font-size: 17px;
      }
      #snackbar_error.show {
      visibility: visible;
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
      }
   </style>

</head>

   <div id="snackbar"></div>
   <div id="snackbar_error"></div>
   <body >
      <div id="loader-body" style="display: none;">
         <div class="sk-circle">
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
         </div>
      </div>
      <div id="wrap">
      <div id="main" class="container-fluid clear-top px-0">
      <!-- Top Contact Details -->
      <div class="top-header-section bg-white">
         <div class="container">
            <div class="row align-items-center">
               <div class="col-xl-8 col-md-9 mx-auto text-center pr-md-0">
                  <a href="https://wa.me/6285183212024?text=Bismillah,%20Assalamualaikum" class="top_link ml-0" target="_blank">
                  <i class="fa fa-whatsapp color-orange mr-1"></i>
                  +62 85-1832-12024
                  </a>
                  <a href="mailto:admin@banisulaiman.or.id" class="top_link">
                  <i class="fa fa-envelope mr-1 color-orange"></i>
                  admin@banisulaiman.or.id
                  </a>
               </div>
            </div>
         </div>
      </div>
      <!-- /Top Contact Details -->
      <!-- ----Navbar--- -->
      <section id="top__header" class="topheader">
         <header id="header">
            <div class="container px-0">
               <nav class="navbar navbar-expand-md px-md-0 py-nav">
                  <a href="<?php echo base_url()?>" class="nav_brand animate__backInDown animate__animated">
                  <img src="<?php echo IMAGE_PATH?>logo-bansul.png" alt="logo">
                  </a>
                  <button class="d-md-none d-block toggler-button" id="sidebarCollapse" type="button">
                     <div class="bar-parents">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                     </div>
                  </button>
                  <!-- -closing menu by side click -->
                  <div class="d-xl-none d-block" id="side-click-close">
                  </div>
                  <div class="collapse navbar-collapse mobile-nav" id="navbarNav">
                     <div class="mobile-logo d-none mx-auto">
                        <a class="" href="<?php echo base_url()?>">
                        <img src="<?php echo IMAGE_PATH?>logo-bansul.png"
                           class="my-3 d-xl-none d-block mx-auto" width="80" height="auto" alt="logo">
                        </a>
                     </div>
                     <button id="closeMenu" class="d-none">
                     <img src="<?php echo IMAGE_PATH?>delete.png" width="20" alt="close">
                     </button>
                     <div class="d-md-none d-block m-3">
                        <a href="<?php echo base_url()?>">
                        <img src="<?php echo IMAGE_PATH?>logo-bansul.png" alt="logo" class="mobil-logo">
                        </a>
                     </div>
                     <ul class="navbar-nav ml-auto main-ul">

                        <?php if(uri_string() == ''){
                              echo "<li class='nav-item active'>";
                           }
                           else
                           {
                              echo "<li class='nav-item'>";
                           }
                        ?>
                        <a href="<?php echo base_url()?>" class="nav-link animate__backInDown animate__animated header_font">
                        Profil Ma'had
                        </a>
                        </li>

                        <li class="nav-item dropdown <?php echo (uri_string() == 'program_pendidikan' || uri_string() == 'fasilitas' || uri_string() == 'kegiatan') ? 'active' : ''; ?>" id="informasiDropdownItem">
                           <a href="#" class="nav-link dropdown-toggle animate__backInDown animate__animated header_font" id="informasiDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Informasi <i class="fa fa-caret-down" aria-hidden="true"></i></a>
                           <ul class="dropdown-menu" aria-labelledby="informasiDropdown">
                              <li class="<?php echo uri_string() == 'program_pendidikan' ? 'active' : ''; ?>">
                                 <a href="<?php echo base_url()?>program_pendidikan" class="dropdown-item hover-effect">
                                    Program Pendidikan
                                 </a>
                              </li>
                              <li class="<?php echo uri_string() == 'fasilitas' ? 'active' : ''; ?>">
                                 <a href="<?php echo base_url()?>fasilitas" class="dropdown-item hover-effect">
                                    Fasilitas Ma'had
                                 </a>
                              </li>
                              <li class="<?php echo uri_string() == 'kegiatan' ? 'active' : ''; ?>">
                                 <a href="<?php echo base_url()?>kegiatan" class="dropdown-item hover-effect">
                                    Kegiatan Ma'had
                                 </a>
                              </li>
                           </ul>
                        </li>

                        <?php if(uri_string() == 'pendaftaran'){
                              echo "<li class='nav-item active'>";
                           }
                           else
                           {
                              echo "<li class='nav-item'>";
                           }
                        ?>
                        <a href="<?php echo base_url()?>pendaftaran" class="nav-link animate__backInDown animate__animated header_font">
                        Pendaftaran
                        </a>
                        </li>
                        <?php if(uri_string() == 'berita'){
                              echo "<li class='nav-item active'>";
                           }
                           else
                           {
                              echo "<li class='nav-item'>";
                           }
                        ?>
                        <a href="<?php echo base_url()?>berita" class="nav-link animate__backInDown animate__animated header_font">
                        Berita dan Artikel
                        </a>
                        </li>
                        <?php if(uri_string() == 'galeri'){
                              echo "<li class='nav-item active'>";
                           }
                           else
                           {
                              echo "<li class='nav-item'>";
                           }
                        ?>
                        <a href="<?php echo base_url()?>galeri" class="nav-link animate__backInDown animate__animated header_font">
                        Galeri
                        </a>
                        </li>
                        <?php if(uri_string() == 'donasi'){
                              echo "<li class='nav-item active'>";
                           }
                           else
                           {
                              echo "<li class='nav-item'>";
                           }
                        ?>
                        <a href="<?php echo base_url()?>donasi" class="nav-link animate__backInDown animate__animated header_font">
                        Donasi dan Kerjasama
                        </a>
                        </li>
                     </ul>
                     
                     <div class="contact-btn-wrapper">
                        <a href="<?php echo base_url()?>contact-us" class="btn btn-primary btn-primary_rad animate__animated  animate__heartBeat font-kontak">
                        Kontak
                        </a>
                     </div>

                     <!-- Social Icons -->
                     <div class="d-md-none d-block">
                        <ul class="social">
                           <li class="ml-0">
                              <a href="https://www.youtube.com/@banisulaimanbdg" target="_blank">
                              <i class="fa fa-youtube"></i>
                              </a>
                           </li>
                           <li>
                              <a href="https://www.instagram.com/tahfidzbanisulaiman/" target="_blank">
                              <i class="fa fa-instagram"></i>
                              </a>
                           </li>
                           <li>
                              <a href="https://wa.me/6285183212024?text=Bismillah,%20Assalamualaikum" target="_blank">
                              <i class="fa fa-whatsapp"></i>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </nav>
            </div>
         </header>
      </section>
      <!-- ---end Navbar-- -->
       
<script>
   $(document).ready(function () {
       $('#sidebarCollapse, #closeMenu, #side-click-close,.goService').on('click', function () {
           $('#sidebarCollapse, #navbarNav, #closeMenu,  #side-click-close').toggleClass(
               'active');
           $('#overlay_menu').toggleClass('bg-body');
           $('body').toggleClass('stop-scroll');
           $('a[aria-expanded=true]').attr('aria-expanded', 'false');
       });
       window.onload = function() {
          window.scrollTo(0, 0);
       }
   });
   $(".goService").click(function() {
    $('html, body').animate({
      scrollTop: $("#our-service").offset().top - 200
    }, 700);
   });
</script>

<script>
   $(document).ready(function() {
      // Saat dropdown diklik
      $('#informasiDropdown').on('click', function(e) {
         e.preventDefault(); // Mencegah perilaku default
         $(this).next('.dropdown-menu').toggleClass('show'); // Toggle class 'show'
      });
      
      // Saat mengklik di luar dropdown
      $(document).on('click', function(e) {
         if (!$(e.target).closest('#informasiDropdown').length && !$(e.target).closest('.dropdown-menu').length) {
            $('.dropdown-menu').removeClass('show'); // Sembunyikan dropdown
         }
      });
   });
</script>

<script>
   $(document).ready(function() {
      // Ketika dropdown ditampilkan
      $('#informasiDropdown').on('show.bs.dropdown', function () {
         $('#informasiDropdownItem').addClass('active');
      });

      // Ketika dropdown disembunyikan
      $('#informasiDropdown').on('hide.bs.dropdown', function () {
         // Hapus kelas active hanya jika tidak ada item dropdown yang aktif
         if (!window.location.href.includes('program_pendidikan') &&
             !window.location.href.includes('fasilitas') &&
             !window.location.href.includes('kegiatan')) {
            $('#informasiDropdownItem').removeClass('active');
         }
      });
   });
</script>

<script>
function showPopup(name, position, image, description) {
    document.getElementById("popupOverlay").classList.remove("d-none");
    document.getElementById("customPopup").classList.remove("d-none");

    // Update isi popup sesuai data yang diklik
    document.getElementById("popupName").innerText = name;
    document.getElementById("popupPosition").innerText = position;
    document.getElementById("popupImage").src = image;
    document.getElementById("popupDescription").innerText = description;
}

function hidePopup() {
    document.getElementById("popupOverlay").classList.add("d-none");
    document.getElementById("customPopup").classList.add("d-none");
}
</script>

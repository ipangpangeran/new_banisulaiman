<footer class="page-footer">
   <div class="container pb">
      <div class="row align-items-center align-items-md-start">
         <div class="col-md-5">
            <div class="footer__flex__items_yayasan">
               <img src="<?php echo IMAGE_PATH?>yayasan.png" alt="sln" class="logo_yayasan">
               <img src="<?php echo IMAGE_PATH?>logo-majelis-new.png" alt="sln" class="logo_majelis">
            </div>
         </div>
         <div class="col-md-3">
            <div class="footer__flex__items">
               <h6>Bani Sulaiman</h6>
               <ul class="footer-ul">
                  <li>
                     <a href="<?php echo base_url()?>">
                     Profil Ma'had
                     </a>
                  </li>
                  <li>
                     <a href="<?php echo base_url()?>informasi">
                     Informasi
                     </a>
                  </li>
                  <li>
                     <a href="<?php echo base_url()?>pendaftaran">
                     Pendaftaran
                     </a>
                  </li>
                  <li>
                     <a href="<?php echo base_url()?>berita">
                     Berita dan Artikel
                     </a>
                  </li>
                  <li>
                     <a href="<?php echo base_url()?>galeri">
                     Galeri
                     </a>
                  </li>
                  <li>
                     <a href="<?php echo base_url()?>donasi">
                     Donasi dan Kerjasama
                     </a>
                  </li>
                  <li>
                     <a href="<?php echo base_url()?>contact-us">
                     Kontak
                     </a>
                  </li>
               </ul>
            </div>
         </div>
         <div class="col-md-3">
            <div class="footer__flex__items">
               <h6>Hubungi Kami</h6>
               <div class="flex-1">
                  <ul class="social">
                     <li class="ml-0">
                        <a href="https://www.youtube.com/@banisulaimanbdg" target="_blank">
                        <i class="fa fa-youtube"></i>
                        </a>
                     </li>
                     <li>
                        <a href="https://www.instagram.com/mahadbanisulaiman/" target="_blank">
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
            <div class="contact_details pl-md-0 mt-md-25 mt-5">
               <div class="d-flex">
                  <div>
                   <i class="fa fa-map-marker"></i>
                  </div>
                  <div>
                   <a href="https://maps.app.goo.gl/VmBSYUrLmW82rMzb8" target="
                      _blank" data-toggle="tooltip" title="Get Direction" data-placement="bottom">
                   <strong>Masjid Bani Sulaiman</strong>
                   <br>
                   Jl. Dago Pojok Tanggulan, Gg. 6, Cikalapa II RT 09 RW 03, Kel. Dago, Kec. Coblong, Kota Bandung, Jawa Barat 40135
                   </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="container-fluid  copyrigt-footer px-0">
      <div class="container mx-auto footer__copyrightr">
         <div
            class="flex_column d-flex justify-content-between align-items-md-center flex-md-row flex-column   px-md-0">
            <div class="footer-copyright ">
               <ul class="footer__ul">
                  <li>
                     <a href="<?php echo base_url()?>" class="text_muted">
                     © Bani Sulaiman 2025. All rights reserved.
                     </a>
                  </li>
               </ul>
            </div>
            <span class="content-text "> <span class="opacity_less">Developed by</span> <a
               href="https://ipangpangeran.com/" class="anchor-text-footer" target="_blank"> Bani Sulaiman IT Team</a></span>
         </div>
      </div>
   </div>
</footer>

<!-- -----scroll top-- -->
<div class="scrollTop" data-toggle="tooltip" data-placement="bottom" title="Go To Top">
   <i class="fa fa-angle-up fa-2x floating" aria-hidden="true"></i>
</div>
<!-- -----scroll top-- -->
 
</body>
<script src="<?php echo JS_PATH . 'modernizr.min.js' ?>"></script>
<script src="<?php echo JS_PATH . 'moment.min.js' ?>"></script>
<script src="<?php echo JS_PATH . 'popper.min.js' ?>"></script>
<script src="<?php echo JS_PATH . 'bootstrap.min.js' ?>"></script>
<script src="<?php echo JS_PATH . 'detect.js' ?>"></script>
<script src="<?php echo JS_PATH . 'wow.min.js' ?>"></script>
<script src="<?php echo JS_PATH . 'index.js' ?>"></script>
<script src="<?php echo JS_PATH . 'jquery.blockUI.js' ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="<?php echo JS_PATH?>owl.carousel.min.js"></script>
<!-- Swiper Js -->
<script src="<?php echo JS_PATH . 'swiper-bundle.min.js' ?>"></script>
<!--datepicker-->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<!--Datepicker-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"
   integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ=="
   crossorigin="anonymous"></script>
<script src="<?php echo JS_PATH . 'detect.js' ?>"></script>
<script>
   AOS.init();
</script>
<script>
   $(document).ready(function() {
       $('.counter').counterUp({
           delay: 10,
           time: 1000
       });
   });
   
   $(function() {
       $('[data-toggle="tooltip"]').tooltip()
   });
   
   
   // ======== Swiper Controls========
   const swiper = new Swiper('.swiper.myswiper', {
       // Optional parameters
       direction: 'horizontal',
       loop: false,
       centeredSlides: false,
       slidesPerView: 3,
       spaceBetween: 40,
       grabCursor: true,
       keyboard: {
           enabled: true,
       },
       autoplay: {
           delay: 2500,
           disableOnInteraction: false,
       },
       // Navigation arrows
       navigation: {
           nextEl: '.swiper-button-next',
           prevEl: '.swiper-button-prev',
       },
       breakpoints: {
           0: {
               slidesPerView: 1,
               spaceBetween: 20,
           },
           640: {
               slidesPerView: 1,
               spaceBetween: 20,
           },
           768: {
               slidesPerView: 2,
               spaceBetween: 40,
           },
           1024: {
               slidesPerView: 3,
           },
       },
   
       // And if we need scrollbar
       scrollbar: {
           el: '.swiper-scrollbar',
           draggable: true,
       },
   });
</script>
<script>
   var controller = 'Welcome';
   var base_url = '<?php echo site_url(); //you have to load the "url_helper" to use this function ?>';
   
   $("#home_contact").on('submit', function(e) {
   
       $('.contact_form_fa_spin_icon').html(
           '<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>\n');
       $(".contact_us_button").attr("disabled", true);
       $('.contact_us_error').html('');
   
       e.preventDefault();
       $('.contact_us_error').html('');
       $("div#divLoading").addClass('show');
       $.ajax({
           'url': base_url + 'Welcome' + '/submit_contact_us',
           'type': 'post', //the way you want to send data to your URL
           data: new FormData(this),
           contentType: false,
           cache: false,
           processData: false,
           'dataType': "json",
           'success': function(data) {
               if (data.status == 200) {
                   $(".contact_us_button").attr("disabled", false);
                   $('.contact_form_fa_spin_icon').html('');
                   window.location.href = base_url + "thank-you";
   
               } else {
                   $('.contact_form_fa_spin_icon').html('');
                   $(".contact_us_button").attr("disabled", false);
                   $("div#divLoading").removeClass('show');
                   $('.contact_us_error').html(data.data);
               }
           }
       });
   });
</script>
<script>
   var controller = 'Auth';
   var base_url = '<?php echo site_url(); //you have to load the "url_helper" to use this function?>';
   
   
   $("#change_password_form_emp").on('submit', function(e) {
       $('.change_pass_error').html('');
       $('.change_pass_fa_spin_icon').html(
           '<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>\n');
       $(".change_password_btn").attr("disabled", true);
       e.preventDefault();
       $.ajax({
           type: 'POST',
           url: base_url + 'Dashboard' + '/change_password_emp',
           data: new FormData(this),
           contentType: false,
           cache: false,
           processData: false,
           'dataType': "json",
           success: function(data) {
               if (data.status == 200) {
                   $("#change_password_form_emp")[0].reset();
                   show_snackbar(data.data);
                   $('.change_pass_error').html('');
                   $('.change_pass_fa_spin_icon').html('');
                   $(".change_password_btn").attr("disabled", false);
                   $('.modal_close_btn').click();
               } else {
                   $('.change_pass_error').html(data.data);
                   $('.change_pass_fa_spin_icon').html('');
                   $(".change_password_btn").attr("disabled", false);
               }
           }
       });
   });
   
   $('.rangePicker').daterangepicker({
       locale: {
           format: 'DD-MM-YYYY',
           // daysOfWeek: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
           monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
               'October', 'November', 'December'
           ],
           firstDay: 1
       },
       showDropdowns: true,
       linkedCalendars: false,
       ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf(
               'month')]
       },
   });
   
   $(window).on('load', function() {
       $('#select_range').val('');
   });
</script>
<!--------SCROLL EFFECTS STARTS SCRIPT-------->
<script>
   $(document).ready(function(e){
      window.addEventListener('scroll', function (e) {
         if($(window).width()>=767){
            var topheader = document.querySelector('.topheader');
            var scrollDown= topheader.classList.toggle("ScrollY", window.scrollY > 11);
            if(scrollDown){
                window.addEventListener('wheel', function (event) {
                //While Scrolling Up the mouse wheel
                 if(event.deltaY<=0){
                   window.addEventListener('scroll', function(){
                     topheader.classList.toggle("scroll-down", window.scrollY <= 68);
                   })
                  topheader.classList.add("active-bg");
                  topheader.classList.remove("static");
                 }
               //While  Scrolling Down the mouse wheel
                 else if(event.deltaY>0){
                     topheader.classList.remove("active-bg");
                     topheader.classList.add("static");
                 }
               })
            }else{
                // Removing Classes on topheader while Windows ScrollY position is less than 11
                 topheader.classList.remove("static", "ScrollY","scroll-down");
              }
           }else{
            // For Mobile devices (<767)
            var topheader = document.querySelector('.topheader');
            topheader.classList.toggle("active-bg", window.scrollY > 200);
         }

         //    Got to Top Function
         var scroll = document.querySelector('.scrollTop');
         scroll.classList.toggle("active", window.scrollY > 500)
         scroll.addEventListener('click', (e)=>{
            window.scrollTo({
            top: 0,
            behavior: 'smooth',
            })
        });
      });
    })
</script>
<!-- /SCROLL EFFECTS ENDS SCRIPT -->
<script>
   // Owl 1
   $('.owl-carousel.owl-1').owlCarousel({
       loop: false,
       lazyLoad: true,
       margin: 20,
       center: false,
       nav: true,
       fade: true,
       autoplay: false,
       autoplayTimeout: 4000,
       dots: false,
       responsive: {
           0: {
               items: 1
           },
           600: {
               items: 1
           },
           1000: {
               items: 12
           },
           1200: {
               items: 2
           },
           1360: {
               items: 3
           }
       }
   });
   
   // Owl 2
   $('.owl-carousel.owl-2').owlCarousel({
       loop: true,
       lazyLoad: true,
       margin: 40,
       center: false,
       nav: true,
       fade: true,
       autoplay: false,
       autoplayTimeout: 4000,
       dots: false,
       responsive: {
           0: {
               items: 1
           },
           600: {
               items: 2
           },
           1000: {
               items: 3
           },
           1200: {
               items: 3
           },
           1360: {
               items: 3
           }
       },
       navText: ["<img src='<?php echo IMAGE_PATH?>arrowright.svg' width='50px' height='50px'  />",
           "<img src='<?php echo IMAGE_PATH?>arrowright.svg' width='50px' height='50px'  />"
       ]
   });
   
   // Owl 3
   $('.owl-carousel.owl-3').owlCarousel({
       loop: false,
       lazyLoad: true,
       margin: 30,
       center: false,
       nav: true,
       fade: true,
       autoplay: false,
       autoplayTimeout: 4000,
       dots: false,
       responsive: {
           0: {
               items: 1,
               stagePadding: 50,
           },
           600: {
               items: 2,
               stagePadding: 16,
           },
           1000: {
               items: 3
           },
           1200: {
               items: 4,
               stagePadding: 0,
           },
           1360: {
               items: 4
           }
       }
   });
   
   $('.owl-carousel.test_carousel').owlCarousel({
       loop: true,
       lazyLoad: true,
       stagePadding: 0,
       margin: 30,
       center: false,
       nav: false,
       fade: true,
       autoplay: true,
       autoplayTimeout: 5000,
       dots: true,
       dotsEach: true,
       responsive: {
           0: {
               items: 1,
           },
           600: {
               items: 1,
           },
           1000: {
               items: 2
           },
           1200: {
               items: 3,
           },
           1360: {
               items: 3
           }
       },
       navText: ["<img src='<?php echo IMAGE_PATH?>left_arrow.png' width='60px' height='60px'  />",
           "<img src='<?php echo IMAGE_PATH?>right_arrow.png' width='60px' height='60px'  />"
       ]
   });
</script>
<script>
   $(document).ready(function() {
       $('#signUp-tab, #signIn-tab, #employer-signIn-tab, #employer-signUp-tab').on('click', function() {
           $('.left_top-h1, .left_top-h2').toggleClass(
               'active');
       });
   
       $(function() {
           $('#datePicker2').datepicker({
               format: 'dd-mm-yyyy',
               singleDatePicker: true,
               showDropdowns: true,
               // endDate: new Date(),
               autoclose: true,
           });
       });
   });
   
   function show_password() {
       var x = document.getElementById("exampleInputPassword1");
       var show_hide_pass = document.getElementById("eye-show-close-one");
       if (x.type === "password") {
           x.type = "text";
           show_hide_pass.classList.add("fa-eye-slash");
           show_hide_pass.classList.remove("fa-eye")
       } else {
           x.type = "password";
           show_hide_pass.classList.add("fa-eye");
           show_hide_pass.classList.remove("fa-eye-slash")
       }
   };
   
   function show_password_two() {
       var x = document.getElementById("exampleInputPassword2");
       var show_hide_pass = document.getElementById("eye-show-close-two");
       if (x.type === "password") {
           x.type = "text";
           show_hide_pass.classList.add("fa-eye-slash");
           show_hide_pass.classList.remove("fa-eye")
       } else {
           x.type = "password";
           show_hide_pass.classList.add("fa-eye");
           show_hide_pass.classList.remove("fa-eye-slash")
       }
   };
   
   function show_password_three() {
       var x = document.getElementById("exampleInputPassword3");
       var show_hide_pass = document.getElementById("eye-show-close-three");
       if (x.type === "password") {
           x.type = "text";
           show_hide_pass.classList.add("fa-eye-slash");
           show_hide_pass.classList.remove("fa-eye")
       } else {
           x.type = "password";
           show_hide_pass.classList.add("fa-eye");
           show_hide_pass.classList.remove("fa-eye-slash")
       }
   };
   
   function show_password_four() {
       var x = document.getElementById("exampleInputPassword4");
       var show_hide_pass = document.getElementById("eye-show-close-four");
       if (x.type === "password") {
           x.type = "text";
           show_hide_pass.classList.add("fa-eye-slash");
           show_hide_pass.classList.remove("fa-eye")
       } else {
           x.type = "password";
           show_hide_pass.classList.add("fa-eye");
           show_hide_pass.classList.remove("fa-eye-slash")
       }
   };
</script>
</body>
</html>
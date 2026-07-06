<main class="blogs blogssec bg-white our_bogs">

<div class="header">
    <div class="inner-header flex">
        <h1 class="font-judul mt-3">- Hubungi Kami -</h1>
    </div>
    <!--Waves Container-->
    <div>
        <svg class="waves" xmlns="loginhttp://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
        </svg>
    </div>
    <!--Waves end-->
</div>

<div class="container">
   <div class="row align-items-center">
      <div class="col-md-12">
        <nav aria-label="breadcrumb">
           <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="<?php echo base_url()?>">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Kontak</li>
         </ol>
       </nav>
      </div>
   </div>
</div>

<!-- Map Frame -->
<section class="map_section position-relative bg-light py-md-5 py-3">
   <div class="container">
      <div class="row align-items-center">
         <div class="col-lg-6 d-flex align-items-center">
            <div class="contact_details pl-md-5 mt-md-0 mt-3 wow fadeInUp">
            <div class="d-flex align-items-center flex-column text-center">
               <div>
                  <i class="fa fa-envelope"></i>
               </div>
               <div>
                  <a href="mailto:admin@banisulaiman.or.id">
                     admin@banisulaiman.or.id
                  </a>
               </div>
               <br>
               <div>
                  <i class="fa fa-whatsapp"></i>
               </div>
               <div class="mt-2">
                  <a href="https://wa.me/6285183212024?text=Bismillah,%20Assalamualaikum" target="_blank">
                     +62 851-8321-2024
                  </a>
               </div>
               <br>
               <div>
                  <i class="fa fa-whatsapp"></i>
               </div>
               <div class="mt-2">
                  <a href="https://wa.me/6281572014321?text=Bismillah,%20Assalamualaikum" target="_blank">
                     +62 815-7201-4321
                  </a>
               </div>
            </div>

               <div class="d-flex">
                  <!-- <div>
                     <i class="fa fa-map-marker"></i>
                  </div> -->
                  <div class="text-center">
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
         <div class="col-lg-6 px-md-0">
            <div class="map_frame_box wow fadeInUp">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d472.0371105305936!2d107.61544543400078!3d-6.867006947296926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6e0b29aeb69%3A0x33acbf46ca35a161!2sMasjid%20Bani%20Sulaiman!5e0!3m2!1sid!2sid!4v1736053625572!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
         </div>
      </div>
   </div>
</section>
<!-- === -->
<!--send contact us -->
<script type="text/javascript">
   var controller = 'Welcome';
   var base_url = '<?php echo site_url(); //you have to load the "url_helper" to use this function ?>';
   
   $("#sendContactUs").on('submit', function(e){
   
   $('.contact_form_fa_spin_icon').html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>\n');
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
           processData:false,
           'dataType': "json",
           'success': function (data) {
               if (data.status == 200) {
   	$(".contact_us_button").attr("disabled", false);
                   $('.contact_form_fa_spin_icon').html('');
                   window.location.href = base_url+"thank-you";
   
   
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
   function myFunction() {
       var x = document.getElementById("myDIV");
       if (x.style.display === "none") {
           x.style.display = "block";
       } else {
           x.style.display = "none";
       }
   }
   
</script>

</main>
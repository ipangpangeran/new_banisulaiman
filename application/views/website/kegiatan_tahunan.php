<main class="blogs blogssec bg-white our_bogs">

<div class="header">
    <div class="inner-header flex">
        <h1 class="font-judul mt-3">Kegiatan Tahunan</h1>
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
            <li class="breadcrumb-item"><a href="<?php echo base_url()?>kegiatan">Kegiatan</a></li>
            <li class="breadcrumb-item active" aria-current="page">
               Kegiatan Tahunan
            </li>
         </ol>
       </nav>
      </div>
   </div>
</div>

<section class="plolitical-service pb-5">
   <div class="container pb-5">
      <div class="row align-items-center">
         <div class="col-md-6 d-flex align-items-center">
            <div>
               <h3 class="font-weight-bold mb-3">Musabaqah</h3>
               <p>
                  Lorem ipsum odor amet, consectetuer adipiscing elit.
               </p>
            </div>
         </div>
         <div class="col-md-4 mx-auto my-4">
            <div class="dg-image_box">
               <img src="<?php echo IMAGE_PATH?>musabaqah.jpg" alt="wave" class=" w-100 dg_images">
            </div>
         </div>

         <div class="col-md-4 mx-auto my-4">
            <div class="dg-image_box">
               <img src="<?php echo IMAGE_PATH?>wisuda.jpg" alt="wave" class=" w-100 dg_images">
            </div>
         </div>
         <div class="col-md-6 my-4 d-flex align-items-center">
            <div>
               <h3 class="font-weight-bold mb-3">Wisuda</h3>
               <p>
                  Lorem ipsum odor amet, consectetuer adipiscing elit.
               </p>
               <!-- <a href="<?php echo base_url()?>blogs" class="btn btn-primary btn-primary_common text-right mt-4">
               View Details
               </a> -->
            </div>
         </div>

         <div class="col-md-6 my-4 d-flex align-items-center">
            <div>
               <h3 class="font-weight-bold mb-3">Dauroh</h3>
               <p>
                  Lorem ipsum odor amet, consectetuer adipiscing elit.
               </p>
           </div>
         </div>
            <div class="col-md-4 mx-auto my-4">
               <div class="dg-image_box">
                  <img src="<?php echo IMAGE_PATH?>dauroh.jpg" alt="wave" class=" w-100 dg_images">
               </div>
         </div>
      </div>
   </div>
</section>
</main>

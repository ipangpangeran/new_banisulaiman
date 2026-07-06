<style type="text/css">
    .our_bogs::before{
    position: absolute;
    content: '';
    width: 100%;
    height: 120px;
    background: url("<?php echo IMAGE_PATH?>bg_banner.png");
    top: 100px;
    background-position: -2px center;
}
#header{
    z-index: 999;
}
.blogs .header {
    position: relative;
    text-align: center;
    background: linear-gradient(60deg,rgb(0, 119, 30) 0%, #1D263A 100%);
    color: white;
}
.btn-primary.disabled, .btn-primary:disabled{
    background-color: #E2448C;
    border-color:#E2448C;
}
.logo {
    width: 50px;
    fill: white;
    padding-right: 15px;
    display: inline-block;
    vertical-align: middle;
}

.inner-header {
    height: 9vh;
    width: 100%;
    margin: 0;
    padding: 0;
}

.flex {
    /*Flexbox for containers*/
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.waves {
    position: relative;
    width: 100%;
    height: 15vh;
    margin-bottom: -7px;
    /*Fix for safari gap*/
    min-height: 100px;
    max-height: 150px;
}

.content {
    position: relative;
    height: 20vh;
    text-align: center;
    background-color: white;
}

/* Animation */

.parallax>use {
    animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax>use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}

.parallax>use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}

.parallax>use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}

.parallax>use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}

.latest__blog_card {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

/* .breadcrumb {
    background-color: transparent;
} */

.breadcrumb-item+.breadcrumb-item {
    padding-left: .5rem;
}

.breadcrumb-item a {
    text-decoration: none;
    color: #212529;
}

.breadcrumb-item.active {
    color: #f9ad59;
}

.breadcrumb-item+.breadcrumb-item::before {
    content: "➔";
}

.btn-readmore {
    color: #fff;
    background-color: #0262d3;
    padding: 4px 8px;
    text-decoration: none;
    border-radius: 4px;
    border: 1px solid #0262d3;
}

/* ---css for blogs--- */

.all-blog-cards {
    height: 510px;
    border-radius: 14px;
    -webkit-box-shadow: 12px 15px 20px 0px rgb(46 61 73 / 15%);
    box-shadow: 12px 15px 20px 0px rgb(46 61 73 / 15%);
    -webkit-transition: -webkit-transform .2s;
    transition: -webkit-transform .2s;
    -o-transition: transform .2s;
    transition: transform .2s;
    transition: transform .2s, -webkit-transform .2s;
}

.all-blog-cards:hover {
    -webkit-box-shadow: 2px 4px 8px 0 rgb(46 61 73 / 20%);
    box-shadow: 2px 4px 8px 0 rgb(46 61 73 / 20%);
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1.05);
}
.sharelinks-blogs {
    position: absolute;
    bottom: 4px;
    right: 0;
}

.latest__blog_card:hover {
    transform: scale(1.05);
}

.latest__blog_card {
    border: 0;
    border-radius: 0;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    transform: scale(1);
    transition: 0.3s all;
}

.latest__blog_card .card-image-top {
    height: 230px;
}

.social-icons-div {
    top: 10px;
    left: 10px;
    position: absolute;
    padding: .5rem;
    background-color: #362D62;
    border-radius: 3px;
    opacity: 0;
    transition: 0.3s ease-in;
}

.social-icons-div ul li {
    margin-bottom: .4rem;
}
.blog-footer {
    padding-left: 1.25rem;
    border-top: 1px solid #C4C4C429;
}

.blog-footer p {
    color: #474F57;
    font-weight: 500;
}

.latest__blog_card:hover .social-icons-div {
    opacity: 1;
}

.blog-titles {
    display: inline-block;outlineBtn
    font-size: 16px;
    color: #000000;
    font-weight: 700 !important;
}

a,
i,
span {
    display: inline-block;
    text-decoration: none;
    -webkit-transition: all .3s;
    transition: all .3s;
}

.card-body.all-card-box.p-2{
    max-height: 239px;
    overflow: hidden;
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }

    100% {
        transform: translate3d(85px, 0, 0);
    }
}

@media (min-width: 992px) {
    .all-blog-cards {
        height: 560px;
    }
}

@media (min-width: 1200px) {
    .all-blog-cards {
        height: 500px;
    }
}

@media (max-width: 1024px) {
    .inner-header {
    height: 9vh;
}
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
    .waves {
        height: 40px;
        min-height: 40px;
    }

    .content {
        height: 30vh;
    }

    h1 {
        font-size: 24px;
    }
}
</style>

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
   <div class="row">
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
      <div class="row">

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
               <a href="<?php echo base_url()?>blogs" class="btn btn-primary btn-primary_common text-right mt-4">
               View Details
               </a>
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

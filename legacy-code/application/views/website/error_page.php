 <style>
	*,body{
		margin: 0;
		padding: 0;
	}
	.context {
		width: 100%;
		position: absolute;
		top:50vh;
		z-index: 1;
	}
	.context h1{
		text-align: center;
		color: #ffffff;
		font-size: 50px;
	}
	.context p {
        color:#ffffff;
		text-align: center;
		font-size: 26px;
	}
	.area{
	    background: -webkit-gradient(linear, left top, left bottom, color-stop(-70%, #007BB9), color-stop(55%, #007BBc), color-stop(80%,  #007BBc), to(transparent));
        background: linear-gradient(to bottom, #007BB9 -70%,  #007BBc 55%,  #007BBc 80%, transparent);
		width: 100%;
		height:100vh;
	}
	.circles{
		position: absolute;
		bottom:0;
		left: 0;
		width: 100%;
		height: calc(100vh - 88.38px);
		overflow: hidden;
	}
	.circles li{
		position: absolute;
		display: block;
		list-style: none;
		width: 20px;
		height: 20px;
		background: rgba(255, 255, 255, 0.5);
		animation: animate 25s linear infinite;
		bottom: -150px;

	}
	.circles li:nth-child(1){
		left: 25%;
		width: 80px;
		height: 80px;
		animation-delay: 0s;
		border-radius: 50%;
	}
	.circles li:nth-child(2){
		width: 0;
		height: 0;
		border-left: 50px solid transparent;
		border-right: 50px solid transparent;
		border-bottom: 50px solid rgba(255, 255, 255, 0.2);
		left: 10%;
		animation-delay: 2s;
		animation-duration: 12s;
		background-color: transparent;
	}
	.circles li:nth-child(3){
		left: 70%;
		width: 20px;
		height: 20px;
		animation-delay: 4s;
	}
	.circles li:nth-child(4){
		left: 40%;
		width: 60px;
		height: 60px;
		animation-delay: 0s;
		animation-duration: 18s;
	}
	.circles li:nth-child(5){
		width: 100px;
		height: 50px;
		transform: skew(20deg);
		background: rgba(255, 255, 255, 0.2);
		left: 65%;
		animation-delay: 0s;
	}
	.circles li:nth-child(6){
		left: 75%;
		width: 110px;
		height: 110px;
		animation-delay: 3s;
	}
	.circles li:nth-child(7){
		left: 35%;
		width: 150px;
		height: 150px;
		animation-delay: 7s;
	}
	.circles li:nth-child(8){
		left: 50%;
		width: 25px;
		height: 25px;
		animation-delay: 15s;
		animation-duration: 45s;
	}
	.circles li:nth-child(9){
		left: 20%;
		width: 15px;
		height: 15px;
		animation-delay: 2s;
		animation-duration: 35s;
	}
	.circles li:nth-child(10){
		border-bottom: 50px solid rgba(255, 255, 255, 0.2);
		border-left: 25px solid transparent;
		border-right: 25px solid transparent;
		height: 0;
		width: 125px;
		left: 85%;
		animation-delay: 0s;
		animation-duration: 11s;
		background-color: transparent;
	}
	.mx-auto{
        margin-left: auto;
		margin-right: auto;
	}
	.btn-back{
		color: white !important;
		background: #0C0A19;
		padding:8px 15px;
		border-radius: 2px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		text-decoration: none;
	}
	.text-error{
		width: 75%;
		margin: auto;
		margin-bottom: 2%;
	}

	@keyframes animate {
		0%{
			transform: translateY(0) rotate(0deg);
			opacity: 1;
			border-radius: 0;
		}
		100%{
			transform: translateY(-1000px) rotate(720deg);
			opacity: 0;
			border-radius: 50%;
		}
		}
	.page-footer {
		position: relative;
		 top: 10px !important;
	}
	@media (max-width: 767px) {
		.context{
			top: 25vh;
		}
		.area {
			height: 100vh;
		}
		.circles {
			height: 64%;
		}
		.text-error{
			width: 100%;
			margin: auto;
			margin-bottom: 2%;
		}
       .btn-back {
           font-size: .8rem;
       }
	}

</style>

	<div class="context">
		<div class="col-12">
			<div class="row">
				<div class="col-12">
					<h1 class="text-center">
						<strong>
							404
						</strong>
					</h1>
				</div>
				<div class="col-12">
					<p class="text-center text-error">
						The page you’re trying to access doesn’t appear to exist. Please check the entered address and try again or go to the homepage.
					</p>
				</div>
				<div class="col-12 text-center mx-auto">
					<a href="<?php echo base_url()?>" type="button" class="btn btn-primary btn-back btn-common">
						GO BACK TO HOME PAGE
					</a>
				</div>
			</div>
		</div>
	</div>


	<div class="area" >
		<ul class="circles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div >

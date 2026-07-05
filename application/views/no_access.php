<style type="text/css">

    @media only screen and (max-width : 740px) {
        #example {
            overflow-x: scroll;
            max-width: 50%;
            display: block;
        }
    }
</style>
<!-- start:wrapper -->
<div id="wrapper">

<?php include('menu.php');?>

    <!-- start:main -->
    <div class="container">
        <div id="main">
            <!-- start:breadcrumb -->
            <ol class="breadcrumb breadcrumb-primary">
                <li><a href="<?php echo base_url()?>Dashboard/home">Dashboard</a></li>
                <li class="active">No Access</li>
            </ol>
            <!-- end:breadcrumb -->


            <?php
            $success_message = $this->session->flashdata('success_message');
            ?>
            <?php
            $error_message = $this->session->flashdata('error_message');
            ?>

            <?php
            if (isset($success_message)) {

                echo " <div class=\"alert alert-success alert-square alert-dismissable\">
        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>
        <strong>Success!</strong> $success_message
    </div>";
            }
            unset($_SESSION['success_message']);
            ?>


            <?php
            if (isset($error_message)) {

                echo " <div class=\"alert alert-danger alert-square alert-dismissable\">
        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\"><i class=\"fa fa-times\"></i></button>
        <strong>Warning!</strong> $error_message
        </div>";
            }
            unset($_SESSION['error_message']);
            ?>
            <div class="row">
                <div class="col-lg-12">
                    <h2 class="page-header">
                        Permission Denied !
                        </h2>
                </div>
            </div>
            <!-- start:dynamic data table -->
            <div class="row">
                <div class="col-lg-12">
                    <section class="panel">
                        
                        <div class="panel-body">

                            <div class="adv-table">
                                <div class="row">
                                    <h3 style="text-align: center">You Don't Have Permission To Access</h3>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <!-- end:dynamic data table -->

        </div>
    </div>
    <!-- end:main -->

</div>

<div class="footer py-0 py-md-2 mt-4 d-none">
    <div class="container py-0">
        <div class="row">
            <div class="col-md-12 text-center footer__text">
                <?php
                $help_detail = $this->Generic_model->getGenericData('help_desk', array('company_id' => $this->company_id));
                if ($help_detail) {
                    echo '<p class="text-black mb-0"><b>Help Desk :</b> <span> '.$help_detail[0]->help_desk_content.' </span></p>';
                } else {
                    echo '<p class="text-black mb-0"><b>Help Desk :</b> </p>';
                }
                ?>
            </div>
        </div>
    </div>
</div>

<!-- change password -->
<div class="modal fade" id="change_password" style="background: rgba(46, 29, 204, 0.14)">
    <div class="modal-dialog modal-md custom-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-content">Change Password</h5>
                <button type="button" class="close modal_close_btn" data-dismiss="modal">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">Close</span>
                </button>
            </div>
            <form id="change_password_form">
                <div class="modal-body">
                    <div class="row">
                        <div class="col col-lg-12 pr-4">
                            <div class="row pt-4">
                                <div class="col col-sm-12">
                                    <div class="group">
                                        <label class="lables">Old Password <span class="text-danger">*</span></label>
                                        <input type="password" name="old_password" class="form-control formC topf old_pass" required>
                                        <span class="highlight"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col col-sm-12">
                                    <div class="group">
                                        <label class="lables">New Password <span class="text-danger">*</span></label>
                                        <input type="password" name="new_password" class="form-control formC topf new_pass" required>
                                        <span class="highlight"></span>
                                        <span class="text-danger" style="font-size: 12px">Enter a combination of at least five numbers, letters and punctuation marks (like ! and &).</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-sm-12">
                                    <div class="group">
                                        <label class="lables">Confirm Password <span class="text-danger">*</span></label>
                                        <input type="password" name="confirm_password" class="form-control formC topf con_pass" required>
                                        <span class="highlight"></span>
                                    </div>
                                </div>
                            </div>
                            <span class="change_pass_error text-danger"></span>
                            <div class="col-md-12 text-center update-pass">
                                <button type="submit" class="btn mt-3 btn2 change_password_btn btn-info">Update Password <span class="change_pass_fa_spin_icon"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="border:none;"></div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="change_password_emp" style="background: rgba(46, 29, 204, 0.14)">
    <div class="modal-dialog modal-md custom-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title p-2">Change Password</h5>
                <button type="button" class="close modal_close_btn" data-dismiss="modal">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">Close</span>
                </button>
            </div>
            <form id="change_password_form_emp">
                <div class="modal-body">
                    <div class="row">
                        <div class="col col-lg-12 pr-4">
                            <div class="row pt-4">
                                <div class="col col-sm-12">
                                    <div class="group">
                                        <label class="lables">Old Password <span class="text-danger">*</span></label>
                                        <input type="password" name="old_password" class="form-control formC topf old_pass" required>
                                        <span class="highlight"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-sm-12">
                                    <div class="group">
                                        <label class="lables">New Password <span class="text-danger">*</span></label>
                                        <input type="password" name="new_password" class="form-control formC topf new_pass" required>
                                        <span class="highlight"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-sm-12">
                                    <div class="group">
                                        <label class="lables">Confirm Password <span class="text-danger">*</span></label>
                                        <input type="password" name="confirm_password" class="form-control formC topf con_pass" required>
                                        <span class="highlight"></span>
                                    </div>
                                </div>
                            </div>
                            <span class="change_pass_error text-danger"></span>
                            <div class="col-md-12 text-center update-pass">
                                <button type="submit" class="btn mt-3 btn2 change_password_btn reset_password_btn">Update Password <span class="change_pass_fa_spin_icon"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="border:none;"></div>
            </form>
        </div>
    </div>
</div>

<!--change password-->
<script>
    var controller = 'Dashboard';
    var base_url = '<?php echo site_url(); //you have to load the "url_helper" to use this function ?>';
    $(document).ready(function() {
        <!--change password-->
        $("#change_password_form").on('submit', function (e) {
            $('.change_pass_error').html('');
            $('.change_pass_fa_spin_icon').html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>\n');
            $(".change_password_btn").attr("disabled", true);
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: base_url + controller + '/change_password',
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                'dataType': "json",
                success: function (data) {
                    if (data.status == 200) {
                        $("#change_password_form")[0].reset();
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

        $("#change_password_form_emp").on('submit', function (e) {
            $('.change_pass_error').html('');
            $('.change_pass_fa_spin_icon').html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>\n');
            $(".change_password_btn").attr("disabled", true);
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: base_url + controller + '/change_password_emp',
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                'dataType': "json",
                success: function (data) {
                    if (data.status == 200) {
                        $("#change_password_form")[0].reset();
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
    });
</script>
<script src="<?php echo JS_PATH. 'modernizr.min.js' ?>"></script>
<script src="<?php echo JS_PATH. 'moment.min.js' ?>"></script>
<script src="<?php echo JS_PATH. 'popper.min.js' ?>"></script>
<script src="<?php echo JS_PATH. 'bootstrap.min.js' ?>"></script>
<script src="<?php echo JS_PATH. 'detect.js' ?>"></script>
<script src="<?php echo JS_PATH. 'fastclick.js' ?>"></script>
<script src="<?php echo JS_PATH. 'admin.js' ?>"></script>
<script src="<?php echo JS_PATH. 'jquery.blockUI.js' ?>"></script>
<script src="<?php echo JS_PATH. 'jquery.nicescroll.js' ?>"></script>
<!--<script src="<?php /*echo PLUGIN_PATH */?>chart.js/Chart.min.js"></script>
<script src="<?php /*echo ASSETS_PATH */?>data/data_charts.js"></script>-->


<!-- BEGIN Java Script for this page -->
<script src="<?php echo PLUGIN_PATH. 'star-rating/js/star-rating.js' ?>"></script>
<script src="<?php echo JS_PATH. 'theme.min.js' ?>"></script>

<!--filer js-->
<script src="<?php echo PLUGIN_PATH ?>jquery.filer/js/jquery.filer.min.js"></script>

<!--datepicker-->
<script src="<?php echo PLUGIN_PATH ?>datetimepicker/js/daterangepicker.js"></script>




<!--timepicker-->
<script src="<?php echo JS_PATH ?>gijgo.min.js"></script>


<!--color picker js-->
<script src="<?php echo PLUGIN_PATH ?>colorpicker/bootstrap-colorpicker.min.js"></script>

<script src="<?php echo PLUGIN_PATH ?>trumbowyg/trumbowyg.min.js"></script>
<!-- 
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/js/select2.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script> -->
<!--datepicker-->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<!--Datepicker-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js" integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ==" crossorigin="anonymous"></script>
<script src="<?php echo JS_PATH. 'jssocials' .JS_EXT?>"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<script>
    $(document).ready(function () {
        'use strict';
        $('.editor,.template_to_emp').trumbowyg();
    });
</script>

<!--Appraisal cycle-->
<script>
    //Example 1
    $("#filer_appraisal").filer({
        limit: null,
        maxSize: null,
        extensions: null,
        changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"><i class="icon-jfi-cloud-up-o"></i></div><div class="jFiler-input-text"><h3>Drag & Drop files here</h3> <span style="display:inline-block; margin: 15px 0">or</span></div><a class="jFiler-input-choose-btn btn btn-custom">Browse Files</a></div></div>',
        showThumbs: true,
        theme: "dragdropbox",
        templates: {
            box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
            item: '<li class="jFiler-item">\
                        <div class="jFiler-item-container">\
                            <div class="jFiler-item-inner">\
                                <div class="jFiler-item-thumb">\
                                    <div class="jFiler-item-status"></div>\
                                    <div class="jFiler-item-info">\
                                        <span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name | limitTo: 25}}</b></span>\
                                        <span class="jFiler-item-others">{{fi-size2}}</span>\
                                    </div>\
                                    {{fi-image}}\
                                </div>\
                                <div class="jFiler-item-assets jFiler-row">\
                                    <ul class="list-inline pull-left">\
                                        <li>{{fi-progressBar}}</li>\
                                    </ul>\
                                    <ul class="list-inline pull-right">\
                                        <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                                    </ul>\
                                </div>\
                            </div>\
                        </div>\
                    </li>',
            itemAppend: '<li class="jFiler-item">\
                            <div class="jFiler-item-container">\
                                <div class="jFiler-item-inner">\
                                    <div class="jFiler-item-thumb">\
                                        <div class="jFiler-item-status"></div>\
                                        <div class="jFiler-item-info">\
                                            <span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name | limitTo: 25}}</b></span>\
                                            <span class="jFiler-item-others">{{fi-size2}}</span>\
                                        </div>\
                                        {{fi-image}}\
                                    </div>\
                                    <div class="jFiler-item-assets jFiler-row">\
                                        <ul class="list-inline pull-left">\
                                            <li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
                                        </ul>\
                                        <ul class="list-inline pull-right">\
                                            <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </div>\
                        </li>',
            progressBar: '<div class="bar"></div>',
            itemAppendToEnd: false,
            removeConfirmation: true,
            _selectors: {
                list: '.jFiler-items-list',
                item: '.jFiler-item',
                progressBar: '.bar',
                remove: '.jFiler-item-trash-action'
            }
        },
        dragDrop: {
            dragEnter: null,
            dragLeave: null,
            drop: null,
        },
        uploadFile: {
            url: "assets/plugins/jquery.filer/html/upload.html",
            data: null,
            type: 'POST',
            enctype: 'multipart/form-data',
            beforeSend: function () { },
            success: function (data, el) {
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                    $("<div class=\"jFiler-item-others text-success\"><i class=\"fas fa-plus\"></i> Success</div>")
                        .hide().appendTo(parent).fadeIn("slow");
                });
            },
            error: function (el) {
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                    $("<div class=\"jFiler-item-others text-error\"><i class=\"fas fa-minus\"></i> Error</div>")
                        .hide().appendTo(parent).fadeIn("slow");
                });
            },
            statusCode: null,
            onProgress: null,
            onComplete: null
        },
        /*files: [{
         name: "1.jpg",
         size: 145,
         type: "image/jpg",
         file: "assets/images/sample-image-1.jpg"
         },
         {
         name: "2.jpg",
         size: 145,
         type: "image/jpg",
         file: "assets/images/sample-image-2.jpg"
         }
         ],*/
        addMore: false,
        clipBoardPaste: true,
        excludeName: null,
        beforeRender: null,
        afterRender: null,
        beforeShow: null,
        beforeSelect: null,
        onSelect: null,
        afterShow: null,
        onRemove: function (itemEl, file, id, listEl, boxEl, newInputEl, inputEl) {
            var file = file.name;
            $.post('assets/plugins/jquery.filer/html/remove_file.html', {
                file: file
            });
        },
        onEmpty: null,
        options: null,
        captions: {
            button: "Choose Files",
            feedback: "Choose files To Upload",
            feedback2: "files were chosen",
            drop: "Drop file here to Upload",
            removeConfirmation: "Are you sure you want to remove this file?",
            errors: {
                filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
                filesType: "Only Images are allowed to be uploaded.",
                filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
                filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
            }
        }
    });
</script>
<!--Appraisal cycle-->

<!--colorpicker script-->
<script>
    $('#dashboard-color,#pending-color,#approved-color,#declined-color').colorpicker();
</script>
<!--colorpicker script-->

<!--Datepicker-->
<script>
    $(document).ready(function() {

       /* var d = new Date();
        var todayDate = '' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();*/
        var today = moment();
        var legalWorkingDate = moment().subtract(10, 'years');
        //datepicker for modal

        $('input[name="edit-doh"],.emp-meeting,.manger-meeting').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            parentEl: '.date-range-picker-div',
            locale: {
                format: 'DD-MM-YYYY'
            },
            minDate: new Date(),
            /*maxDate: today,*/
            autoUpdateInput: false
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });
//input[name="doj"]
        $('.doj-add-users').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            parentEl: '.date-range-picker-doj',
            locale: {
                format: 'DD-MM-YYYY'
            },
            autoUpdateInput: false
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });
        $('.cycle_new_date_input').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            parentEl: '.cycle_modal',
            locale: {
                format: 'DD-MM-YYYY'
            },
            autoUpdateInput: false
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });
        $('.doj-edit-users').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            parentEl: '.date-range-picker-dojtwo',
            locale: {
                format: 'DD-MM-YYYY'
            },
            autoUpdateInput: false
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });

        /*Date of birth*/
        $('input[name="dob"]').daterangepicker({
            startDate: legalWorkingDate,
            singleDatePicker: true,
            showDropdowns: true,
            parentEl: '.date-range-picker-dob',
            locale: {
                format: 'DD-MM-YYYY'
            },
            minDate: '01/01/1930',
            maxDate: legalWorkingDate,
            autoUpdateInput: false
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });
        $('.dob-sub-edit').daterangepicker({
            startDate: legalWorkingDate,
            singleDatePicker: true,
            showDropdowns: true,
            parentEl: '.date-range-picker-dob-edit',
            locale: {
                format: 'DD-MM-YYYY'
            },
            minDate: '01/01/1930',
            maxDate: legalWorkingDate,
            autoUpdateInput: false
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });

        $('input[name="userDob"]').daterangepicker({
            startDate: legalWorkingDate,
            singleDatePicker: true,
            showDropdowns: true,
            parentEl: '.date-range-picker-userdob',
            locale: {
                format: 'DD-MM-YYYY'
            },
            minDate: '01/01/1930',
            maxDate: legalWorkingDate,
            autoUpdateInput: false
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });

        //not for modal


        $('.edit-company-dob').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: 'DD-MM-YYYY'
            },
            minDate: '01/01/1930',
            /*maxDate: today,*/
            autoUpdateInput: false,
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });

        $('input[name="established_date"],input[name="goal_freeze_time"],input[name="rating_freeze_time"],.cycle_date_picker').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: 'DD-MM-YYYY'
            },
            minDate: new Date(),
            /*maxDate: today,*/
            autoUpdateInput: false,
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });

        /*Date of Birth*/
        $('.edit-company-dob').daterangepicker({
            startDate: legalWorkingDate,
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: 'DD-MM-YYYY'
            },
            minDate: '01/01/1930',
            maxDate: legalWorkingDate,
            autoUpdateInput: false,
        }).on("apply.daterangepicker", function (e, picker) {
            picker.element.val(picker.startDate.format(picker.locale.format));
        });

        //gigjgo timepicker

        $('.emp-time,.manager-time').timepicker({
            uiLibrary: 'bootstrap4',
            iconsLibrary: 'fontawesome',
            icons: {
                rightIcon: '<i class="far fa-clock"></i>'
            },
            mode: '24hr',
            modal: true
        });
    });
</script>

<!--tooltip-->
<script>
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover()
    })
</script>

<script>
    $(document).ready(function() {
        $('.js-example-basic-search').select2({
            dropdownParent: $('.search_parent_body_one')
        });
    });
    $(document).ready(function() {
        $('.js-example-basic-normal').select2();
    });
</script>

<!--[if IE 9]>
<script src="https://cdn.jsdelivr.net/gh/coliff/bootstrap-ie8/js/bootstrap-ie9.min.js"></script>
<script>
    function placeholderIsSupported() {
        var test = document.createElement('input');
        return ('placeholder' in test);
    }

    if(!placeholderIsSupported()) {
        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
</script>
<![endif]-->


<!--Star rating employee feedback-->
<script>
    jQuery(function ($) {
        $('.fa-theme').rating({
            theme: 'krajee-fas'
        });
    });
    /*$('.feedback-upload').click(function() {
        /!*if(window.width <=768) {
           $('.getting-feedback_container')css('position','relative');
           $('.getting-feedback_container')css('z-index','12');
            setTimeout(function() {
                $('.modal-backdrop').css('z-index','9999');
                $('.modal-backdrop').css('display','none');
                $('.goal-attachment_modal .modal-dialog').css('z-index','999999');
                $('.goal-attachment_modal').css('z-index','999999');

            },100);
        }*!/
            $('.modal-backdrop').css('display', 'none');

    });*/
    // year picker
    $(".leave_year").datepicker( {
        format: " yyyy",  //see there is extra space in format, dont remove it
        viewMode: "years",
        endDate: new Date(),
        autoclose: true,
        minViewMode: "years",
    });
</script>

<!--<script>-->
<!--    $(document).ready(function(){-->
<!--       const newHeight = $(".div-height").height();-->
<!--        $(".heightid").height(newHeight);-->
<!--    });-->
<!--</script>-->

</body>
</html>

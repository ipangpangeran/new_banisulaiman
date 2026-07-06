<!DOCTYPE html  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="UTF-8" />
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="img/tech_jobs_logo.144x144.png" rel="apple-touch-icon" type="image/png" sizes="144x144">
	<link href="img/tech_jobs_logo.png" rel="apple-touch-icon" type="image/png" sizes="114x114">
	<link href="img/tech_jobs_logo.png" rel="apple-touch-icon" type="image/png" sizes="72x72">
	<link href="img/tech_jobs_logo.png" rel="apple-touch-icon" type="image/png">
	<link href="img/tech_jobs_logo.png" rel="icon" type="image/png">
	<link href="img/favicon.ico" rel="shortcut icon">
    <!--[if gte mso 7]><xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml><![endif]-->

      <!-- Open Sans -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap');
        a {
            text-decoration: none;
        }

        html,
        body {
            margin: 0 !important;
            padding: 10px 0 !important;
            height: 100% !important;
            width: 100% !important;
        }
        


        /* Stop Outlook resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
              font-family: 'Open Sans',
    "Helvetica Neue" ,sans-serif !important;
        }

        /* Stop Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0 !important;
            mso-table-rspace: 0 !important;
        }
        p{
            font-size: 18px;
            line-height: 1.4;
        }

        .text-color {
            color: #505050 !important;
        }

        .text-white {
            color: #fff;
        }

        .font-semi-bold {
            font-weight: 500 !important;
        }

        .my-0 {
            margin-top: 0;
            margin-bottom: 0;
        }

        .ml {
            margin-left: 30px;
        }

        /* Use a better rendering method when resizing images in Outlook IE. */
        img {
            -ms-interpolation-mode: bicubic;
        }

        /* Prevent Windows 10 Mail from underlining links. Styles for underlined links should be inline. */
        .color-white {
            color: #ffffff !important;
        }

        .color-a {
            color: #ffffff;
        }

        table.border-collapse {
            border-collapse: collapse !important;
        }

        @media only screen and (max-device-width: 640px) {

            /* tablet-larger phone CSS styles go here */
            .mob__padding {
                padding-left: 15px !important;
            }
        }
    </style>
</head>

<body
    style="color: #322f31 !important;margin: 0;background-color: #e7e9f5;padding: 10px 0;mso-line-height-rule: exactly;">

    <table role=“presentation” bgcolor="#fff" style="background-color: #fff" width="700" border="0" align="center"
        cellpadding="0" cellspacing="0">
        <!-- HEADER -->
        <tbody bgcolor="#fff">

            <tr>
                <td align="center">
                    <table bgcolor="#fff" style="position: relative;" class="col-700" width="700" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td>
                                    <table bgcolor="#fff" style="background-color: #fff;" class="col-700" width="700"
                                        border="0" align="left" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <td align="left" style="padding: 55px 90px 0px 90px;">
                                                    <img src="<?php echo IMAGE_PATH?>tech_jobs_logo.png" height="auto" width="200" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            <tr>
                <td align="center" bgcolor="#FFFFFF" style="background-color: #FFFFFF">
                    <table bgcolor="#23233f" style="background-color: #23233f" class="col-700" width="700" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td>
                                    <table bgcolor="#FFFFFF" style="background-color: #FFFFFF;margin: 0;" class="col-700"
                                        width="700" border="0" align="left" cellpadding="0" cellspacing="0" border-spacing="0">
                                        <tr align="left">
                                            <td style="padding: 0 90px 40px 90px" align="left" width="100%">
                                                <h4 class="text-color font-semi-bold" style="font-size: 18px;margin-top: 18px;margin-bottom: 0px;">Your verification code is:</h4>
                                                 <p class="text-color" style="font-size: 28px; font-weight: 800; margin-top: 12px;margin-bottom: 12px;"><?php echo $otp?></p>
                                                <p class="text-color">Your account can’t be accessed without this verification code, even if you didn’t submit this request.</p>
                                                <p class="text-color"> To keep your account secure, we recommend using a unique password for your <?php echo WEBSITE_NAME?> account to sign in. </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

       
 
             
        </tbody>
    </table>
</body>

</html>
interface EmailTemplateParams {
  logoUrl?: string;
  companyName?: string;
  verifyEmailCode?: string;
  expiryTime?: string;
  userName?: string;
  reportButtonStatus?: Boolean;
  reportLink?: string;
}

const returnReportButton = (reportLink: string) => `
<table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad">
																			<div class="alignment" align="center"><a href=${reportLink} target="_blank" style="color:#ffffff;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.google.com/"  style="height:42px;width:98px;v-text-anchor:middle;" arcsize="22%" fillcolor="#3d496f">
<v:stroke dashstyle="Solid" weight="0px" color="#3d496f"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #3d496f; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 9px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span class="btn-pad" style="word-break: break-word; padding-left: 25px; padding-right: 25px; padding-top: 5px; padding-bottom: 5px; display: block;"><span style="word-break: break-word; line-height: 32px;">Report</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
																		</td>
																	</tr>
																</table>
`;

export default ({
  logoUrl = "https://08608989b4.imgdist.com/pub/bfra/4sssds1u/rf5/9tl/15h/LOGO.png",
  companyName = "",
  verifyEmailCode = "123456",
  expiryTime = "11 minutes",
  userName = "User",
  reportButtonStatus = false,
  reportLink = "https://www.google.com",
}: EmailTemplateParams = {}) => {
  let ignoreEmailMessage: string = reportButtonStatus
    ? "If you did not request this verification, please ignore this email or report it by clicking the button below."
    : "If you did not request this verification, please ignore this email. No further action is required.";

  return `
  <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!--><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:620px) {

			.desktop_hide table.icons-inner,
			.row-2 .column-1 .block-8.button_block .alignment .button,
			.row-3 .column-1 .block-2.button_block .alignment .button,
			.row-5 .column-1 .block-4.social_block .alignment table,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.row-2 .column-1 .block-5.paragraph_block td.pad>div,
			.row-2 .column-1 .block-6.paragraph_block td.pad>div,
			.row-2 .column-1 .block-9.paragraph_block td.pad>div,
			.row-3 .column-1 .block-1.paragraph_block td.pad>div,
			.row-4 .column-1 .block-4.paragraph_block td.pad>div,
			.row-4 .column-1 .block-6.paragraph_block td.pad>div {
				text-align: center !important;
				font-size: 16px !important;
			}

			.row-2 .column-1 .block-11.divider_block td.pad,
			.row-2 .column-1 .block-5.paragraph_block td.pad,
			.row-2 .column-1 .block-6.paragraph_block td.pad,
			.row-2 .column-1 .block-8.button_block td.pad,
			.row-2 .column-1 .block-9.paragraph_block td.pad,
			.row-3 .column-1 .block-1.paragraph_block td.pad,
			.row-3 .column-1 .block-2.button_block td.pad,
			.row-4 .column-1 .block-1.divider_block td.pad,
			.row-4 .column-1 .block-4.paragraph_block td.pad,
			.row-4 .column-1 .block-6.paragraph_block td.pad,
			.row-5 .column-1 .block-4.social_block td.pad {
				padding: 10px !important;
			}

			.row-2 .column-1 .block-3.heading_block h1 {
				font-size: 26px !important;
			}

			.row-2 .column-1 .block-8.button_block span,
			.row-3 .column-1 .block-2.button_block span {
				font-size: 16px !important;
				line-height: 32px !important;
			}

			.row-2 .column-1 .block-8.button_block .alignment,
			.row-3 .column-1 .block-2.button_block .alignment,
			.row-5 .column-1 .block-4.social_block .alignment {
				text-align: center !important;
			}

			.row-2 .column-1 .block-11.divider_block .alignment table,
			.row-4 .column-1 .block-1.divider_block .alignment table {
				display: inline-table;
			}

			.row-2 .column-1 .block-11.divider_block .alignment,
			.row-4 .column-1 .block-1.divider_block .alignment {
				text-align: center !important;
				font-size: 1px;
			}

			.row-4 .column-1 .block-3.heading_block h1,
			.row-4 .column-1 .block-5.heading_block h1 {
				font-size: 19px !important;
			}

			.row-4 .column-1 .block-2.heading_block h1 {
				font-size: 24px !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="margin: 0; background-color: #ffffff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #caeefe; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-bottom:20px;padding-top:20px;width:100%;">
																			<div class="alignment" align="center">
																				<div style="max-width: 133px;"><img src=${logoUrl} style="display: block; height: auto; border: 0; width: 100%;" width="133" alt title height="auto"></div>
																			</div>
																		</td>
																	</tr>
																</table>
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
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:35px;line-height:35px;font-size:1px;">&#8202;</div>
																<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;">
																			<div class="alignment" align="center">
																				<div style="max-width: 93px;"><img src="https://08608989b4.imgdist.com/pub/bfra/4sssds1u/xi2/zjk/qsp/Slogo.png" style="display: block; height: auto; border: 0; width: 100%;" width="93" alt title height="auto"></div>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="heading_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad">
																			<h1 style="margin: 0; color: #091f5c; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 38px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 46px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Verify Your Account</span></h1>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-4" style="height:6px;line-height:6px;font-size:1px;">&#8202;</div>
																<table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#091f5c;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																				<p style="margin: 0;">Hello ${userName},</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#091f5c;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;mso-line-height-alt:24px;">
																				<p style="margin: 0;">To finalize your account setup ${companyName ? "with" : ""} ${companyName}, we need to verify your identity. This ensures the highest level of security for your account and protects your personal information. Copy the verification code below or use it to verify your account.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-7" style="height:15px;line-height:15px;font-size:1px;">&#8202;</div>
																<table class="button_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad">
																			<div class="alignment" align="center">
                                      
                                      <span style="color:#ffffff;text-decoration:none;">
                                      
                                      <!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.google.com/"  style="height:50px;width:152px;v-text-anchor:middle;" arcsize="18%" fillcolor="#0095ff">
<v:stroke dashstyle="Solid" weight="0px" color="#0095ff"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:20px">
<![endif]--><span class="button" style="background-color: #0095ff; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 9px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 35px; font-weight: 700; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: 6px;"><span class="btn-pad" style="word-break: break-word; padding-left: 25px; padding-right: 25px; padding-top: 5px; padding-bottom: 5px; display: block;"><span style="word-break: break-word; line-height: 40px;">${verifyEmailCode}</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></span></div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-9" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#091f5c;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																				<p style="margin: 0;">This code will be valid only for ${expiryTime}.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-10" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
																<table class="divider_block block-11" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad">
																			<div class="alignment" align="center">
																				<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span style="word-break: break-word;">&#8202;</span></td>
																					</tr>
																				</table>
																			</div>
																		</td>
																	</tr>
																</table>
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
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #cad1e8; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
																			<div style="color:#091f5c;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																				<p style="margin: 0;">${ignoreEmailMessage}</p>
																			</div>
																		</td>
																	</tr>
																</table>
                                ${reportButtonStatus ? returnReportButton(reportLink) : ""}
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
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="divider_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad">
																			<div class="alignment" align="center">
																				<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span style="word-break: break-word;">&#8202;</span></td>
																					</tr>
																				</table>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad">
																			<h1 style="margin: 0; color: #091f5c; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 32px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 38px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Why Verification Matters</span></h1>
																		</td>
																	</tr>
																</table>
																<table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-top:15px;text-align:center;width:100%;">
																			<h1 style="margin: 0; color: #091f5c; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Enhanced Security</span></h1>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
																			<div style="color:#091f5c;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																				<p style="margin: 0;">Identity verification helps prevent unauthorized access and protects your financial information.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="heading_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;width:100%;">
																			<h1 style="margin: 0; color: #091f5c; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Compliance</span></h1>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
																			<div style="color:#091f5c;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																				<p style="margin: 0;">This process helps us comply with financial regulations and ensures a safe experience for all our clients.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-7" style="height:25px;line-height:25px;font-size:1px;">&#8202;</div>
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
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-bottom: 1px solid #081b5d; border-left: 1px solid #081b5d; border-right: 1px solid #081b5d; border-top: 1px solid #081b5d; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #081b5d; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:25px;line-height:25px;font-size:1px;">&#8202;</div>
																<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;">
																			<div class="alignment" align="center">
																				<div style="max-width: 133px;"><img src=${logoUrl} style="display: block; height: auto; border: 0; width: 100%;" width="133" alt title height="auto"></div>
																			</div>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-3" style="height:25px;line-height:25px;font-size:1px;">&#8202;</div>
																<table class="social_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad">
																			<div class="alignment" align="center">
																				<table class="social-table" width="143px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
																					<tr>
																						<td style="padding:0 0 0 0px;"><a href="https://www.facebook.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
																						<td style="padding:0 0 0 5px;"><a href="https://www.twitter.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/twitter@2x.png" width="32" height="auto" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
																						<td style="padding:0 0 0 5px;"><a href="https://www.linkedin.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/linkedin@2x.png" width="32" height="auto" alt="Linkedin" title="linkedin" style="display: block; height: auto; border: 0;"></a></td>
																						<td style="padding:0 0 0 5px;"><a href="https://www.instagram.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
																					</tr>
																				</table>
																			</div>
																		</td>
																	</tr>
																</table>
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
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>
  `;
};

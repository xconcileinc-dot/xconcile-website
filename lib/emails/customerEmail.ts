interface CustomerEmailProps {
    name: string
    email: string
    service?: string
    message: string
}

const SERVICE_LABELS: Record<string, string> = {
    'tax-preparation': 'Tax Preparation',
    'sales-use-tax-compliance': 'Sales & Use Tax Compliance',
    'bookkeeping': 'Bookkeeping',
    'payroll': 'Payroll',
    'full-service-accounting': 'Full-Service Accounting',
    'cfo-support': 'CFO Support',
    'account-cleanup': 'Account Cleanup',
    'other': 'Other',
}

export function buildCustomerEmail(data: CustomerEmailProps): { subject: string; html: string } {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xconcile.com'
    const adminEmail = process.env.ADMIN_EMAIL || 'info@xconcile.com'
    const serviceLabel = data.service ? (SERVICE_LABELS[data.service] ?? data.service) : 'General Inquiry'
    const firstName = data.name.split(' ')[0]

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f5;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0b2d35 0%,#1c7185 100%);border-radius:12px 12px 0 0;padding:40px 40px 32px;text-align:center;">
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
                <tr>
                  <td style="background-color:#ffffff;padding:10px 20px;border-radius:8px;">
                    <img src="${siteUrl}/logo_autocropped.png" alt="xConcile" width="140" style="display:block;max-width:140px;" />
                  </td>
                </tr>
              </table>
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.3px;">Thank You, ${firstName}!</h1>
              <p style="margin:10px 0 0;color:#a4c6ce;font-size:15px;line-height:1.6;">We've received your message and will get back to you shortly.</p>
            </td>
          </tr>

          <!-- Green Accent Bar -->
          <tr>
            <td style="background-color:#71b751;padding:0;height:4px;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;border-radius:0 0 12px 12px;">

              <!-- Greeting -->
              <p style="margin:0 0 24px;color:#334e68;font-size:16px;line-height:1.7;">
                Hi <strong>${firstName}</strong>,<br/><br/>
                Thank you for reaching out to <strong>xConcile</strong>. We've successfully received your inquiry
                regarding <strong>${serviceLabel}</strong> and our team will review it promptly.
              </p>

              <!-- What to Expect -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background-color:#f8fbfc;border-radius:10px;padding:24px;margin-bottom:28px;">
                <tr>
                  <td style="padding:0 0 16px;">
                    <h2 style="margin:0;color:#0b2d35;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                      What Happens Next?
                    </h2>
                  </td>
                </tr>
                ${step('1', 'Review', 'Our team reviews your inquiry within 1 business day.')}
                ${step('2', 'Reach Out', 'We\'ll contact you via email or phone to discuss your needs.')}
                ${step('3', 'Get Started', 'We\'ll create a tailored plan to help your business thrive.')}
              </table>

              <!-- Message Summary -->
              <h2 style="margin:0 0 12px;color:#0b2d35;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #e8f0f2;padding-bottom:10px;">
                Your Message
              </h2>
              <div style="background-color:#f8fbfc;border-left:4px solid #71b751;border-radius:0 8px 8px 0;padding:18px 22px;margin-bottom:32px;">
                <p style="margin:0 0 8px;color:#737373;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">Service: ${serviceLabel}</p>
                <p style="margin:0;color:#334e68;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
              </div>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="${siteUrl}"
                       style="display:inline-block;background:linear-gradient(135deg,#1c7185,#165a6a);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.2px;">
                      Visit Our Website
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Contact Note -->
              <div style="background-color:#e8f0f2;border-radius:8px;padding:16px 20px;margin-bottom:28px;text-align:center;">
                <p style="margin:0;color:#334e68;font-size:14px;line-height:1.6;">
                  Have questions in the meantime? Email us at<br/>
                  <a href="mailto:${adminEmail}" style="color:#1c7185;font-weight:600;text-decoration:none;">${adminEmail}</a>
                </p>
              </div>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e8f0f2;margin:0 0 20px;" />

              <!-- Footer -->
              <p style="margin:0;color:#a3a3a3;font-size:12px;text-align:center;line-height:1.7;">
                You're receiving this because you submitted a form on<br/>
                <a href="${siteUrl}" style="color:#1c7185;text-decoration:none;">xConcile.com</a><br/><br/>
                &copy; ${new Date().getFullYear()} xConcile. All rights reserved.
              </p>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`

    return {
        subject: `We've Received Your Message — xConcile`,
        html,
    }
}

function step(num: string, title: string, description: string): string {
    return `
    <tr>
      <td style="padding:8px 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="width:32px;vertical-align:top;padding-top:2px;">
              <div style="width:26px;height:26px;background:linear-gradient(135deg,#1c7185,#71b751);border-radius:50%;text-align:center;line-height:26px;color:#ffffff;font-size:12px;font-weight:700;">${num}</div>
            </td>
            <td style="padding-left:12px;vertical-align:top;">
              <p style="margin:0 0 2px;color:#0b2d35;font-size:14px;font-weight:700;">${title}</p>
              <p style="margin:0;color:#737373;font-size:13px;line-height:1.5;">${description}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

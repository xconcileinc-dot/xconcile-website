interface AdminEmailProps {
    name: string
    email: string
    phone?: string
    company?: string
    service?: string
    message: string
    submittedAt: string
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

export function buildAdminEmail(data: AdminEmailProps): { subject: string; html: string } {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xconcile.com'
    const serviceLabel = data.service ? (SERVICE_LABELS[data.service] ?? data.service) : 'N/A'
    const formattedDate = new Date(data.submittedAt).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
    })

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f5;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0b2d35 0%,#1c7185 100%);border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px;">
                <tr>
                  <td style="background-color:#ffffff;padding:10px 20px;border-radius:8px;">
                    <img src="${siteUrl}/logo_autocropped.png" alt="xConcile" width="140" style="display:block;max-width:140px;" />
                  </td>
                </tr>
              </table>
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">New Contact Form Submission</h1>
              <p style="margin:8px 0 0;color:#a4c6ce;font-size:14px;">${formattedDate}</p>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background-color:#71b751;padding:14px 40px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:14px;font-weight:600;">
                &#128276; A new message has arrived — please review and respond promptly.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 40px;border-radius:0 0 12px 12px;">

              <!-- Sender Info -->
              <h2 style="margin:0 0 20px;color:#0b2d35;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #e8f0f2;padding-bottom:10px;">
                Sender Details
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                ${row('Full Name', data.name)}
                ${row('Email Address', `<a href="mailto:${data.email}" style="color:#1c7185;text-decoration:none;">${data.email}</a>`)}
                ${data.phone ? row('Phone', data.phone) : ''}
                ${data.company ? row('Company', data.company) : ''}
                ${row('Service Interest', serviceLabel)}
              </table>

              <!-- Message -->
              <h2 style="margin:0 0 12px;color:#0b2d35;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #e8f0f2;padding-bottom:10px;">
                Message
              </h2>
              <div style="background-color:#f8fbfc;border-left:4px solid #1c7185;border-radius:0 8px 8px 0;padding:20px 24px;margin-bottom:32px;">
                <p style="margin:0;color:#334e68;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: Your inquiry at xConcile"
                       style="display:inline-block;background:linear-gradient(135deg,#1c7185,#165a6a);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.2px;">
                      Reply to ${data.name}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e8f0f2;margin:0 0 20px;" />

              <!-- Footer -->
              <p style="margin:0;color:#a3a3a3;font-size:12px;text-align:center;line-height:1.6;">
                This is an automated notification from <strong>xConcile</strong>.<br/>
                <a href="${siteUrl}" style="color:#1c7185;text-decoration:none;">${siteUrl}</a>
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
        subject: `New Contact: ${data.name} — ${serviceLabel}`,
        html,
    }
}

function row(label: string, value: string): string {
    return `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f4f5;width:38%;vertical-align:top;">
          <span style="color:#737373;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">${label}</span>
        </td>
        <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0f4f5;vertical-align:top;">
          <span style="color:#0b2d35;font-size:15px;font-weight:500;">${value}</span>
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

import nodemailer from 'nodemailer'

// export const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT) || 587,
//     // secure: process.env.SMTP_SECURE === 'true',
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// })
export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c3b98b107f2d50",
    pass: "c95d95d42449ce"
  }
});

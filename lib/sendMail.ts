import { graphClient } from "./emails/graph";

export async function sendAdminEmail(
  subject: string,
  html: string
) {
  await graphClient
    .api(`/users/${process.env.GRAPH_MAILBOX}/sendMail`)
    .post({
      message: {
        subject,

        body: {
          contentType: "HTML",
          content: html,
        },

        toRecipients: [
          {
            emailAddress: {
              address: process.env.ADMIN_EMAIL,
            },
          },
        ],
      },

      saveToSentItems: true,
    });
}
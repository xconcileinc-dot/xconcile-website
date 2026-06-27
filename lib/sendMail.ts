import { ClientSecretCredential } from "@azure/identity";

const credential = new ClientSecretCredential(
  process.env.AZURE_TENANT_ID!,
  process.env.AZURE_CLIENT_ID!,
  process.env.AZURE_CLIENT_SECRET!
);

export async function sendMail(
  subject: string,
  html: string
) {
  const token = await credential.getToken(
    "https://graph.microsoft.com/.default"
  );

  if (!token) {
    throw new Error("Unable to obtain Microsoft Graph access token.");
  }

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${process.env.GRAPH_MAILBOX}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
}
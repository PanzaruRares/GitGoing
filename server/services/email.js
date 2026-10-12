export class EmailDeliveryError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "EmailDeliveryError";
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

export function assertEmailDeliveryConfigured() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    throw new EmailDeliveryError(
      "Set RESEND_API_KEY and EMAIL_FROM in server/.env to send email",
    );
  }
}

async function sendEmail({ email, subject, html, text }) {
  assertEmailDeliveryConfigured();
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  let response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    throw new EmailDeliveryError("Could not reach the email service", {
      cause: error,
    });
  }

  if (!response.ok) {
    throw new EmailDeliveryError(
      `Email service returned HTTP ${response.status}`,
    );
  }
}

export async function sendVerificationEmail({
  email,
  displayName,
  token,
  apiOrigin,
}) {
  const verificationUrl = new URL("/api/auth/verify-email", apiOrigin);
  verificationUrl.searchParams.set("token", token);

  const greeting = displayName ? `Hi ${displayName},` : "Hello,";
  const safeGreeting = escapeHtml(greeting);
  const url = verificationUrl.toString();

  await sendEmail({
    email,
    subject: "Verify your GitGoing email",
    html: `<p>${safeGreeting}</p><p>Verify your email to finish setting up your GitGoing account:</p><p><a href="${url}">Verify email</a></p>`,
    text: `${greeting}\n\nVerify your email to finish setting up your GitGoing account:\n${url}`,
  });
}

export async function sendPasswordResetEmail({
  email,
  displayName,
  token,
  apiOrigin,
}) {
  const resetUrl = new URL("/api/auth/reset-password", apiOrigin);
  resetUrl.searchParams.set("token", token);

  const greeting = displayName ? `Hi ${displayName},` : "Hello,";
  const safeGreeting = escapeHtml(greeting);
  const url = resetUrl.toString();

  await sendEmail({
    email,
    subject: "Reset your GitGoing password",
    html: `<p>${safeGreeting}</p><p>A password reset was requested for your GitGoing account.</p><p><a href="${url}">Reset password</a></p><p>If you did not request this, you can ignore this email.</p>`,
    text: `${greeting}\n\nA password reset was requested for your GitGoing account.\nReset your password: ${url}\n\nIf you did not request this, you can ignore this email.`,
  });
}

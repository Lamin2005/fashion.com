interface ResetPasswordMailProps {
  userName: string | undefined;
  resetUrl: string;
}

export const mailTemplate = ({
  userName,
  resetUrl,
}: ResetPasswordMailProps) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <!-- Preheader -->
  <div
    style="
      display:none;
      max-height:0;
      overflow:hidden;
      opacity:0;
    "
  >
    Reset your password securely. This link expires in 15 minutes.
  </div>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="background-color:#f4f7fb;padding:40px 20px;"
  >
    <tr>
      <td align="center">

        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          style="
            background:#ffffff;
            border-radius:16px;
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background-color:#2563eb;
                padding:40px;
              "
            >
              <h1
                style="
                  color:#ffffff;
                  margin:0;
                  font-size:28px;
                "
              >
                Password Reset
              </h1>

              <p
                style="
                  color:#dbeafe;
                  margin-top:10px;
                  font-size:15px;
                "
              >
                Secure account recovery
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px">

              <h2
                style="
                  color:#111827;
                  margin-top:0;
                  font-size:24px;
                "
              >
                Hello ${userName} 👋
              </h2>

              <p
                style="
                  color:#6b7280;
                  line-height:1.8;
                  font-size:15px;
                "
              >
                We received a request to reset your password.
                Click the button below to create a new password and regain access to your account.
              </p>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="margin:40px 0;"
              >
                <tr>
                  <td align="center">
                    <a
                      href="${resetUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="
                        background-color:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        padding:16px 32px;
                        border-radius:10px;
                        font-size:16px;
                        font-weight:600;
                        display:inline-block;
                      "
                    >
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  background:#f9fafb;
                  border:1px solid #e5e7eb;
                  border-radius:12px;
                  padding:20px;
                "
              >
                <tr>
                  <td>

                    <p
                      style="
                        margin:0 0 12px;
                        color:#374151;
                        font-weight:600;
                      "
                    >
                      Or use this link:
                    </p>

                    <p
                      style="
                        margin:0;
                        color:#2563eb;
                        word-break:break-all;
                        font-size:14px;
                      "
                    >
                      ${resetUrl}
                    </p>

                  </td>
                </tr>
              </table>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  margin-top:30px;
                  background:#fff7ed;
                  border:1px solid #fed7aa;
                  border-radius:12px;
                  padding:18px;
                "
              >
                <tr>
                  <td>
                    <p
                      style="
                        margin:0;
                        color:#9a3412;
                        font-size:14px;
                        line-height:1.7;
                      "
                    >
                      ⏳ This password reset link expires in
                      <strong>10 minutes</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              <hr
                style="
                  margin:40px 0;
                  border:none;
                  border-top:1px solid #e5e7eb;
                "
              />

              <p
                style="
                  color:#9ca3af;
                  font-size:14px;
                  line-height:1.8;
                "
              >
                If you didn't request a password reset, you can safely ignore this email.
                Your password will remain unchanged.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                background:#111827;
                padding:30px;
              "
            >
              <h3
                style="
                  color:#ffffff;
                  margin:0;
                "
              >
                FASHION.com
              </h3>

              <p
                style="
                  color:#9ca3af;
                  margin-top:10px;
                  font-size:13px;
                "
              >
                Secure • Reliable • Trusted
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};

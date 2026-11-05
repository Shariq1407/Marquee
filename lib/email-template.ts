/** Email ke liye branded HTML template — table-based + inline styles,
 *  taaki Gmail, Outlook, Apple Mail sab me sahi dikhe. */

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type Row = { label: string; value: string };

/**
 * emailHtml({ title, intro, rows, note }) — poora email HTML return karta hai.
 * rows me label/value pairs hote hain (Name, Email, Mobile...).
 */
export function emailHtml(opts: {
  title: string;
  intro: string;
  rows: Row[];
  note?: string;
}): string {
  const { title, intro, rows, note } = opts;

  const detailRows = rows
    .map(
      (r, i) => `
              <tr>
                <td style="padding:15px 22px;${i === 0 ? "" : "border-top:1px solid #ececee;"}width:36%;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#9ca3af;">
                  ${escapeHtml(r.label)}
                </td>
                <td style="padding:15px 22px;${i === 0 ? "" : "border-top:1px solid #ececee;"}font-size:15px;color:#111827;font-weight:600;">
                  ${escapeHtml(r.value) || "&ndash;"}
                </td>
              </tr>`
    )
    .join("");

  const noteBlock = note
    ? `
            <tr>
              <td style="padding:26px 40px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff7ed;border:1px solid #fed7aa;border-radius:12px;">
                  <tr>
                    <td style="padding:16px 22px;font-size:14px;line-height:1.55;color:#9a3412;">
                      ${note}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`
    : "";

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f4f4f5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;border:1px solid #e5e7eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

            <!-- Header -->
            <tr>
              <td style="background-color:#0a0a0a;padding:26px 40px;border-radius:16px 16px 0 0;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <div style="width:30px;height:30px;border-radius:9px;background-color:#f19c29;text-align:center;line-height:30px;font-size:12px;color:#0f0f0f;">&#9654;</div>
                    </td>
                    <td style="vertical-align:middle;padding-left:12px;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                      Marquee
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Title + intro -->
            <tr>
              <td style="padding:36px 40px 8px;">
                <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#111827;letter-spacing:-0.02em;">
                  ${escapeHtml(title)}
                </h1>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#6b7280;">
                  ${escapeHtml(intro)}
                </p>
              </td>
            </tr>

            <!-- Details table -->
            <tr>
              <td style="padding:26px 40px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border:1px solid #ececee;border-radius:12px;">${detailRows}
                </table>
              </td>
            </tr>

            ${noteBlock}

            <!-- Footer -->
            <tr>
              <td style="padding:30px 40px 34px;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;">
                  You received this email because a signup was submitted on the Marquee website.<br>
                  &copy; ${new Date().getFullYear()} Marquee. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

import { ok, badRequest, serverError } from 'wix-http-functions';
import { getSecret } from 'wix-secrets-backend';

export async function post_sendEmail(request) {
  const body = await request.body.json();

  if (!body.email || !body.firstname) {
    return badRequest({
      body: { error: 'Missing required fields' },
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    const apiKey = await getSecret('RESEND_API_KEY');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'notifications@yourdomain.com', // must be verified with Resend
        to: 'you@yourdomain.com', // your actual inbox
        subject: `New Volunteer: ${body.firstname} ${body.lastname || ''}`,
        text: `${body.firstname} ${body.lastname || ''} just volunteered to Chip Away at Heart Disease.\n\nContact them at ${body.email}${body.phonenumber ? ' or ' + body.phonenumber : ''}.`
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Resend API error: ${errText}`);
    }

    return ok({
      body: { success: true },
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return serverError({
      body: { error: err.message },
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}

export function options_sendEmail(request) {
  return ok({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
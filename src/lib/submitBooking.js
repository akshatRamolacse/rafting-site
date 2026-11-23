// Booking submission.
// TODO: connect to Google Sheets — deploy a Google Apps Script web app that appends a row,
// then set VITE_SHEET_URL in .env (see README). Until then bookings are only logged locally.
const SHEET_URL = import.meta.env.VITE_SHEET_URL

export async function submitBooking(data) {
  const payload = { ...data, submittedAt: new Date().toISOString() }
  if (!SHEET_URL) {
    console.info('[booking] VITE_SHEET_URL not set — booking not sent anywhere yet', payload)
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true, local: true }
  }
  // Apps Script needs a "simple" request to avoid CORS preflight.
  await fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  return { ok: true }
}

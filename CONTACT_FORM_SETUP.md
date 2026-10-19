# Contact form setup (EmailJS)

The portfolio contact form uses EmailJS so messages can be delivered to your inbox without running your own backend.

## 1. Create an EmailJS account
1. Go to https://www.emailjs.com/ and create/sign in to an account.
2. Add an Email Service and connect the inbox where you want to receive portfolio messages.
3. Create an Email Template. Use these template variables in the template body:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   - `{{reply_to}}`
4. Set the template's recipient / “To email” to your own inbox address in the EmailJS dashboard. Do not put your private inbox address in the public source code.
5. Copy the Service ID, Template ID, and Public Key from EmailJS.

## 2. Configure this project
1. Copy `.env.example` to `.env.local` in the project root.
2. Replace the three placeholder values with your EmailJS values:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. Stop the development server if it is running, then restart it with `npm run dev` (or `npm.cmd run dev` in PowerShell).
4. Submit a test message from the contact form and verify that it arrives in your inbox.

Only use the EmailJS **public key** in this frontend. Never put an EmailJS private key or email account password in the project. Configure allowed domains and abuse/spam protection in EmailJS before publishing publicly.

Until these three values are configured, the form displays a setup message instead of pretending the message was sent. LinkedIn and LeetCode links remain available.

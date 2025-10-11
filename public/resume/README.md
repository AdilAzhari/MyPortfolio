# Resume Directory

Please add your resume PDF file here with the filename: `Adil_Omer_Resume.pdf`

The download button in the header will link to this file automatically.

## EmailJS Configuration

To enable the contact form, you need to set up EmailJS:

1. Go to [emailjs.com](https://www.emailjs.com/) and create an account
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{project_type}}`
   - `{{to_name}}`
4. Replace the placeholder values in `src/components/Contact.tsx`:
   - `YOUR_SERVICE_ID` with your service ID
   - `YOUR_TEMPLATE_ID` with your template ID  
   - `YOUR_PUBLIC_KEY` with your public key

Example template:
```
Hello {{to_name}},

You have received a new message from your portfolio contact form.

From: {{from_name}} ({{from_email}})
Subject: {{subject}}
Project Type: {{project_type}}

Message:
{{message}}

Best regards,
Your Portfolio Contact Form
```
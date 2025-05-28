import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_email(to_email, subject, content):
    message = Mail(
        from_email='severus175@gmail.com',  # Your verified sender
        to_emails=to_email,                 # Any recipient
        subject=subject,
        html_content=content
    )
    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(f"SendGrid Response: {response.status_code} {response.body}")
        return response.status_code == 202
    except Exception as e:
        print(f"SendGrid Error: {e}")
        # Print the error body if available
        if hasattr(e, 'body'):
            print(f"SendGrid Error Body: {e.body}")
        return False

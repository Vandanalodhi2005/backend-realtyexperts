const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'viodhi152@gmail.com', // Fallback for visibility
        pass: process.env.EMAIL_PASS
    }
});

const sendEmailNotification = async (subject, htmlContent) => {
    try {
        const mailOptions = {
            from: `"Realty Xperts Portal" <${process.env.EMAIL_USER}>`,
            to: 'viodhi152@gmail.com',
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #07162F;">Realty Xperts - New Notification</h2>
                    <hr />
                    ${htmlContent}
                    <hr />
                    <p style="font-size: 12px; color: #888;">This is an automated notification from your website dashboard.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

module.exports = { sendEmailNotification };

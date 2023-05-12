
const generateCOnfirmationMail = (subject: string, token:string): string => {
    const content = `
        <html>
            <body>
            <h1>${subject}</h1>
            <p>Thank you for registering on our application.</p>
            <p>Please click the following link to confirm your email address:</p>
            <a href="http://localhost:3000/confirm?token=${token}">Confirm Email</a>
            </body>
        </html>
    `;

    return content;
};


const generatePasswordResetEmailContent = (subject: string, token: string): string => {
    const content = `
        <html>
            <body>
                <h1>${subject}</h1>
                <p>You have requested to reset your password.</p>
                <p>Please click the following link to reset your password:</p>
                <a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a>
            </body>
        </html>
    `;

    return content;
};




export { 
    generateCOnfirmationMail,
    generatePasswordResetEmailContent 
};

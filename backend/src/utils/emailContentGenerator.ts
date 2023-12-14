
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

const generateMessageConfirmationMail = (subject: string): string => {
    const content = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
                line-height: 1.6;
            }
            a {
                display: inline-block;
                margin-top: 10px;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
        <body>
            <div class="container">
                <h1>${subject}</h1>
                <h1>Thank You for Sending the Message</h1>
                <p>I will respond to you shortly.</p>
            </div>
        </body>
    </html>    
    `;

    return content;
};

const generateMessageContent = (subject: string, name: string, email: string, phone: string, message: string): string => {
    const content = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
                line-height: 1.6;
            }
            a {
                display: inline-block;
                margin-top: 10px;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
        <body>
            <div class="container">
                <h1>${subject}</h1>
                <h2>${name}</h2>
                <h2>${email}</h2>
                <h2>${phone}</h2>
                <p>${message}</p>
            </div>
        </body>
    </html>    
    `;

    return content;
};

const generateErrorHtml = (errorUrls:any) => {
    const title = "Web errors";
    const errorList = errorUrls.map((url:any) => `<li>${url}</li>`).join("\n");

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
        </head>
        <body>
            <h1>${title}</h1>
            <ul>
                ${errorList}
            </ul>
        </body>
        </html>
    `;
}


export { 
    generateCOnfirmationMail,
    generatePasswordResetEmailContent,
    generateMessageConfirmationMail,
    generateMessageContent,
    generateErrorHtml,
};

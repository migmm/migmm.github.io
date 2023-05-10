import generateToken from "./JWTtokenGenerator";

export function generateEmailContent(user: { id: number; email: string }): string {
    const token = generateToken(user);

    const content = `
    <html>
        <body>
            <h1>Confirmation Email</h1>
            <p>Thank you for registering on our application.</p>
            <p>Please click the following link to confirm your email address:</p>
            <a href="http://localhost:3000/confirm?token=${token}">Confirm Email</a>
        </body>
    </html>
    `;

    return content;
}

export default generateEmailContent;

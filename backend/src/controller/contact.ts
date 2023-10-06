import { Request, Response } from 'express';
import sendMail from '../utils/mailSender';
import  {generateMessageConfirmationMail, generateMessageContent } from '../utils/emailContentGenerator'
import dotenv from 'dotenv';

dotenv.config();

const EMAIL_TO_SEND_MSG = process.env.EMAIL_SEND_MESSAGE || '';


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postMessage = async (req: Request, res: Response) => {
    const { email, fullName, message, telephone } = req.body;

    try {
        const content = generateMessageConfirmationMail(
            'Confirmation Message'
        );

        const contentMessage = generateMessageContent(
            'Message from miguedev', 
            fullName, 
            email, 
            telephone, 
            message
        );

        await sendMail(email, 'Confirmation Message', content);
        await sendMail(EMAIL_TO_SEND_MSG, 'Mail from Web', contentMessage);

        return res.status(201).json('Mail sended');
    } catch (error) {
        console.log('Error ss', error)
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    postMessage,
};

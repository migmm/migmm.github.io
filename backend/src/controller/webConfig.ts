import { Request, Response } from 'express';
import argon2 from 'argon2';

import api from '../api/webConfig';


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getWebConfigs = async (_req: Request, res: Response) => {
    const webConfigs = await api.getWebConfigs();

    try {
        res.status(200).json(webConfigs);
    } catch (error) {
        res.status(500).send('Error getting webConfigs');
    }
};

const getWebConfig = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const webConfig = await api.getWebConfig(id);

    try {
        res.status(200).json(webConfig);
    } catch (error) {
        res.status(500).send('Error getting webConfig');
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postWebConfig = async (req: Request, res: Response) => {
    const webConfig = req.body;
    console.log(webConfig)
    if (!webConfig.webConfigname || !webConfig.password || !webConfig.email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const foundWebConfig = await api.getByField('webConfigname', webConfig.webConfigname);
    const foundEmail = await api.getByField('email', webConfig.email);

    console.log(foundWebConfig)
    if (foundWebConfig) {
        return res.status(401).json({ message: 'Existing webConfigname' });
    }

    if (foundEmail) {
        return res.status(401).json({ message: 'Existing email' });
    }

    const hashedPwd = await argon2.hash(webConfig.password, {
        type: argon2.argon2id,
        timeCost: 4,
        memoryCost: 2 ** 16,
        parallelism: 2,
    });
    webConfig.password = hashedPwd;

    try {
        const newWebConfig = await api.createWebConfig(webConfig);
        res.status(201).json(newWebConfig);
    } catch (error) {
        res.status(500).send('Error posting webConfigs');
    }
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putWebConfig = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { email, password } = req.body;
    const webConfigToChange = req.body;
    try {
        const webConfig = await api.getWebConfig(id);
        console.log ('webConfig from database', webConfig)

        // Check if webConfig exist
        if (!webConfig) {
            return res.status(404).json({ message: 'WebConfig not found.' });
        }

        console.log('email', email, webConfig.email)
        console.log('password', password, webConfig.password)

        // Check if password is different than actual
        if (password == webConfig.password) {
            return res.status(400).json({ message: 'Password is the same that stored in database.' });
        }
        webConfig.password = password;

        // Check if email is different than actual
        if (email == webConfig.email) {
            return res.status(400).json({ message: 'Email is the same that stored in database.' });
        }

        // Check if email exist in database
        const foundEmail = await api.getByField('email', email);
        console.log ('email', foundEmail)

        if (foundEmail) {
            return res.status(400).json({ message: 'Email exist in database.' });
        }
        webConfigToChange.email = email;

        const hashedPwd = await argon2.hash(webConfig.password, {
            type: argon2.argon2id,
            timeCost: 4,
            memoryCost: 2 ** 16,
            parallelism: 2,
        });
        webConfigToChange.password = hashedPwd;

        console.log('modified webConfig', webConfigToChange)
        const updatedWebConfig = (await api.updateWebConfig(id, webConfigToChange)) || {};
        res.status(200).json(updatedWebConfig);
    } catch (error) {
        res.status(500).send('Error updating webConfig');
    }
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteWebConfig = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
        const removedWebConfig = (await api.deleteWebConfig(id)) || {};
        res.status(200).json(removedWebConfig);
    } catch (error) {
        res.status(500).send('Error removing webConfig');
    }
};


export default {
    getWebConfigs,
    getWebConfig,
    postWebConfig,
    putWebConfig,
    deleteWebConfig,
};

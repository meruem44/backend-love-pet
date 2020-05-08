import jwt from 'jsonwebtoken';
import * as yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req,res) {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(6).required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({err: 'Validação falhou'});
        }

        /*
            checando se o usuário existe
        */

        const { email, password } = req.body;

        /*
            Adicionando a foto de perfil e o enderço do usuário
            que estão em outra tabela
        */
        const userExist = await User.findOne({
            email
        }).populate('url_id', 'url').populate('address_id');

        if (!userExist) {
            return res.status(400).json({err: 'Usuário não encontrado'});
        }

        if (password !== userExist.password) {
            return res.status(400).json({err: 'Senha inválida'});
        }

        const { _id : id, name, cpf, url_id:{ url },
        address_id: { city, uf } } = userExist;

        return res.json({
            user: {
                id,
                name,
                email,
                cpf,
                url,
                address: {
                    city,
                    uf
                }
            },
            token: jwt.sign({ id }, authConfig.secret,{
                expiresIn: authConfig.expiresIn
            })
        });


    }
}

export default new SessionController();
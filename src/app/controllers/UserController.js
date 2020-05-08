import User from '../models/User';
import * as yup from 'yup';

class UserController {
    async index(req,res) {
        const response = await User.find();

        return res.json({data: response});
    }

    async store(req,res) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().min(6).required(),
            url_id: yup.string().required(),
            address_id: yup.string().required(),
            cpf: yup.string().min(11).required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(404).json({err: 'Dados faltando'});
        }

        const { email, cpf} = req.body;

        const userExist = await User.findOne({
            email
        });

        if (userExist) {
            return res.status(404).json({err: 'E-mail já cadastrado'});
        }

        const cpfExist = await User.findOne({
            cpf
        });

        if (cpfExist) {
            return res.status(404).json({err: 'Cpf já cadastrado'});
        }

        const user = await User.create(req.body);

        res.json(user);
    }
};

export default new UserController();
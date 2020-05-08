import File from '../models/FilesPerfil';
import * as yup from 'yup';

class FilePerfilController  {
    async store(req, res) {
        const schema = yup.object().shape({
            originalname: yup.string().required(),
            size: yup.number().required(),
            key: yup.string().required(),
        });

        if (!(await schema.isValid(req.file))) {
            return res.status(404).json({err: 'Dados faltando'});
        }

        const { originalname: name, key, size ,location: url = '' } = req.file;

        const file = await File.create({
            name,
            key, 
            size,
            url
        });

        return res.json(file);
    }
}

export default new FilePerfilController();
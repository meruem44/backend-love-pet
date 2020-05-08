import Address from '../models/Address';
import * as yup from 'yup';

class AddressController {
    async store(req,res) {
        const schema = yup.object().shape({
            zipCode: yup.string().min(8).required(),
            neighborhood: yup.string().required(),
            street: yup.string().required(),
            number: yup.string().required(),
            city: yup.string().required(),
            uf: yup.string().required(),
        });

        const address = await Address.create(req.body);

        res.json(address);
    }
};

export default new AddressController();
import { Request, Response } from 'express';
import Usuario from '../models/usuario';

export const getUsuarios = async (req: Request, res: Response) => {
	const usuarios = await Usuario.findAll();

	res.json(usuarios);
};

export const getUsuario = async (req: Request, res: Response) => {
	const { id } = req.params;

	const usuario = await Usuario.findByPk(id);

	if (!usuario) {
		res.status(404).json({
			msg: `No existe un usuario con el id ${id}`,
		});
	} else {
		res.json(usuario);
	}
};

export const postUsuario = async (req: Request, res: Response) => {
	const { body } = req;

	try {
		const existeEmail = await Usuario.findOne({
			where: {
				email: body.email,
			},
		});

		if (existeEmail) {
			return res.status(400).json({
				msg: 'Ya existe un usuario con ese email ' + body.email,
			});
		}

		const usuario = await Usuario.create(body);
		res.json(usuario);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Hable con el admin',
		});
	}
};

export const putUsuario = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { body } = req;

	try {
		const usuario = await Usuario.findByPk(id);

		if (!usuario) {
			return res.status(404).json({
				msg: 'No existe un usuario con el id ' + id,
			});
		}

		await usuario.update(body);

		res.json(usuario);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Hable con el admin',
		});
	}
};

export const deleteUsuario = async (req: Request, res: Response) => {
	//Hay 2 formas de eliminar usuario de la BD, Eliminación física o actualizando el campo 'estado'de true a false.
	const { id } = req.params;

	try {
		const usuario = await Usuario.findByPk(id);

		if (!usuario) {
			return res.status(404).json({
				msg: 'No existe un usuario con el id ' + id,
			});
		}
		// 1 - Eliminación física
		// await Usuario.destroy({
		// 	where: {
		// 		id: req.params.id,
		// 	},
		// });

		// res.json({
		// 	msg: `Usuario con el id ${id} eliminado con éxito`,
		// });

		//? 2 - Actualizando el campo 'estado' de true a false, así solo se desactiva en la BD
		await usuario.update({
			estado: false,
		});

		res.json({
			msg: `Usuario con el id ${id} eliminado con éxito`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Hable con el admin',
		});
	}
};

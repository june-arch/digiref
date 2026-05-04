export const AuthLoginSchema = {
	description: 'login',
	tags: ['auth'],
	summary: 'Admin login',
	body: {
		type: 'object',
		properties: {
			email: { type: 'string' },
			password: { type: 'string' },
		},
	},
	response: {
		200: {
			description: 'Successful login',
			type: 'object',
			properties: {
				data: {
					name: { type: 'string' },
					username: { type: 'string' },
					role: { type: 'string' },
					logo: { type: 'string' },
					token: { type: 'string' },
					expiresIn: { type: 'number' },
				},
				message: { type: 'string' },
      },
		},
	},
};


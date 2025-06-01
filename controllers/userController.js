const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { login_email, password } = req.body;

    try {
        const user = await User.findOne({ where: { login_email } });
        if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Senha incorreta' });

        const token = jwt.sign(
            {id: user.id, user_type: user.user_type},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
};

const createUser = async (req, res) => {
    const { name, login_email, password, user_type } = req.body;

    // Validações básicas
    if (!name || !login_email || !password || !user_type) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    
    if (typeof password !== 'string') {
        return res.status(400).json({ message: 'Senha deve ser uma string' });
    }

    try {
        const hashedPassword = await bcrypt.hash(String(password), 10);
        const newUser = await User.create({
            name,
            login_email,
            password: hashedPassword,
            user_type
        });
    
        const { password: _, ...userWithoutPassword } = newUser.toJSON();
        res.status(201).json(userWithoutPassword);
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).json({message: 'Erro ao criar usuário'});
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'login_email', 'user_type']
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'name', 'login_email', 'user_type']
        });
        
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, login_email, user_type } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.name = name;
        user.login_email = login_email;
        user.user_type = user_type;

        await user.save();
        
        // Não retornar a senha no response
        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.json(userWithoutPassword);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({message: 'Usuário não encontrado'});

        await user.destroy();
        res.json({message: 'Usuário deletado com sucesso'});
    } catch (err) {
        res.status(500).json({message: 'Erro ao deletar usuário'});
    }
};

module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

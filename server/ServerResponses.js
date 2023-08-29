const responses = {
    common: {
        MALFORMED_REQ: { pt: 'Pedido mal formado, por favor tente novamente mais tarde', en: 'Malformed request, please try again later' },
        IMAGE_TOO_BIG: { pt: 'Esta imagem é demasiado grande, imagens poderão ter no máximo', en: 'Image too big, images can be at max' },
        PASS_RESET_REQ: { pt: 'Foi enviado um email com as instruções de recuperação de password para o seu email', en: 'An email was sent, to the indicated email, with instructions how to reset your password' },
    },
    auth: {
        INCORRECT_CREDENTIALS: { pt: 'As suas credenciais estão incorretas!', en: 'Your credentials are incorrect!' },
        NO_AUTH: { pt: 'Não autorizado', en: 'Non authorized' },
        LOGIN_SUCCESS: { pt: 'Fez login com sucesso', en: 'Logged in successfully' },
        NO_PASS: { pt: 'Falta palavra passe', en: 'Missing password'},
        NO_ACCESS: {pt: 'A sua conta está restrita de aceder a plataforma', en: 'Your account is restricted from accessing the platform'}
    },
    users: {
        NO_USER: { pt: 'Utilizador não existe', en: 'This user does not exists' },
        ALREADY_USER: { pt: 'Utilizador já existe', en: 'User already exists' },
        NO_EMAIL_PASS: { pt: 'Indique o seu email e password', en: 'Provide your email and password' },
        NO_EMAIL: { pt: 'Indique o seu email', en: 'Please provide your email' },
        SAME_PASS: { pt: 'A sua nova palavra passe não pode ser a mesma que a atual', en: 'Your new password cannot be the same as your current one' },
        PROFILE_UPDATE_SUCCESS: { pt: 'O seu perfil foi alterado com sucesso', en: 'Your profile was successfully updated' },
        PROFILE_PICTURE_SUCCESS: { pt: 'Alterou a sua imagem de perfil com sucesso', en: 'You have changed your profile picture successfully' },
        PROFILE_PICTURE_REMOVED: { pt: 'A sua imagem de perfil foi removida com sucesso', en: 'Your profile picture was removed successfully' },
        PASS_CHANGE_SUCCESS: { pt: 'A sua palavra passe foi alterada com sucesso', en: 'You have changed your password successfully' },
        MISSING_PASS: { pt: 'Indique a sua palavra passe, por favor.', en: 'Please provide your password' },
        USER_CREATED: { pt: 'Utilizador criado com sucesso.', en: 'User created successfully' },
        USER_EDITED: { pt: 'Utilizador editado com sucesso.', en: 'User edited successfully' },
        USER_REMOVED: { pt: 'Utilizador removido com sucesso.', en: 'User removed successfully' },
        IMAGE_MISSING: { pt: 'Imagem em falta', en: 'Image missing' },
        ALREADY_EMAIL: { pt: 'Este email já se encontra registado na plataforma', en: 'This email is already registered in the platform' },
        NEW_CRED: { pt: 'Foram enviadas novas credenciais para o utilizador', en: 'New credentials were sent to the user' },
        CREATED_ACCOUNT: { pt: 'A sua conta foi criada com sucesso, poderá agora fazer o login', en: 'Your account was successful created, you can now login' },
        PASS_RESET_INSTRUCTIONS: { pt: 'Enviámos instruções para o seu email para fazer a recuperação da sua password', en: 'We just sent an email with the instructions on how to reset your password' },
        RESET_PASS_NO_INFO: { pt: 'Falta informação, por favor tente novamente', en: 'Not enough info provided, please try again' }
    },
    roles: {
        NO_ROLE: { pt: 'Cargo não existe', en: 'Role does not exists' },
        ALREADY_ROLE: { pt: 'Cargo já existe', en: 'Role already exists' },
        CREATED: { pt: 'Cargo criado com sucesso', en: 'Role successfully created' },
        UPDATED: { pt: 'Cargo alterado com sucesso', en: 'Role successfully edited' },
        REMOVED: { pt: 'Cargo removido com sucesso', en: 'Role successfully removed' },
        BEING_USED: { pt: 'Ainda existe utilizadores com este cargo', en: 'There are still users with this role ' }
    },
    records: {
        CREATED: { pt: 'Registo criado com sucesso', en: 'Record successfully created'},
        UPDATED: { pt: 'Registo alterado com sucesso', en: 'Record successfully updated'},
        REMOVED: { pt: 'Registo removido com sucesso', en: 'Record successfully removed'},
    }
}

module.exports = {
    responses
}
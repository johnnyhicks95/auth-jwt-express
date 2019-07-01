module.exports = (type, data = null) => {
    switch (type) {
        case 'bad':
            return {
                status: 'false',
                message: 'Data are invalid'
            }
            break;
        case 'no-login':
                return {
                    status: 'false',
                    message: 'The login is invalid. Please verify the email or password'
                }
                break;
        case 'error':
                return {
                    status: 'false',
                    message: 'Internal server error.'
                }
                break;
        case 'exist':
                return {
                    status: 'false',
                    message: 'Exist user with email or username selected.'
                }
                break;
        case 'login':
                return {
                    status: 'true',
                    message: 'Login complete',
                    data
                }
                break;
        default:
            return {
                status: 'true',
                message: 'The operation is ok',
                data
            }
            break;
    }
}
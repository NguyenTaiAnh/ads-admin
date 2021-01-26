import headerAuthor from './AuthHeader';
const { default: Axios } = require('axios');
//link default
const API_ENDPOIN = 'http://103.150.124.56:1342/';
class LoginService {
    //api login admin
    LoginAdmin(data) {
        const URL = `${API_ENDPOIN}auth/local/`;
        return Axios.post(URL, data);
    }
    //api register or post user
    Register(data) {
        const URL = `${API_ENDPOIN}users/`;
        return Axios.post(URL, data, {
            headers: headerAuthor()
        });
    }
    //groups content
    GroupContent() {
        const URL = `${API_ENDPOIN}groups/`;
        return Axios.get(URL, {
            headers: headerAuthor()
        });
    }
    //points
    Points() {
        const URL = `${API_ENDPOIN}points/`;
        return Axios.get(URL, {
            headers: headerAuthor()
        });
    }
    getRoles() {
        const URL = `${API_ENDPOIN}users-permissions/roles`
        return Axios.get(URL, {
            headers: headerAuthor()
        })
    }
    postPoint(data) {
        const URL = `${API_ENDPOIN}points/`
        return Axios.post(URL, data, {
            headers: headerAuthor()
        })
    }
    putPoint(id, data) {
        const URL = `${API_ENDPOIN}points/${id}`
        return Axios.put(URL, data, {
            headers: headerAuthor()
        })
    }
    // deletePoint(id) {
    //     const URL = `${API_ENDPOIN}points/${id}`
    //     return Axios.put(URL, {
    //         headers: headerAuthor()
    //     })
    // }
    Users() {
        const URL = `${API_ENDPOIN}users`
        return Axios.get(URL, {
            headers: headerAuthor()
        })
    }
    //update User
    updateUser(id, data) {
        const URL = `${API_ENDPOIN}users/${id}`
        return Axios.put(URL, data, {
            headers: headerAuthor()
        })
    }
    //delete user
    deleteUser(id) {
        const URL = `${API_ENDPOIN}users/${id}`
        return Axios.delete(URL, {
            headers: headerAuthor()
        })
    }
    // Content
    getContent() {
        const URL = `${API_ENDPOIN}contents`
        return Axios.get(URL, {
            headers: headerAuthor()
        })
    }

}
export default new LoginService();

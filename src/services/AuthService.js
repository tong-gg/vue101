import Axios from 'axios'

const auth_key = "auth-pokedex"
let auth = JSON.parse(localStorage.getItem(auth_key))
const jwt = ""
const user = auth ? auth.user : ""
const api_endpoint = 
    process.env.VUE_APP_POKEDEX_ENDPOINT || "http://localhost:1337"


// ทำแบบนี้คือไปกำหนดชื่อฟังก์ชันเอาเองได้
export default {
    isAuthen () {
        return (user !== "") && (jwt !== "")
    },

    getUser () {
        return user
    },

    getApiHeader () {
        if (jwt !== "") {
            return {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        }
        return {}
    },

    async login ({ email, password }) {
        // call POST /auth/local
        try {
            let url = `${api_endpoint}/auth/local`
            let body = {
                identifier: email,
                password: password
            }

            let res = await Axios.post(url, body)
            console.log(`login `, res)

            if (res.status === 200) {
                console.log(res.data)
                localStorage.setItem(auth_key, JSON.stringify(res.data))
            } else {
                console.log("NOT 200 ", res)
            }

            return {
                success: true,
                user: res.data.user,
                jwt: res.data.jwt
            }
        } catch (e) {
            console.error(e)
            if (e.response.status === 400) {
                // console.error(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            }
        }

    },

    async register ({ username, email, password }) {
        // call POST /auth/local/register
        try {
            let url = `${api_endpoint}/auth/local/register`
            let body = {
                username: username,
                email: email,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            }
        } catch(e) {
            if (e.response.status === 400) {
                // console.error(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                return {
                    success: false,
                    message: "Unknown error: " + e.response.data
                }
            }

        }
    },

    logout () {
        localStorage.removeItem(auth_key)
    }
    
}
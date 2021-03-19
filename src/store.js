import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { router } from "./router"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        base_url: "https://imagechanges.epsilonarge.com/api2/",
        img_base_url: "https://imagechanges.epsilonarge.com/api2/Img/",
        img_upload_url: "https://imagechanges.epsilonarge.com/api2/UploadImg/admin_upload_img.php",
        token: "",
        id: "",
        loginResult: false
    },
    mutations: {
        setToken(state, getdata) {
            state.id = getdata.id
            state.token = getdata.token

        },
        clearToken(state) {
            state.id = ""
            state.token = ""
        }
    },


    actions: {
        login({ commit, dispatch, state }, data) {
            let dataUrl = state.base_url + "Admin/login.php?key=123"

            var datas = {
                email: data.email,
                password: data.password

            };



            return axios.post(dataUrl, JSON.stringify(datas),

            ).then(response => {


                if (response.data.result) {

                    this.state.loginResult = true;

                    var senddata = {
                        id: response.data.data.id,
                        token: response.data.token
                    }


                    commit("setToken", senddata)
                    localStorage.setItem("id", response.data.data.id)
                    localStorage.setItem("token", response.data.token)

                } else {
                    //conso.log("hatalı giriş");
                }

            }).catch(err => {
                //conso.log(err.response);
            });


        },

        logout({ commit }) {

            commit("clearToken")

            localStorage.removeItem("id")
            localStorage.removeItem("token")
            location.reload();
        }

    },

    getters: {
        isLogin(state) {

            return localStorage.getItem("id") !== null && localStorage.getItem("token") !== null
        },
        getUser(state) {

            var result = {
                id: state.id,
                token: state.token
            }

            return result
        }
    }
})

export default store
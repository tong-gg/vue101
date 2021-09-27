import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthService from '@/services/AuthService'

let api_endpoint = process.env.VUE_APP_POKEDEX_ENDPOINT || "http://localhost:1337" 

Vue.use(Vuex)

export default new Vuex.Store({
    // similar to attribute in OOP world
  state: {
    // store data
      data: [] // reference type only to re-render!
  },
  getters: {
    // เรียกข้อมูลใน state
      pokemons: (state) => state.data,
  },

  // similar to private setter in OOP world (setState in React)
  mutations: {
      fetch(state, { res }) {
          state.data = res.data
      },
      add(state, payload) {
          state.data.push(payload)
      },
      edit(state, index, data) {
          // cannot read property of undefined "name"
          // since you fix this bug by reloading this page
          // you don't have to set state for vuex
          
          // state.data[index] = data
      }
  },

  // similar to public method in OOP world, classes from outside world can invoke
  // or fetch data from API
  actions: {
      async fetchPokemon({ commit }) {
        // commit keyword, to call mutation

        // let's say we fetch data from API
        //   let res = {
        //     data: [
        //         {
        //             name: {
        //                 english: 'Bulbasaur',
        //                 japanese: 'Fushikidane',
        //             },
        //             type: ['Grass', 'Poison']
        //         },
        //         {
        //             name: {
        //                 english: 'Bulbasaur2',
        //                 japanese: 'Fushikidane2',
        //             },
        //             type: ['Grass', 'Poison']
        //       }
        //     ]
        //   }
        let res = await axios.get(api_endpoint + "/monsters") 
        commit('fetch', { res })
      },

      async addPokemon({ commit }, payload) {
        console.log(payload)
        // ['Fire', 'Flying'] ==> "?name_in=Fire&name_in=Flying"
        // my case ==> "?type_in=Fire&type_in=Flying"
        let url = api_endpoint + "/monsters"
        let qs = payload.pokemon_types.map(item => `type_in=${item}`)
                                      .join('&')
        let res_types = await axios.get(api_endpoint + "/pokemon-types?" + qs)
        
        let body = {
          name: payload.name,
          name_jp: payload.name_jp,
          pokemon_types: res_types.data.map(item => item.id)
        }

        console.log(`body`, body)
        
        try{
          let headers = AuthService.getApiHeader()
          let res = await axios.post(url, body, headers)
          if (res.status === 200) {
            commit('add', res.data) // push to state.data
            return {
              success: true,
              data: res.data
            }
          } else {
            console.error(res)
            return {
              success: false,
              message: "Unknown status code: " + res.status
            }
          }
        } catch (e) {
          if(e.response.status === 403){
            console.error(e.response.data.message)
            return {
              success: false,
              message: e.response.data.message
            }
          } else {
            return {
              success: false,
              message: "Unknown error: " + e.response.data
            }
          }
        }
      },

      async editPokemon({ commit }, payload) {
        // todo: call API to edit data
        let url = api_endpoint + "/monsters/" + payload.id
         // ['Fire', 'Flying'] ==> "?name_in=Fire&name_in=Flying"
        // my case ==> "?type_in=Fire&type_in=Flying"
        let qs = payload.pokemon_types.map(item => `type_in=${item}`)
                                      .join('&')
        let res_types = await axios.get(api_endpoint + "/pokemon-types?" + qs)

        let body = {
          name: payload.name,
          name_jp: payload.name_jp,
          pokemon_types: res_types.data.map(item => item.id)
        }
        let res = await axios.put(url, body)

        if(res.status === 200) {
          commit('edit', payload.index, res.data)
        } else {
          console.error(res)
        }
      }
  },
  modules: {

  }
})

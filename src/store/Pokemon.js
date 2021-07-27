import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

let api_endpoint = 'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json'

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
      add(state, { payload }) {
          state.data.push(payload)
      },
      edit(state, { payload }) {
          state.data[payload.index].name = payload.name
          state.data[payload.index].type = payload.type
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
        let res = await Axios.get(api_endpoint)
        commit('fetch', { res })
      },

      addPokemon({ commit }, payload) {
        // todo: call API to add data  
        commit('add', { payload })
      },

      editPokemon({ commit }, payload) {
        // todo: call API to edit data
        commit('edit', { payload })
      }
  },
  modules: {

  }
})

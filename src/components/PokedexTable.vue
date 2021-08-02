<template>
  <div>
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Name (English)</th>
                  <th>Name (Jp)</th>
                  <th>Type</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(poke, index) in pokemons" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td v-if="index !== editIndex">{{ poke.name }}</td>
                  <td v-if="index === editIndex">
                      <input type="text" v-model="form.name">
                  </td>

                  <td v-if="index !== editIndex">{{ poke.name_jp }}</td>
                  <td v-if="index === editIndex">
                      <input type="text" v-model="form.name_jp">
                  </td>

                  <td v-if="index !== editIndex">
                      {{ poke.pokemon_types.map(item => item.type).join(', ') }}
                  </td>
                  <td v-if="index === editIndex">
                      <input type="text" v-model="form.pokemon_types">
                  </td>

                  <td v-if="index !== editIndex">
                      <button @click="openForm(index, poke)">Click to Edit</button>
                  </td>
                  <td v-if="index === editIndex">
                      <button @click="editPokemon">Update Pokemon</button>
                      <button @click="closeForm">Cancel</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import PokedexApiStore from '@/store/PokedexApi'

export default {
    data() {
        return {
            pokemons: [],
            editIndex: -1,
            form: {
                id: '', // id is id NOT editindex
                name: '',
                name_jp: '',
                pokemon_types: '',
            }
        }
    },
    created() {
        // calling this.method, using in your own component
        this.fetchPokemon()
    },
    methods: {
        async fetchPokemon() {
            // call actions in store, use StoreName.dispatch('ActionName')
            await PokedexApiStore.dispatch('fetchPokemon')

            // call getter in store
            this.pokemons = PokedexApiStore.getters.pokemons
        },
        openForm(index, pokemon) {
            this.editIndex = index
            let cloned = JSON.parse(JSON.stringify(pokemon))
            this.form.id = cloned.id
            this.form.name = cloned.name
            this.form.name_jp = cloned.name_jp 
            this.form.pokemon_types = cloned.pokemon_types.map(item => item.type).join(', ')
        },
        closeForm() {
            this.editIndex = -1
            this.form = {
                id: '', // id is id NOT editindex
                name: '',
                name_jp: '',
                pokemon_types: '',
            }
        },
        
        async editPokemon() {
            let payload = {
                index: this.editIndex,
                id: this.form.id,
                name: this.form.name,
                name_jp: this.form.name_jp,
                pokemon_types: this.form.pokemon_types.split(',').map(item => item.trim())
            }
            await PokedexApiStore.dispatch('editPokemon', payload)
            this.closeForm()

            // cheating! not efficiency way
            this.fetchPokemon()
        }
    }
}
</script>

<style>

</style>
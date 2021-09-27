<template>
    <div>
        <router-link v-if="isAuthen()" to="/pokedex/create">Add new Pokemon</router-link>
        <pokedex-table></pokedex-table>
    </div>
</template>

<script>
// ไม่ทันนาที 50 กับ 01.09
import PokedexTable from '@/components/PokedexTable'
import AuthUser from '@/store/AuthUser'

export default {
    components: {
        PokedexTable
    },
    methods: {
        isAuthen() {
            return AuthUser.getters.isAuthen
        }
    }
}
</script>

<style>

</style>
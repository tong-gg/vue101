<template>
    <div>
        <pokedex-create-form></pokedex-create-form>
        <pokedex-table></pokedex-table>
    </div>
</template>

<script>
import PokedexTable from '@/components/PokedexTable'
import PokedexCreateForm from '@/components/PokedexCreateForm'

export default {
    components: {
        PokedexCreateForm,
        PokedexTable
    },
}
</script>

<style>

</style>
<template>
    <div>
        <pokemon-create-form></pokemon-create-form>
        <pokemon-table></pokemon-table>
    </div>
</template>

<script>
import PokemonTable from '@/components/PokemonTable'
import PokemonCreateForm from '@/components/PokemonCreateForm'

export default {
    components: {
        PokemonTable,
        PokemonCreateForm
    },
}
</script>

<style>

</style>
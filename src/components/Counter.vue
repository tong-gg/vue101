<template>
    <div>
        Counter: {{ number }}
        <div class="mb-20">
            <!-- v-model will change data() attrib. -->
            <!-- v-bind:value only display change -->

            <input type="text" v-model="number" />
            <!-- <input type="text" v-bind:value="number" /> -->
            <button v-on:click="increase">+</button>
            <button v-on:click="decrease">-</button>    
        </div>
    </div>
</template>

<script>
export default {
    data() { // personal variable (these data, ONLY USE in component)
        return {
            number: 10
        }
    },
    methods: {
        increase() {
            this.number++
        },
        decrease() {
            this.number--
        }
    }
}
</script>

<style lang='scss' scoped>
.mb-20 {
    margin-bottom: 20px;
}
</style>

<!-- TODO! 
1. increase value by 10
2. multiply value by 2
-->
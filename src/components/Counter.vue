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
            <button v-on:click="addTen">+10</button>    
            <button v-on:click="multiplyByTwo">x2</button>    
            <button v-on:click="reset">reset</button>    
        </div>
    </div>
</template>

<script>
export default {
    data() { // personal variable (these data, ONLY USE in component)
        return {
            number: this.initNumber || 10 // if this.initNumber == undefined ? 10 : this.initNumber
        }
    },
    props: ['initNumber'],
    methods: {
        increase() {
            this.number++
        },
        decrease() {
            this.number--
        },
        addTen() {
            this.number += 10
        },
        multiplyByTwo() {
            this.number *= 2
        },
        reset() {
            this.number = 0
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
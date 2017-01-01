<template>
    <div class="component ph3 ma4 tc" id="app">
        <p>
            The current {{ countTitle }} is:
        </p>
        <h1>{{ count }}</h1>
        <div>
            <button class="f6 grow no-underline br-pill ba ph3 pv2 mb2 dib near-black" @click="increment">increment</button>
        </div>
    </div>
</template>


<script>

    const { mapActions, mapState } = require('vuex');

    module.exports = {
        data: function () {
            return {
                countTitle: 'count',
            };
        },
        computed: {
            ...mapState([
                'count',
            ])
        },
        methods: {
            ...mapActions([
                'increment',
                'getCount',
            ]),
        },
        created: function () {
          console.log('app created.');
        },
        mounted: function () {
           console.log('app mounted.');
           this.getCount();
        },
        updated: function () {
          console.log('app updated.');
        }
    };
</script>

<style lang="sass">
    $primary-color: blue;
    #app {
        color: $primary-color;
    }
</style>
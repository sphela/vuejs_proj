<template>
    <main id="app">
        <h1>Hello {{ world }}!</h1>
        <p>
            The current count is: {{ count }}. <button @click="increment">increment</button>
        </p>
    </main>
</template>


<script>

    const { mapActions, mapState } = require('vuex');

    module.exports = {
        data: function () {
            return {
                world: 'Vue App World yep!',
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
    $primary-color: #333;
    #app {
        background: gray;
        color: $primary-color;
    }
</style>
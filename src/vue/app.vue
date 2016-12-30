<template>
    <main id="app">
        <h1>Hello {{ world }}!</h1>
        <p>
            The current count is: {{ count }}. <button @click="increment">increment</button>
        </p>
    </main>
</template>


<script>
    module.exports = {
        data: function () {
            return {
                world: 'Vue App World yep!',
                count: 0,
            };
        },
        methods: {
            increment: function () {
                this.$http.post('/api/count').then(response => {
                    console.log('count updated');
                    this.count = response.body;
                });
            },
            getCount: function () {
                this.$http.get('/api/count').then(response => {
                    this.count = response.body;
                });
            }
        },
        created: function () {
          console.log('app created.');
        },
        mounted: function () {
           console.log('app mounted.', this.count, this.$http, 'http?');
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
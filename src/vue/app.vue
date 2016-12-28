<template>
    <main id="app">
        <h1>Hello {{ world }}!</h1>
        <p>
            The current count is: {{ count }}.
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
        created: function () {
          console.log('foobarmanubar');
        },
        mounted: function () {
           console.log('mountedfoobar', this.count, this.$http, 'http?');
           this.$http.get('/api/count').then(response => {
                this.count = response.body;
           });
        },
        updated: function () {
          console.log('updatedfoobar');
        }
    };
</script>

<style>
    #app {
        background: gray;
    }
</style>
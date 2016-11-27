<template>
    <div id="app">HelloNope {{ world }}!</div>
</template>


<script>
    module.exports = {
        data: function () {
            return {world: 'Vue that learning curve App Worldzughzz'};
        },
        created: function () {
          console.log('foobarmanubar');
        },
        mounted: function () {
          console.log('mountedfoobar');
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
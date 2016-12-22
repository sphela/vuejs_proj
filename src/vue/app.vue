<template>
    <div id="app">Hello {{ world }}!</div>
</template>


<script>
    module.exports = {
        data: function () {
            return {world: 'Vue App World yep!'};
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
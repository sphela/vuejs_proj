<template>
    <div>
        <h1>About Sphela</h1>
        <p>
            Sphela is a cool project.
        </p>
    </div>
</template>


<script>

    module.exports = {
        created: function () {
            console.log('about created.');
        },
        mounted: function () {
            console.log('about mounted.');
        },
        updated: function () {
            console.log('about updated.');
        }
    };
</script>

<style lang="sass">
    h1 {
        color: rgb(187, 62, 69);
    }
</style>
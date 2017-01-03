<template>
    <div>
        <p>
            The current {{ countTitle }} is
        </p>
        <div id="count" class="mb4">{{ count }}</div>
        <div>
            <a href="#" class="f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib black" @click.prevent="increment">Increment</a>
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
            console.log('count created.');
        },
        mounted: function () {
            console.log('count mounted.');
            this.getCount();
        },
        updated: function () {
            console.log('count updated.');
            this.getCount();
        }
    };
</script>

<style lang="sass">
    #count {
        font-size: 100px;
    }
</style>
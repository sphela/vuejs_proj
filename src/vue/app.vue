<template>
    <div id="app">
        <div class="ma3">
            <router-link to="/" class="logo bg-left"> </router-link>
            <span class="text-links pt3">
                |
                <router-link to="/about" class="link">About</router-link>
            </span>
        </div>
        <div class="component ph3 ma4 tc mt6 georgia">
            <router-view class="view"></router-view>
        </div>
    </div>
</template>


<script>
    module.exports = {
        created: function () {
          console.log('app created.');
        },
        mounted: function () {
           console.log('app mounted.');
        },
        updated: function () {
          console.log('app updated.');
        }
    };
</script>

<style lang="sass">
    $primary-color: #333;
    .logo {
        display: inline-block;
        background-image: url('/static/images/sphela.png');
        background-repeat: no-repeat;
        background-size: 100px auto;
        width: 100px;
        height: 58px;
    }
    #app {
        color: $primary-color;
    }
    .link {
        color: $primary-color;
    }
    .text-links {
        display: inline-block;
        line-height: 58px;
        vertical-align: top;
        margin-top: -1px;
    }
</style>
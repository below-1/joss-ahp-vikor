<template>
  <div>
    <v-parallax id="home-parallax" src="parallax-bg.jpg" dark>
      <div id="parallax-stack">
        <vue-particles
          :color="particles.color"
          :linesColor="particles.lineColor"
          :linesWidth="particles.lineWidth"
          :particlesNumber="particles.particlesNumber"
          :particleSize="6"
        ></vue-particles>
        <v-layout row justify-center align-center fill-height class="inner-container">
          <v-flex md10 class="text-md-center text-sm-center">
            <font-awesome-icon class="white--text" size="10x" :icon="['fab', 'strava']"></font-awesome-icon>
            <div class="display-2 white--text py-4">
              {{ parallaxTitle }}
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-parallax>
    <v-container fluid bg fill-height style="min-height: 80vh;">
      <v-layout row wrap align-center>
        <v-flex md9>
          <div class="display-1">
            {{ mainDescription }}
          </div>

          <div class="headline my-4">
            {{ secondaryDescription }}
          </div>

          <v-btn @click="$router.push('/app')" dark color="amber darken-2" depressed large>Mulai</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import setting from '@/model/setting'

export default {
  name: 'Home',
  data () {
    return {
      mainDescription: '',
      secondaryDescription: '',
      parallaxTitle: '',
      particles: {
        color: '#ffffff',
        lineColor: '#ddd',
        lineWidth: '1',
        particlesNumber: 100
      }
    }
  },
  mounted () {
    this.mainDescription = setting.mainDescription()
    this.secondaryDescription = setting.secondaryDescription()
    this.parallaxTitle = setting.parallaxTitle()
  }
}
</script>

<style lang="scss">
  #foobar {
    min-height: 500px;
  }
  #home-parallax {
    .v-parallax__content {
      background: rgba(225, 111, 0, 0.9);
    }
  }

  #parallax-stack {
    position: relative;
    max-height: 500px;

    .inner-container {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 91;
    }

    #particles-js {
      // background-image: url(/img/bg.jpg);
      // background-size: cover;
      height: 100%;
      width: 100%;
      right: 0;
      left: 0;
    }
  }
</style>

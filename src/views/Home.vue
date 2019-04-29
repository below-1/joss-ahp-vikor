<template>
  <div>
    <v-parallax id="home-parallax" src="/parallax-bg.jpg" dark>
      <v-layout row justify-center align-center fill-height>
        <v-flex md10 class="text-md-center text-sm-center">
          <font-awesome-icon class="white--text" size="10x" :icon="['fab', 'strava']"></font-awesome-icon>
          <div class="display-2 white--text py-4">
            JOSS--SALOME
          </div>
        </v-flex>
      </v-layout>
    </v-parallax>
    <v-container fluid bg fill-height style="min-height: 80vh;">
      <v-layout row wrap align-center>
        <v-flex md9>
          <div class="display-1">
            Sistem Pendukung Keputusasaan Penentuan Kelayakan Lokasi Usaha Franchise
            Menggunakan Metode AHP dan VIKOR
          </div>

          <div class="headline my-4">
            STUDI KASUS SALOME JOSS - KUPANG
          </div>

          <v-btn @click="$router.push('/app')" dark color="amber darken-2" depressed large>Mulai</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      //
    }
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
</style>

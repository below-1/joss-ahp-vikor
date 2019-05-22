<template>
    <div>
    <v-parallax id="home-parallax" src="/parallax-bg.jpg" dark>
      <v-layout row justify-center align-center fill-height>
        <v-flex md5 class="text-md-center text-sm-center">
          <v-card>
            <v-card-text>
              <div class="display-1 py-4">
                Login Terlebih Dahulu
              </div>
              <v-text-field v-model="username" label="Username" class="mx-4" />
              <v-text-field v-model="password" label="Password" type="password" class="mx-4" />
              <v-btn @click="doLogin" large dark depressed color="blue">Login</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-parallax>
    <v-container fluid bg fill-height style="min-height: 30vh;">
      <v-layout row wrap align-center>
        <v-flex md9>
          <div class="headline">
            Sistem Pendukung Keputusasaan Penentuan Kelayakan Lokasi Usaha Franchise
            Menggunakan Metode AHP dan VIKOR
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import settings from '@/model/setting'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    checkLogin () {
      if (this.username === settings.username()) {
        if (this.password === settings.password()) {
          this.$router.push('/app/data/raw')
        }
      } else {
        alert('Gagal')
      }
    },
    doLogin () {
      localStorage.setItem('ninda.vikor.username', this.username)
      localStorage.setItem('ninda.vikor.password', this.password)
      this.$router.push('/app')
    }
  }
}
</script>

<style>

</style>

<template>
  <v-stepper v-model="el">
    <v-stepper-header>
      <v-stepper-step :complete="el > 1" step="1"></v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step :complete="el > 2" step="2"></v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step :complete="el > 3" step="3"></v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step :complete="el > 4" step="4"></v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step :complete="el > 5" step="5"></v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step :complete="el > 6" step="6"></v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step :complete="el > 7" step="7"></v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step :complete="el > 8" step="8"></v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>

      <v-stepper-content step="1">
        <v-container>
          <v-layout row justify-center>
            <v-flex md6 justify-center>
              <v-layout column>
                <div class="title text-xs-center my-2">
                  Input Nama Jalan
                </div>
                <v-text-field
                  v-model="item.nama"
                  placeholder="Nama Jalan...">
                </v-text-field>
                <v-btn
                  :disabled="!namaJalanValid"
                  @click="nextStep"
                  large
                  dark
                  color="amber darken-3">Selanjutnya</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container>
          <v-layout row justify-center>
            <v-flex md6 justify-center>
              <v-layout column>
                <div class="title text-xs-center my-2">
                  Input Pusat Keramaian
                </div>
                <v-select :items="PKOptions" v-model="item.PK">
                </v-select>
                <back-and-forth @next="nextStep" @prev="prevStep" />
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-container>
          <v-layout row justify-center>
            <v-flex md6 justify-center>
              <v-layout column>
                <div class="title text-xs-center my-2">
                  Input Jumlah Pesaing
                </div>
                <v-select :items="JPOptions" v-model="item.JP">
                </v-select>
                <back-and-forth @next="nextStep" @prev="prevStep" />
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-container>
          <v-layout row justify-center>
            <v-flex md6 justify-center>
              <v-layout column>
                <div class="title text-xs-center my-2">
                  Input Akses Jalan
                </div>
                <v-select :items="AJOptions" v-model="item.AJ">
                </v-select>
                <back-and-forth @next="nextStep" @prev="prevStep" />
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-container>
          <v-layout row justify-center>
            <v-flex md6 justify-center>
              <v-layout column>
                <div class="title text-xs-center my-2">
                  Input Kebersihan Lingkungan Usaha
                </div>
                <v-select :items="KLUOptions" v-model="item.KLU">
                </v-select>
                <back-and-forth @next="nextStep" @prev="prevStep" />
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="6">
        <v-container>
          <v-layout row justify-center>
            <v-flex md6 justify-center>
              <v-layout column>
                <div class="title text-xs-center my-2">
                  Input Zona Parkir
                </div>
                <v-select :items="ZPOptions" v-model="item.ZP">
                </v-select>
                <back-and-forth @next="nextStep" @prev="prevStep" />
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="7">
        <v-container>
          <v-layout row justify-center>
            <v-flex md6 justify-center>
              <v-layout column>
                <div class="title text-xs-center my-2">
                  Input Usaha Pendukung
                </div>
                <v-select :items="UPOptions" v-model="item.UP">
                </v-select>
                <back-and-forth @next="nextStep" @prev="prevStep" />
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="8">
        <v-container>
          <v-layout row justify-center>
            <v-flex md6 justify-center>
              <v-layout column>
                <div class="title text-xs-left my-2">
                  Data Yang Anda Masukan...
                </div>
                <v-list two-line>
                  <v-list-tile v-for="(reviewItem, idx) in reviewDataList" :key="`review-item-${idx}`">
                    <v-list-tile-content>
                      <v-list-tile-sub-title>{{reviewItem.fieldName}}</v-list-tile-sub-title>
                      <v-list-tile-title>{{reviewItem.value}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
                <div class="text-xs-left">
                  <v-btn large dark color="amber darken-4" @click="save">Simpan</v-btn>
                  <v-btn large dark color="grey" @click="prevStep">Kembali</v-btn>
                </div>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>

    </v-stepper-items>
  </v-stepper>
</template>

<script>
import {
  PKOptions,
  JPOptions,
  AJOptions,
  KLUOptions,
  ZPOptions,
  UPOptions
} from '@/model/util'
import { create, format } from '@/model/drow'
import BackAndForth from '@/components/BackAndForth.vue'

export default {
  name: 'DataAdd',
  components: {
    BackAndForth
  },
  data () {
    return {
      el: 0,
      PKOptions,
      JPOptions,
      AJOptions,
      KLUOptions,
      ZPOptions,
      UPOptions,
      stepperContentHeight: '500px',
      item: {
        nama: '',
        PK: 1,
        JP: 1,
        AJ: 1,
        KLU: 1,
        ZP: 1,
        UP: 1
      }
    }
  },
  computed: {
    namaJalanValid () {
      return this.item.nama.length > 0
    },
    reviewDataList () {
      const formatted = format(this.item)
      return [
        {
          fieldName: 'Nama Lokasi',
          value: this.item.nama
        },
        {
          fieldName: 'Pusat Keramaian',
          value: formatted._pk
        },
        {
          fieldName: 'Jumlah Pesaing',
          value: formatted._jp
        },
        {
          fieldName: 'Akses Jalan',
          value: formatted._aj
        },
        {
          fieldName: 'Kebersihan Lokasi Usaha',
          value: formatted._klu
        },
        {
          fieldName: 'Zona Parkir',
          value: formatted._zp
        },
        {
          fieldName: 'Usaha Pendukung',
          value: formatted._up
        }
      ]
    }
  },
  methods: {
    nextStep () {
      this.el = parseInt(this.el) + 1
    },
    prevStep () {
      if (parseInt(this.el) === 0) {
        return
      }
      this.el = parseInt(this.el) - 1
    },
    save () {
      let item = { ...this.item }
      let toSave = create(item)
      this.$db.put(toSave)
      this.$router.push('/app/data')
    }
  }
}
</script>

<style>

</style>

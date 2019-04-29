<template>
  <div class="text-xs-center">
    <v-btn
      @click="$emit('next')"
      large
      dark
      icon
      color="amber darken-3">
      <v-icon>done</v-icon>
    </v-btn>
    <v-btn
      @click="$emit('prev')"
      large
      dark
      icon
      color="grey"
    >
      <v-icon>arrow_back</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'BackAndForth'
}
</script>

<style>

</style>

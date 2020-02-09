<template>
  <div>
    <h3>课程列表</h3>
  </div>
</template>

<script lang="ts">
// import {Vue,Component} from 'vue-property-decorator';
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Main extends Vue{
  data = {}
  
  async fetch(){
    const res = await this.$axios.get('/apis/courses')
    console.log(res)
  }

  created () {
    this.fetch()
  }
}
</script>

<template>
  <div>
    <avue-crud 
      :data="data" 
      :option="option"
      @row-save="add"
      @row-update="edit"
      @row-del="remove"
      ></avue-crud>
  </div>
</template>

<script lang="ts">
// import {Vue,Component} from 'vue-property-decorator';
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Main extends Vue{
  data = []
  option={
    title:'课程管理',
    // page:false,
    align:'center',
    menuAlign:'center',
    column:[
      {label:'课程名称',prop:'name'},
      {label:'课程封面图',prop:'cover'}
    ]
  }

  async add(form,done){
    console.log(form)
    await this.$axios.post('/apis/courses',form)
    this.$message.success('新增成功')
    this.fetch()
    done()
  }
  async edit(form,index,done){
    const data = {
      id:form._id,
      name:form.name,
      cover:form.cover
    }
    await this.$axios.put(`/apis/courses`,data)
    this.$message.success('更新成功')
    console.log(index)
    this.fetch()
    done()
  }
  async remove(form){
    try{
      await this.$confirm('是否确认删除？')
    }catch{
      return
    }
    await this.$axios.delete(`/apis/courses`,{id:form._id})
    this.$message.success('删除成功')
    this.fetch()
  }
  async fetch(){
    const res = await this.$axios.get('/apis/courses')
    console.log(res)
    this.data = res
  }

  created () {
    this.fetch()
  }
}
</script>

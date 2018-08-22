<template>
<div class="vue-konva">
    
    <v-stage ref="stage" :config="configKonva">
    <v-layer ref="baseLayer">
      <Target v-for="target in targets" :key="target.id" :target="target"></Target>
    </v-layer>
    <v-layer ref="dragLayer" :config="configDragLayer">
      <Target v-for="target in targetsDragging" :key="target.id" :target="target"></Target>
    </v-layer>
  </v-stage>
    
    </div>
</template>
<script>
export default {
name: 'VueKonva'

}

</script>
<style>

</style>
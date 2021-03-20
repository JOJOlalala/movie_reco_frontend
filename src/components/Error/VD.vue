<!--
    Created by Vian Chen on 10/18/18.
    Copyright 2018 Vian Chen. All rights reserved.
-->

<template>
  <div class="DesignContainer">
    <div class="DesignContentWrapper"><slot /></div>
    <div class="DesignBackground" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class VD extends Vue {}
</script>

<style scoped lang="stylus">
.DesignContainer {
    width: 100%;
    position: relative;
    z-index: 2;
}

.DesignBackground {
    position: absolute;
    z-index: -100;
    top: 0;
    left: 0;
    width: 100%;
    height: 420px;
    background-color: #1976D2;
}
</style>

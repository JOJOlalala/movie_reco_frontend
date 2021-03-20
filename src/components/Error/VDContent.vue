<!--
    Created by Vian Chen on 10/20/18.
    Copyright 2018 Vian Chen. All rights reserved.
-->

<template>
  <v-card class="VDContentContainer" flat><slot /></v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class VDContent extends Vue {}
</script>

<style scoped lang="stylus">
.VDContentContainer {
    width: 100%;
    min-height: 580px;
    padding-bottom: 20px;
}
</style>

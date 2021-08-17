<template>
  <b-container class="default-background-center">
    <div class="row constructor-standings-row">
      <div class="col">
        <ConstructorTable />
      </div>
    </div>
  </b-container>
</template>

<script>
import ConstructorTable from '../../components/Standings/ConstructorStandings/ConstructorTable.vue'

export default {
  name: 'ConstructorStandings',
  components: {
    ConstructorTable
  }
}
</script>

<style scoped>
  .constructor-standings-row {
    display: inline-block;
  }
</style>

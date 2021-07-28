<template>
  <b-container class="default-background-center smaller-div">
    <div class="row last-race-row">
      <div class="col">
        <ConstructorTable />
      </div>
    </div>
  </b-container>
</template>

<script>
import ConstructorTable from '../../components/Standings/ConstructorStandings/ConstructorTable.vue'

export default {
  name: 'ConstructionStandings',
  components: {
    ConstructorTable
  }
}
</script>

<style scoped>

.smaller-div {
  width: 70%;
}

</style>

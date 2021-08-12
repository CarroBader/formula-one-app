<template>
  <b-container class="default-background-center">
    <div class="row constructionstandings-row">
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

.constructionstandings-row {
  display: inline-block;
  margin-bottom: 3em;
}

</style>

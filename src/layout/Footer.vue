<template>
  <footer class="footer">
    <p class="footer-text" style="padding: 0; margin: 0;">
      Lights out and away we go is unofficial and is not associated in any way
      with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE
      WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of
      Formula One Licensing B.V.
    </p>
    <p class="footer-text" style="padding: 0; margin: 0;">
      The information provided in this website is for general information
      purposes only. Lights out and away we go claims no rights to these data.
    </p>
    <p class="footer-text-copy">Copyright &copy; {{ this.year }}</p>
  </footer>
</template>

<script>
import generalVarsMixin from '../mixins/generalVarsMixin'

export default {
  name: 'Footer',
  mixins: [generalVarsMixin],
}
</script>

<style scoped></style>

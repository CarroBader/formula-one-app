<template>
	<footer>
		<p class="footer-text">Copyright &copy; {{ this.year }}</p>
	</footer>
</template>

<script>
import generalVarsMixin from "../mixins/generalVarsMixin"

export default {
	name: "Footer",
	mixins: [generalVarsMixin],
}
</script>

<style scoped></style>

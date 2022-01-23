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

<style scoped>
footer {
	text-align: center;
	background-color: #121212;
	border-top: 1px solid rgb(255 13 13 / 79%);
	bottom: 0;
	position: fixed;
	width: 100%;
	color: #fff;
}

.footer-text {
	margin-top: 1.5em;
}
</style>

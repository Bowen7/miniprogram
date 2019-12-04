<template>
	<div>123</div>
</template>

<script>
export default {
	name: "Test",
	components: {},
	data: function() {
		return {};
	},
	mounted() {
		console.log(this.$options._scopeId, this._uid);
	}
};
</script>

<style scoped></style>

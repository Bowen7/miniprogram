<template>
	<div class="text" v-on:click="handleClick">
		{{ text }}
		{{ text1 }}
		<div class="test">123</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			text: "hello",
			text1: 1
		};
	},
	mounted() {
		console.log(this.$options._scopeId, this);
	},
	methods: {
		handleClick() {
			this.text = "hell";
			this.text1 = 2;
		}
	},
	watch: {
		text(val) {
			console.log(val);
		}
	}
};
</script>

<style scoped>
.text {
	color: red;
}
.test {
	color: green;
}
</style>

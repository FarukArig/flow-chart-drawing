<template>
    <div id="toolbar">
        <h1>Toolbar</h1>
        <div class="label">
            <span class="text">Text</span>
            <input v-model="text" type="text" />
        </div>
    </div>
</template>

<script>
export default {
    name: "toolbar",
    props: ["elements", "activeItemId"],
    data() {
        return {
            text: null,
        };
    },
    watch: {
        text: function (n) {
            this.elements.forEach((el) => {
                if (el.id == this.activeItemId) {
                    el.text = n;
                }
            });
        },
        activeItemId: function () {
            this.text = this.getElement.text;
        },
    },
    computed: {
        getElement() {
            return this.elements.find((el) => el.id == this.activeItemId);
        },
    },
};
</script>

<style></style>

<template>
    <div id="home">
        <Sidebar @addElement="addElement" />
        <Designer
            :elements="elements"
            @setActive="setActive"
            :activeItemId="activeItemId"
        />
    </div>
</template>

<script>
import Designer from "../components/Designer.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
    name: "Home",
    components: {
        Sidebar,
        Designer,
    },
    data() {
        return {
            elements: [],
            activeItemId: null,
        };
    },
    methods: {
        addElement(type) {
            this.elements.push({
                id: Math.floor(Math.random() * 10000),
                text: type,
                type: type,
            });
        },
        setActive(id) {
            this.activeItemId = id;
        },
    },
    mounted() {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 8 && this.activeItemId) {
                this.elements = this.elements.filter(
                    (x) => x.id !== this.activeItemId
                );
            }
        });
    },
};
</script>

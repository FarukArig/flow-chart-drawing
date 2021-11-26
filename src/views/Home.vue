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
import $ from "jquery";
import elements from "../data/elements";
require("jquery-ui/ui/widgets/resizable");

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
            if (this.activeItemId != null)
                $("#canvas #element-wrap-" + this.activeItemId).resizable(
                    "destroy"
                );
            this.activeItemId = id;
            const type = elements[this.elements.find((x) => x.id == id).type];
            $("#canvas #element-wrap-" + id).resizable({
                ...type.extraResizableOption,
                minWidth: type.style.minWidth.replace("px", ""),
                minHeight: type.style.minHeight.replace("px", ""),
            });
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

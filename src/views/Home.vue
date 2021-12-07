<template>
    <div id="home">
        <Sidebar @addElement="addElement" />
        <Designer
            ref="designer"
            :elements="elements"
            @setActive="setActive"
            :activeItemId="activeItemId"
        />
        <Toolbar />
    </div>
</template>

<script>
import Designer from "../components/Designer.vue";
import Sidebar from "../components/Sidebar.vue";
import Toolbar from "../components/Toolbar.vue";
import $ from "jquery";
import elements from "../data/elements";
require("jquery-ui/ui/widgets/resizable");

export default {
    name: "Home",
    components: {
        Sidebar,
        Designer,
        Toolbar
    },
    data() {
        return {
            elements: [],
            activeItemId: null,
        };
    },
    methods: {
        addElement(type) {
            const id = Math.floor(Math.random() * 10000);
            this.elements.push({
                id: id,
                text: type,
                type: type,
            });
            this.setActive(id);
        },
        setActive(id) {
            if(this.activeItemId == id) return;
            if (this.activeItemId != null){
                $("#canvas #element-wrap-" + this.activeItemId).resizable(
                    "destroy"
                );
            }
            this.activeItemId = id;
            const type = elements[this.elements.find((x) => x.id == id).type];
            setTimeout(() => {
                $("#canvas #element-wrap-" + id).resizable({
                    containment: "#canvas",
                    ...type.extraResizableOption,
                    minWidth: type.style.minWidth.replace("px", ""),
                    minHeight: type.style.minHeight.replace("px", ""),
                    resize: () => this.$refs.designer.setForceRecomputeCounter(),
                });
            }, 50);
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

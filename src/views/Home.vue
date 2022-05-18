<template>
    <div id="home">
        <Header ref="header" @createModule="createModule" @save="save" />
        <div class="content">
            <Sidebar
                @addElement="addElement"
                @addModule="addModule"
                :modules="modules"
            />
            <Designer
                ref="designer"
                :elements="elements"
                @setActive="setActive"
                @setPassive="setPassive"
                :activeItemId="activeItemId"
                @reOrderByRecommend="reOrderByRecommend"
            />
            <Toolbar :elements="elements" :activeItemId="activeItemId" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Designer from "../components/Designer.vue";
import Sidebar from "../components/Sidebar.vue";
import Toolbar from "../components/Toolbar.vue";
import $ from "jquery";
import elements from "../data/elements";
import Header from "../components/Header.vue";
require("jquery-ui/ui/widgets/resizable");

export default {
    name: "Home",
    components: {
        Sidebar,
        Designer,
        Toolbar,
        Header,
    },
    data() {
        return {
            elements: [],
            modules: [],
            activeItemId: null,
            orderElements: elements,
        };
    },
    methods: {
        addElement(type) {
            let id = 0;
            do {
                id = Math.floor(Math.random() * 10000);
            } while (this.elements.find((x) => x.id == id));
            this.elements.push({
                id: id,
                text: type,
                type: type,
                input: 0,
                output: 0,
                inputLimit: elements[type].input,
                outputLimit: elements[type].output,
                attributes: [],
            });
            this.setActive(id);
        },
        addModule(id) {
            const selectedModule = this.modules.find((x) => x.id == id);
            if (selectedModule) {
                const id = Math.floor(Math.random() * 10000);
                this.elements.push({
                    id: id,
                    text: selectedModule.text,
                    type: "module",
                    input: 0,
                    output: 0,
                    inputLimit: selectedModule.input,
                    outputLimit: selectedModule.output,
                });
                this.setActive(id);
            }
        },
        setActive(id) {
            if (this.activeItemId == id) return;
            if (this.activeItemId != null) {
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
                    resize: () =>
                        this.$refs.designer.setForceRecomputeCounter(),
                });
            }, 50);
        },
        setPassive() {
            this.activeItemId = null;
        },
        createModule(name) {
            var errorFlag = false;
            var moduleInput = null;
            var moduleOutput = null;
            if (this.elements.length > 0) {
                this.elements.forEach((el) => {
                    if (el.input == 0 && el.output == 0) {
                        errorFlag = true;
                    }
                    if (el.input == 0) {
                        if (moduleInput === null) {
                            moduleInput = elements[el.type].input;
                        } else {
                            errorFlag = true;
                        }
                    }
                    if (el.output == 0) {
                        if (moduleOutput === null) {
                            moduleOutput = elements[el.type].output;
                        } else {
                            errorFlag = true;
                        }
                    }
                });
            } else {
                errorFlag = true;
            }
            if (errorFlag) {
                this.$message.error(
                    "Diyagram modül oluşturmak için uygun değil"
                );
            } else {
                const id = Math.floor(Math.random() * 10000);
                this.modules.push({
                    id: id,
                    text: name,
                    type: "module",
                    input: moduleInput,
                    output: moduleOutput,
                    elements: this.elements,
                });
                this.$refs.header.closePopup();
                this.$message.success("Modül oluşturuldu");
            }
        },
        save(title) {
            axios.post("/Add", {
                title,
                elements: this.elements,
                lines: this.$refs.designer.lines,
                stepList: this.$refs.designer
                    .getTypeList(
                        this.elements.find((y) => y.output == 0).id,
                        []
                    )
                    .reverse(),
            });
        },
    },
    mounted() {
        document.addEventListener("keydown", (e) => {
            if (e.target.tagName.toUpperCase() !== "INPUT") {
                if (e.keyCode == 8 && this.activeItemId) {
                    this.elements = this.elements.filter(
                        (x) => x.id !== this.activeItemId
                    );
                    this.$refs.designer.lines =
                        this.$refs.designer.lines.filter((line) => {
                            return (
                                line.output.elementId !== this.activeItemId &&
                                line.input.elementId !== this.activeItemId
                            );
                        });
                    this.activeItemId = null;
                }
            }
        });
    },
};
</script>

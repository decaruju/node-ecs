export default {
    fields: {
        size: [10, 10],
        src: "",
        textureInfo: null,
    },
    onCreate(entity, ecs) {
        if (!this.src) return;
        this.textureInfo = ecs.gl.createTexture(this.src);
    }
}

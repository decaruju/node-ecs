export default {
    fields: {
        animations: {},
    },
    methods: {
        addAnimation(property, endValue, ticks) {
            if (!this.animations[property])
                this.animations[property] = []
            this.animations[property].push({
                endValue,
                totalTicks: ticks,
                currentTick: 0.0,
                property,
            })
        }
    }
};

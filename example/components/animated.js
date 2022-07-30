export default {
    fields: {
        animations: [],
    },
    methods: {
        addAnimation(property, endValue, ticks) {
            this.animations.push({
                endValue,
                totalTicks: ticks,
                currentTick: 0.0,
                property,
            })
        }
    }
};

import ecs from 'ecs';

ecs.registerEntity(
    "Sun",
    {
        components: {
            Sprite: { size: [60, 60], src: "./src/resources/orb_blue.png" },
            TrackedPosition: {
                getPosition() {
                    const timezoneOffset = (new Date()).getTimezoneOffset();
                    const time = -(new Date().getTime()/1000/60 - timezoneOffset)/60/24*2*Math.PI -Math.PI/2;
                    return [Math.cos(time)*200 + 500, Math.sin(time)*200 + 500]
                },
            },
            Transform: {},
        },
    }
)

ecs.registerEntity(
    "Ground",
    {
        components: {
            Sprite: { size: [1000, 1000], src: "./src/resources/wall.png" },
            TrackedPosition: {
                getPosition() {
                    return [500, 0]
                },
            },
            Transform: {},
        },
    }
)

import Player from './entities/player.js';
import Platform from './entities/platform.js';
import Gate from './entities/gate.js';

export default function(game) {
    game.addEntity(Player, {Transform: {position: [500, 500]}});
    for (let i = 0; i < 100; i++) {
        const height = -400*i+Math.random()*800
        game.addEntity(Platform, {Transform: {position: [Math.random()*600+200, height]}});
        game.addEntity(Gate, {Transform: {position: [0, height]}});
    }
}

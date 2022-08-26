import Bird from './entities/bird.js';
import Pipe from './entities/pipe.js';
import OutOfBounds from './entities/out_of_bounds.js';
import Gate from './entities/gate.js';

export default function(game) {
    game.addEntity("Bird", {Transform: {position: [500, 500]}});
    game.addEntity("OutOfBounds", {Transform: {position: [0, 1000]}});
    game.addEntity("OutOfBounds", {Transform: {position: [0, 0]}});
    for (let i = 0; i < 100; i++) {
        const height = Math.random()*800
        game.addEntity("Pipe", {Transform: {position: [i*500+800, height-500]}});
        game.addEntity("Gate", {Transform: {position: [i*500+800, height+150]}});
        game.addEntity("Pipe", {Transform: {position: [i*500+800, height+800]}});
    }
}

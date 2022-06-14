import ECS from "../../ecs/ecs.js"
import movementSystem from "./systems/movement.js"

window.onload = () => {
    const base = new ECS()
    
    base.registerSystem(movementSystem)

    function createCreep(x = 0, y = 0, vx = 0, vy = 0) {
        const creep = base.createEntity()
        base.addComponent(creep, 'position', { x, y })
        base.addComponent(creep, 'velocity', { x: vx, y: vy })
        base.addComponent(creep, 'size', { width: 0, height: 0 })
        base.addComponent(creep, 'color', { r: 0, g: 0, b: 0, a: 0 })
        return creep
    }
    
    createCreep(0, 0, 1, 0)
    createCreep(0, 0, 0, 1)
    
    base.advance(100)
    
    console.log(base.debug_dump())
    
    debugger
}

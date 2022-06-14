import ECS from "../../ecs/ecs.js"

window.onload = () => {
    const base = new ECS()

    function createCreep(x, y) {
        const creep = base.createEntity()
        base.addComponent(creep, 'position', { x, y })
        base.addComponent(creep, 'velocity', { x: 0, y: 0 })
        base.addComponent(creep, 'size', { width: 0, height: 0 })
        base.addComponent(creep, 'color', { r: 0, g: 0, b: 0, a: 0 })
        return creep
    }

    debugger
}

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

    const a = createCreep(0, 0)
    const b = createCreep(20, 20)
    
    console.log(base.debug_dump())

    base.removeComponentsByType(a, 'position')
    base.removeComponentsByType(b, 'position')
    base.removeComponentsByType(a, 'velocity')
    
    console.log(base.debug_dump())
    debugger
}

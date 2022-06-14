export default function movementSystem(ecs, deltaTime) {
    const movables = ecs.getComponentsByType('velocity')
    movables.forEach(movable => {
        const positions = ecs.getEntityComponentsByType(movable.__entity, 'position')
        positions.forEach(position => {
            position.x += movable.x * deltaTime
            position.y += movable.y * deltaTime
        })
    })
}

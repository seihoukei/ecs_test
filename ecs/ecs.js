export default class ECS {
    static #createId() {
        return crypto.randomUUID()
    }
    
    static #createComponent(type, data) {
        const component = Object.create(null)
        Object.assign(component, data)
        component.__type = type
        return component
    }
    
    // main storage, map of entities with sets of components
    #entities = new Map()
    
    // search storage for entity with given component
    #glossary = new Map()
    
    #addEntityToStorage(entity, data = new Set()) {
        this.#entities.set(entity, data)
    }
    
    #getEntityFromStorage(entity) {
        return this.#entities.get(entity)
    }
    
    #removeEntityFromStorage(entity) {
        this.#entities.delete(entity)
    }
    
    #getComponentGlossary(type, create = false) {
        let componentGlossary = this.#glossary.get(type)
        if (!componentGlossary && create) {
            componentGlossary = new Map()
            this.#glossary.set(type, componentGlossary)
        }
        return componentGlossary
    }
    
    #getEntityFromComponentGlossary(type, entity, create = false) {
        const componentGlossary = this.#getComponentGlossary(type, create)
        let components = componentGlossary.get(entity)
        if (!components && create) {
            components = new Set()
            componentGlossary.set(entity, components)
        }
        return components
    }
    
    #addComponentToStorage(component, entity) {
        const components = this.#getEntityFromStorage(entity)
        components.add(component)
        component.__entity = entity
        
        return component
    }
    
    #removeComponentFromStorage(component) {
        const entityComponents = this.getEntityComponents(component.__entity)
        entityComponents.delete(component)
    }

    #addComponentToGlossary(component) {
        const list = this.#getEntityFromComponentGlossary(component.__type, component.__entity, true)
        list.add(component)
    }
    
    #removeComponentFromGlossary(component) {
        const componentGlossary = this.#getComponentGlossary(component.__type)
        const components = componentGlossary.get(component.__entity)
        components.delete(component)
        if (components.size === 0) {
            componentGlossary.delete(component.__entity)
            if (componentGlossary.size === 0)
                this.#glossary.delete(component.__type)
        }
    }
    
    createEntity() {
        const entity = ECS.#createId()
        this.#addEntityToStorage(entity)
        return entity
    }
    
    loadEntity(entity, componentsData) {
        const components = new Set(componentsData)
        this.#addEntityToStorage(entity, components)
    }
    
    deleteEntity(entity) {
        const components = this.#getEntityFromStorage(entity)
        components.forEach(component => {
            this.removeComponent(component)
        })
        this.#removeEntityFromStorage(entity)
    }
    
    getEntityComponents(entity) {
        return this.#getEntityFromStorage(entity)
    }
    
    getEntityComponentsByType(entity, type) {
        return this.#getEntityFromComponentGlossary(type, entity)
    }
    
    addComponent(entity, type, data) {
        const component = ECS.#createComponent(type, data)
        
        this.#addComponentToStorage(component, entity)
        this.#addComponentToGlossary(component)
    }
    
    removeComponent(component) {
        this.#removeComponentFromGlossary(component)
        this.#removeComponentFromStorage(component)
    }
    
    removeComponentsByType(entity, type) {
        const componentGlossary = this.#getComponentGlossary(type)
        const components = componentGlossary.get(entity)
        if (components) {
            components.forEach(component => {
                this.removeComponent(component)
            })
        }
    }
    
    getSaveData() {
        const result = {}
        this.#entities.forEach((entityComponents, entityId) => {
            result[entityId] = []
            entityComponents.forEach(component => {
                result[entityId].push(component)
            })
        })
        return result
    }
    
    loadData(data) {
    
    }
    
    debug_dump() {
        const result = {
            entities : {},
            glossary : {}
        }
        
        this.#entities.forEach((entityComponents, entityId) => {
            result.entities[entityId] = []
            entityComponents.forEach(component => {
                result.entities[entityId].push(component)
            })
        })
        
        this.#glossary.forEach((components, type) => {
            result.glossary[type] = {}
            components.forEach((components, entity) => {
                result.glossary[type][entity] = {}
                components.forEach(component => {
                    result.glossary[type][entity][component.__type] = component
                })
            })
        })
        
        return result
    }
}

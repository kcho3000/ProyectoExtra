import create from "zustand"

export const [usarEstado] = create(set => ({
    nombre: "",
    email: "",
    
    seteo: (text) => 
        set(state => ({
            nombre: state.nombre = text
        })),
    
    seteoEmail: (text) => 
        set(state => ({
            email: state.email = text
        })),
}))
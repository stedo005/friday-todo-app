export interface Todos {
    id: string
    content: string
    statusDone: boolean
    onItemChange: () => void
}
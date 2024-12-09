export interface Horse {
    id: string
    name: string
    color: string
    condition: number
    progress: number
}

export interface RaceProgram {
    distance: number
    horses: Horse[]
}

export interface RootState {
    horseListState: Horse[]
    programState: RaceProgram[]
}
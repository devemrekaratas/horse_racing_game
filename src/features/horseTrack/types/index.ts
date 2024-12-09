import type { Horse, RaceProgram } from "@/types";

export interface RaceState {
    isRunning: boolean
    racePrograms: RaceProgram[]
    currentRound: number
    raceResults: RaceResult[]
}

export interface RaceResult {
    horse: Horse[]
}

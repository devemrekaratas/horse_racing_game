import type { Horse } from "@/types";

export interface ResultListState {
    rounds: Round[]
}

export interface Round {
    round: number
    distance: number
    horses: Horse[]
}

export interface RoundResult {
    round: number
    distance: number
    horse: Horse
}
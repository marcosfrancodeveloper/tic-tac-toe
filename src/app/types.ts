/**
 * Define um tipo que pode conter `T` ou `null`
 */
export type Nullable<T> = T | null;

/**
 * Define o jogador `X` ou `O`
 */
export enum Player {
  X = 'X',
  O = 'O'
}

/**
 * Interface para representar o quadrado a ser preenchido pelo jogador
 * @interface ISquare
 * @member id Código identificador
 * @member player Jogador registrado
 */
export interface ISquare {
  id: number;
  player: Nullable<Player>;
}

/**
 * Interface para representar o estado atual do jogo
 * @interface IGameState
 * @member board Lista de quadrados
 * @member activePlayer Jogador ativo
 * @member turnCount Quantidade de jogadas realizadas na partida
 * @member isGameRunning Se o jogo está em andamento
 * @member isGameOver Se o jogo foi finalizado
 * @member winner Jogador vencedor
 */
export interface IGameState {
  board: ISquare[];
  activePlayer: Player;
  turnCount: number;
  isGameRunning: boolean;
  isGameOver: boolean;
  winner: Nullable<Player>;
}

/**
 * Matriz de combinações de vitórias, considerando
 * linhas, colunas e diagonais
 * @type {Array<number[]>}
 */
export const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

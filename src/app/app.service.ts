import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  IGameState,
  ISquare,
  Nullable,
  Player,
  winningCombinations
} from "./types";

@Injectable()
export class AppService {
  private _gameState$: BehaviorSubject<IGameState> = new BehaviorSubject<IGameState>({} as IGameState);

  constructor() {
    this._newGame();
  }

  /**
   * Recupera o estado atual do jogo
   * @returns Observable do estado do jogo
   */
  get gameState(): Observable<IGameState> {
    return this._gameState$.asObservable();
  }

  /**
   * Recupera o estado atual do jogo
   * returns Estado do jogo
   */
  private get _gameState(): IGameState {
    return this._gameState$.value;
  }

  /**
   * Retorna se o jogo acabou
   * @returns Verdadeiro se a quantidade de jogadas for maior que 8 ou houver um vencedor
   */
  get isGameOver(): boolean {
    return (this._gameState.turnCount > 8
      && this._gameState.winner === null)
      || this._gameState.winner !== null;
  }

  /**
   * Retorna se o jogo está em andamento
   * @returns Verdadeiro se o jogo está em andamento
   */
  get isGameRunning(): boolean {
    return this._gameState.isGameRunning;
  }

  /**
   * Inicia o jogo atualizando o estado do jogo
   */
  runGame(): void {
    this._gameState$.next({
      ...this._gameState,
      isGameRunning: true
    })
  }

  /**
   * Reinicia o estado do jogo
   */
  resetGame(): void {
    this._newGame();
  }

  /**
   * Inicia o estado do jogo com as configurações default
   */
  private _newGame(): void {
    this._gameState$.next({
      board: this._createBoard(),
      activePlayer: Player.X,
      turnCount: 1,
      isGameRunning: false,
      isGameOver: false,
      winner: null
    });
  }

  /**
   * Cria o array de objetos do board
   * @returns Lista de objetos
   */
  private _createBoard(): ISquare[] {
    return Array.from(
      { length: 9 },
      (_, index) => (<ISquare>{ id: index, player: null })
    );
  }

  /**
   * Atualiza o valor no quadrado, define o jogador ativo e atualiza o estado do jogo
   * @param item Quadrado selecionado
   */
  changePlayerTurn(item: ISquare): void {
    const board: ISquare[] = this._updateSquareInTheBoard(item);
    const activePlayer: Player =
      this._gameState$.value.activePlayer === Player.X
        ? Player.O
        : Player.X;

    this._gameState$.next({
      ...this._gameState,
      board,
      activePlayer: activePlayer,
      turnCount: this._gameState.turnCount + 1
    });

    this._checkIsGameOver();
  }

  /**
   * Verifica se houve um vencedor,
   * atualiza o estado e define se o jogo será encerrado ou não
   */
  private _checkIsGameOver(): void {
    const winner: Nullable<Player> = this._checkWinner();
    this._gameState$.next({
      ...this._gameState,
      winner
    });
    this._gameState$.next({
      ...this._gameState,
      isGameOver: this.isGameOver,
      isGameRunning: !this.isGameOver
    });
  }

  /**
   * Atualiza o objeto do quadrado
   * @param item Quadrado selecionado
   * @returns Lista de quadrados
   * @private
   */
  private _updateSquareInTheBoard(item: ISquare): ISquare[] {
    return this._gameState.board.map(square =>
      (square.id === item.id)
        ? {
          ...square,
          player: this._gameState.activePlayer
        } : square
    );
  }

  /**
   * Verifica se existe um ganhador de acordo com a matriz de combinações de vitórias
   * @returns Jogador vitorioso ou `null` caso não haja um vencedor
   */
  private _checkWinner(): Nullable<Player> {
    for (let combination of winningCombinations) {
      let [a, b, c] = combination;
      let board = this._gameState.board;

      if (
        board[a].player
        && board[a].player === board[b].player
        && board[a].player === board[c].player
      ) {
        return board[a].player;
      }
    }

    return null;
  }
}

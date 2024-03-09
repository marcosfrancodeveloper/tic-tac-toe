import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { IGameState, ISquare } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  game$!: Observable<IGameState>;

  constructor(private _appService: AppService) {}

  ngOnInit(): void {
    this.game$ = this._appService.gameState;
  }

  /**
   * Atualiza quadrado e muda jogador
   * @param square Quadrado selecionado
   */
  changePlayer(square: ISquare): void {
    this._appService.runGame();

    if (this._appService.isGameRunning && square.player === null) {
      this._appService.changePlayerTurn(square);
    }
  }

  /**
   * Reinicia o jogo
   */
  reset(): void {
    this._appService.resetGame();
  }
}

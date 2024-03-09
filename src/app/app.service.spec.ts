import { AppService } from './app.service';
import { Player } from './types';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve iniciar um novo jogo corretamente', () => {
    service.runGame();
    expect(service.isGameRunning).toBe(true);
    expect(service.isGameOver).toBe(false);
  });

  it('deve reiniciar o jogo corretamente', () => {
    service.runGame();
    service.resetGame();
    expect(service.isGameRunning).toBe(false);
    expect(service.isGameOver).toBe(false);
  });

  it('deve verificar corretamente se o jogo acabou', () => {
    expect(service.isGameOver).toBe(false);
    service.changePlayerTurn({ id: 0, player: null });
    service.changePlayerTurn({ id: 1, player: null });
    service.changePlayerTurn({ id: 2, player: null });
    service.changePlayerTurn({ id: 3, player: null });
    service.changePlayerTurn({ id: 4, player: null });
    service.changePlayerTurn({ id: 5, player: null });
    service.changePlayerTurn({ id: 6, player: null });
    service.changePlayerTurn({ id: 7, player: null });
    service.changePlayerTurn({ id: 8, player: null });
    expect(service.isGameOver).toBe(true);
  });
});

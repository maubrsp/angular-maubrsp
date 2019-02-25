import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Logger } from '../../logger/ng-logger';

/**
 * Exemplo base para criação de APP_INITIALIZER usefactory
 */
export function PreloaderInitializer(logger: Logger): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      logger.log(
        'Exemplo base para criação de APP_INITIALIZER usefactory :: iniciando'
      );
      const delay: number = 50;
      setTimeout(() => {
        logger.log(
          'Exemplo base para criação de APP_INITIALIZER usefactory :: completo'
        );
        resolve(true);
      }, delay);
    });
  };
}

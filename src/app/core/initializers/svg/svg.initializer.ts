import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Logger } from '../../logger/ng-logger';

export class SvgEndpoint {
  getConfig() {
    return { svg_sprites: [`./assets/images/sprite.svg`] };
  }
}

/**
 * Carregamento do SVG com sprite e injeção no HTML para crossbrowser
 * TODO - implementar o carregamento e injeção de multiplos sprites
 */
export function SvgInitializer(
  httpClient: HttpClient,
  configs: any,
  logger: Logger
): () => Promise<any> {
  const svgLogger = 'svg_load';
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      logger.log(
        'incializando carregamento de sprite svg',
        configs.getConfig().svg_sprites
      );
      logger.time(svgLogger);

      const promisses: Array<any> = [];

      configs.getConfig().svg_sprites.forEach(element => {
        promisses.push(loadAsset(element, httpClient, logger, svgLogger));
      });

      logger.log('sprites a carregar: ', promisses);

      Promise.all(promisses)
        .then(data => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

/**
 * Carrega arquivo SVG e injeta no html
 * @param url
 * @param httpClient
 * @param logger
 * @param timeLoggerName
 */
const loadAsset = (
  url: string,
  httpClient: HttpClient,
  logger: Logger,
  timeLoggerName: string
) => {
  return new Promise((resolve, reject) => {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');
    // determina a url do sprite
    const svgUrl = url;
    // carrega svg
    const currentLogger = timeLoggerName + '_' + url;

    logger.log('iniciando carregamento de: ', currentLogger);
    logger.time(currentLogger);

    httpClient.get(svgUrl, { headers, responseType: 'text' }).subscribe(
      data => {
        const svgDiv = document.createElement('div');
        svgDiv.id = 'svg-sprites';
        svgDiv.style.display = 'none';

        svgDiv.innerHTML = data;
        document.getElementsByTagName('body')[0].appendChild(svgDiv);
        logger.log('finalizando carregamento de: ', currentLogger);
        logger.timeEnd(timeLoggerName);

        resolve();
      },
      error => {
        logger.timeEnd(currentLogger);
        logger.error(error);

        reject(error);
      }
    );
  });
};

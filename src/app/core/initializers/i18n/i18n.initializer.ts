import { TranslateService } from '@ngx-translate/core';
import { Logger } from '../../logger/ng-logger';

/**
 * Inicialização do processo de internacionalização, configurações e carregamento dos arquivos de linguas
 */
export function I18nInitializer(
  translate: TranslateService,
  configs: any,
  logger: Logger,
): () => Promise<any> {
  const i18nLogger = 'i18n_load';
  logger.log('incializando carregamento de lingua');
  logger.time(i18nLogger);
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        //adiciona as linguas existentes na aplicação
        translate.addLangs(configs.languages);
        //determina lingua padrão
        translate.setDefaultLang(configs.defaultLanguage);

        //detecta e define a lingua a ser utilizada
        let browserLang = translate.getBrowserLang();

        browserLang = browserLang.match(configs.optionsRegex)
          ? browserLang
          : configs.useLanguage;

        translate.use(browserLang).subscribe(
          value => {
            logger.log('arquivo de lingua carregado para: ', browserLang);
            logger.timeEnd(i18nLogger);
            resolve();
          },
          error => {
            logger.error('erro carregando arquivos de i18n: ', error);
            reject();
          },
        );
      } catch (e) {
        logger.error('erro carregando arquivos de i18n: ', e);
        reject();
      }
    });
  };
}

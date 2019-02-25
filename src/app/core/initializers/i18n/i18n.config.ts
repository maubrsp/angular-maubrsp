import { Injectable } from '@angular/core';

/**
 * Configurações para injeção na inicialização do i18n
 * TODO: criar interface nas libs para padronizar a criação de classes de configuração como esta
 */
@Injectable()
export class I18nConfiguration {
  get defaultLanguage() {
    return 'pt_br';
  }
  get languages() {
    return ['pt_br', 'en'];
  }
  get useLanguage() {
    return 'pt_br';
  }
  get optionsRegex() {
    return /en|fr/;
  }
}

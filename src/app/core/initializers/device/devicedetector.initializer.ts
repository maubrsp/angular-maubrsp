import { Logger } from '../../logger/ng-logger';

/**
 * Get device minimal data to specialise view and interactions
 */
export function deviceDetectorInitializer(logger: Logger): Promise<any> {
  return new Promise((resolve, reject) => {
    const ua = navigator.userAgent.toLowerCase();
    const result: object = { browser: '', type: 'tv, mobile, desktop' };

    if (/(tv|smartv)/.test(ua)) result['type'] = 'tv';
    else if (
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        ua
      )
    )
      result['type'] = 'tablet';
    else if (
      /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(
        ua
      )
    )
      result['type'] = 'phone';
    else if (/(crawl|googlebot|screenshot)/.test(ua)) result['type'] = 'robo';
    else result['type'] = 'desktop';

    result['browser'] = ua;

    logger.log('Device detector ready ::', JSON.stringify(result));

    resolve(result);
  });
}

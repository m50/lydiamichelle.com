import * as api from './api';
import * as opti from './optimize';

describe('api', () => {
  describe('Series', () => {
    const { getSeriesSlugs, getAllSeries, getSeriesBySlug } = api;
    it('getSeriesSlugs()', async () => {
      const series = await getSeriesSlugs();
      expect(series.length).toBeGreaterThan(0);
      expect(series).toContain('test.md');
    });

    it('getSeriesBySlug()', async () => {
      /* @ts-expect-error */
      opti.optimizeImage = jest.fn();
      opti.optimizeImage
        /* @ts-expect-error */
        .mockReturnValueOnce(Promise.resolve('/images/800/1-hanging-off-the-bed.webp'))
        .mockReturnValueOnce(Promise.resolve('/images/400/1-hanging-off-the-bed.webp'));
      const series = await getSeriesBySlug('test.md');
      expect(series.published).toBeFalsy();
      expect(series.body).toBe('\nThis is for automated tests. DO NOT DELETE. DO NOT PUBLISH.\n');
      expect(series.title).toBe('Test');
      expect(series.images[0].image.full).toBe('/images/800/1-hanging-off-the-bed.webp');
      expect(series.images[0].image.original).toBe('/images/1-hanging-off-the-bed.webp');
      expect(opti.optimizeImage).toHaveBeenCalledTimes(2);

      // Test caching
      const start = new Date().getTime();
      await getSeriesBySlug('test.md');
      const elapsed = new Date().getTime() - start;
      expect(elapsed).toBeLessThan(5);
    });

    it('getAllSeries()', async () => {
      /* @ts-expect-error */
      opti.optimizeImage = jest.fn();
      const series = await getAllSeries();
      expect(series.length).toBeGreaterThanOrEqual(1);

      // Test caching
      const start = new Date().getTime();
      await getAllSeries();
      const elapsed = new Date().getTime() - start;
      expect(elapsed).toBeLessThan(5);
    });
  });

  describe('Commissions', () => {
    const { getCommissionSlugs, getAllCommissions, getCommissionBySlug } = api;
    it('getCommissionSlugs()', async () => {
      const series = await getCommissionSlugs();
      expect(series.length).toBeGreaterThan(0);
      expect(series).toContain('test.json');
    });

    it('getCommissionBySlug()', async () => {
      const commission = await getCommissionBySlug('test.json');
      expect(commission).not.toBeNull();

      expect(commission?.title).toBe('Test');
      expect(commission?.open).toBe(false);
      expect(commission?.workSizes[0].title).toBe('Size 1');

      // Test caching
      const start = new Date().getTime();
      await getCommissionBySlug('test.json');
      const elapsed = new Date().getTime() - start;
      expect(elapsed).toBeLessThan(5);
    });

    it('getAllCommissions()', async () => {
      /* @ts-expect-error */
      opti.optimizeImage = jest.fn();
      const series = await getAllCommissions();
      expect(series.length).toBeGreaterThanOrEqual(1);

      // Test caching
      const start = new Date().getTime();
      await getAllCommissions();
      const elapsed = new Date().getTime() - start;
      expect(elapsed).toBeLessThan(5);
    });
  });
});

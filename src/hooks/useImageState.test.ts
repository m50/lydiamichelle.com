import { getSeriesBySlug } from 'lib/node-only/api';
import { renderHook, act } from '@testing-library/react-hooks';
import { slug } from 'lib/helpers';
import useImageState from './useImageState';

describe('useImageState()', () => {
  const getSeries = async () => getSeriesBySlug('greenly');

  it('runs', async () => {
    const series = await getSeries();
    const { result } = renderHook(() => useImageState(series));

    expect(result.current.selectedImage).toBeNull();
  });

  it('gets image from hash', async () => {
    const series = await getSeries();
    window.location.hash = '#hanging-off-the-bed';
    const { result } = renderHook(() => useImageState(series));

    const expected = {
      image: {
        full: '/build/800/1-hanging-off-the-bed.b4cdd1.webp',
        half: '/build/400/1-hanging-off-the-bed.b4cdd1.webp',
        original: '/images/1-hanging-off-the-bed.webp',
      },
      medium: 'Pen and Ink',
      title: 'Hanging Off the Bed',
      wip: true,
    };
    expect(result.current.selectedImage).not.toBeNull();
    expect(result.current.selectedImage).toEqual(expected);
  });

  it('onOutsideClick removes hash', async () => {
    const series = await getSeries();
    window.location.hash = '#hanging-off-the-bed';
    const { result } = renderHook(() => useImageState(series));

    act(() => result.current.onOutsideClick());

    expect(window.location.hash).toBe('');
    expect(result.current.selectedImage).toBeNull();
  });

  it('onImageClick picks an image', async () => {
    const series = await getSeries();
    const { result } = renderHook(() => useImageState(series));

    act(() => result.current.onImageClick(series.images[0]));

    expect(window.location.hash).toBe(`#${slug(series.images[0].title)}`);
    expect(result.current.selectedImage).toBe(series.images[0]);
  });
});

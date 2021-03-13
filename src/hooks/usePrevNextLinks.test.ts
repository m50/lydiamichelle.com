import { renderHook } from '@testing-library/react-hooks';
import usePrevNextLinks from './usePrevNextLinks';

describe('usePrevNextLinks()', () => {
  it('gets prev and next links', async () => {
    const arr = [
      { slug: 'test' },
      { slug: 'test2' },
      { slug: 'test3' },
    ];
    const { result } = renderHook(() => usePrevNextLinks('', {
      currentIdx: 1,
      arr,
      current: arr[1],
      accessor: 'slug',
    }));

    expect(result.current.prevLink).toBe('/test');
    expect(result.current.nextLink).toBe('/test3');
  });

  it('wraps prev link', async () => {
    const arr = [
      { slug: 'test' },
      { slug: 'test2' },
      { slug: 'test3' },
    ];
    const { result } = renderHook(() => usePrevNextLinks('', {
      currentIdx: 0,
      arr,
      current: arr[0],
      accessor: 'slug',
    }));

    expect(result.current.prevLink).toBe('/test3');
    expect(result.current.nextLink).toBe('/test2');
  });

  it('wraps next link', async () => {
    const arr = [
      { slug: 'test' },
      { slug: 'test2' },
      { slug: 'test3' },
    ];
    const { result } = renderHook(() => usePrevNextLinks('', {
      currentIdx: 2,
      arr,
      current: arr[2],
      accessor: 'slug',
    }));

    expect(result.current.prevLink).toBe('/test2');
    expect(result.current.nextLink).toBe('/test');
  });
});

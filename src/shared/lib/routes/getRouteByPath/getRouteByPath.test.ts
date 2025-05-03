import { getRouteByPath } from './getRouteByPath';

jest.mock('../../../config/routes', () => ({
  routePatterns: {
    HOME: '/home',
    PROJECT_DETAIL: '/projects/:id',
    NOT_FOUND: '*',
  },
  AppRoutes: {
    HOME: 'HOME',
    PROJECT_DETAIL: 'PROJECT_DETAIL',
    NOT_FOUND: 'NOT_FOUND',
  },
}));

describe('getRouteByPath', () => {
  it('should match static route', () => {
    const pathname = '/home';
    const result = getRouteByPath(pathname);

    expect(result).toBe('HOME');
  });

  it('should match dynamic route', () => {
    const pathname = '/projects/123';
    const result = getRouteByPath(pathname);

    expect(result).toBe('PROJECT_DETAIL');
  });

  it('should return NOT_FOUND for unknown path', () => {
    const pathname = '/some/unknown/route';
    const result = getRouteByPath(pathname);

    expect(result).toBe('NOT_FOUND');
  });

  it('should skip wildcard patterns', () => {
    const pathname = '/wildcard-test';

    const result = getRouteByPath(pathname);

    expect(result).toBe('NOT_FOUND');
  });
});

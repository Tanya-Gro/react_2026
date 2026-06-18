import { router } from 'app';

test('Router should be initialized with route tree', () => {
  expect(router).toBeDefined();
  expect(router.routeTree).toBeDefined();
});

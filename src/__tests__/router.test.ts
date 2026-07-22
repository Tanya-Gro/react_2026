import { router } from 'app/router';

test('Router should be initialized with route tree', () => {
  expect(router).toBeDefined();
  expect(router.routeTree).toBeDefined();
});

import { createDeployagramSuite, type DeployagramSuiteOptions } from '@deployagram/core';

/**
 * The Mocha adapter for @deployagram/core: wires the suite into Mocha's hooks. The core finds the Collector that the
 * run started, and marks each test's end. Mocha's test title is the test name alone, so markers match the other
 * adapters.
 *
 * The adapter does not stop the environment. Mocha runs every test file in one process, and the Collector belongs to
 * the run, which test/with-stack.ts stops.
 */
export function useDeployagram(options: DeployagramSuiteOptions) {
  const suite = createDeployagramSuite(options);

  before(async function () {
    this.timeout(180_000);
    await suite.beforeAll();
  });
  beforeEach(() => suite.beforeEach());
  afterEach(function () {
    return suite.afterEach(this.currentTest?.title ?? '');
  });

  return suite;
}

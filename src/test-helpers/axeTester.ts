import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

type ViolationsResult = Awaited<ReturnType<AxeBuilder['analyze']>>['violations'];

export async function axeViolations(page: Page): Promise<ViolationsResult> {
	const accessibilityScanResults = await new AxeBuilder({ page }).include('#root').analyze();
	return accessibilityScanResults.violations;
}

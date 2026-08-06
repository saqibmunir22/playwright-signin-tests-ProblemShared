import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.inventoryContainer).toBeVisible();
  }
}

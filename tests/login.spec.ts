import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users, errorMessages } from '../utils/testData';

test.describe('Sign-In', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('successful login with valid credentials', async () => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('locked user sees an error message', async () => {
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.expectErrorMessage(errorMessages.locked);
  });

  test('invalid password shows credential mismatch error', async () => {
    await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
    await loginPage.expectErrorMessage(errorMessages.invalidCredentials);
  });
});

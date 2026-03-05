import { expect, test } from "@playwright/test";

test("user can login and open problems page", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: /mlboost/i })).toBeVisible();

  await page.getByLabel("Email").fill("playwright@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByTestId("auth-submit").click();

  await expect(page).toHaveURL(/\/problems/);
  await expect(page.getByRole("heading", { name: /^problemset$/i })).toBeVisible();
});

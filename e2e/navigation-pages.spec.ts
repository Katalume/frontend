import { expect, test } from "@playwright/test";

test("all primary pages load and are not blank", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("navigation@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByTestId("auth-submit").click();

  const checks = [
    { link: "Problems", pathSuffix: "/problems", heading: /^problemset$/i },
    {
      link: "Contest",
      pathSuffix: "/competitions",
      heading: /^contest$/i,
    },
    { link: "Explore", pathSuffix: "/learn", heading: /^explore$/i },
    { link: "Discuss", pathSuffix: "/progress", heading: /^progress$/i },
  ];

  for (const item of checks) {
    await page.getByRole("link", { name: new RegExp(`^${item.link}$`, "i") }).click();
    await expect(page).toHaveURL(new RegExp(`${item.pathSuffix}$`));
    await expect(page.getByRole("heading", { name: item.heading })).toBeVisible();
  }
});

test("problem arena route opens from problems list", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("arena@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByTestId("auth-submit").click();

  await page.getByRole("link", { name: /^problems$/i }).click();
  await page.getByText("KNN Classifier on Iris", { exact: false }).first().click();

  await expect(page).toHaveURL(/\/problems\/knn-classifier-iris/);
  await expect(
    page.getByRole("heading", { name: /knn classifier on iris/i })
  ).toBeVisible();
});

test("category pills filter problems in problemset view", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("topics@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByTestId("auth-submit").click();

  await page.getByRole("link", { name: /^problems$/i }).click();
  await page.getByRole("button", { name: "Data Preprocessing" }).click();

  await expect(page.getByRole("heading", { name: /^problemset$/i })).toBeVisible();
  await expect(page.getByText("Data Preprocessing", { exact: false })).toBeVisible();
});

// @ts-check
const { test, expect } = require('@playwright/test');

test('can add a todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('buy some cheese');
  await newTodo.press('Enter');

  await expect(page.getByTestId('todo-title')).toHaveText(['buy some cheese']);
});
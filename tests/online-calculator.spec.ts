import { test, expect } from '@playwright/test';
import { CalculatorPage } from '../pageObjects/CalculatorPage';

test.describe('Calculator Sanity Tests', () => {
  let calculatorPage: CalculatorPage;

  test.beforeEach(async ({ page }) => {
    calculatorPage = new CalculatorPage(page);
    await calculatorPage.goto();
    await calculatorPage.resetAll();
  });

  test('Test Case 1: Clear Entry Data Test (mouse data entry)', async ({ page }) => {
    await calculatorPage.performCalculationByMouse(2, 'add', 2);
    await calculatorPage.clickButtonByName('add');
    await calculatorPage.clickButtonByName('one');
    await calculatorPage.clickButtonByName('clearButton');
    await calculatorPage.clickButtonByName('two');
    await calculatorPage.clickButtonByName('calculate');
    const result = await calculatorPage.getDisplayValue();
    expect(result).toBe('6');
  });

  test('Test Case 2: Clear All Data Test (keyboard data entry)', async ({ page }) => {
    await calculatorPage.performCalculationByKeyboard(2, '+', 2);
    await page.keyboard.type('+');
    await page.keyboard.type('1');
    await calculatorPage.resetAll();
    await page.keyboard.type('2');
    await page.keyboard.press('Enter');
    const result = await calculatorPage.getDisplayValue();
    expect(result).not.toBe('6');
    expect(result).toBe('2');
  });

  test('Test Case 3: Sum Test (mouse data entry)', async ({ page }) => {
    await calculatorPage.performCalculationByMouse(2, 'add', 2);
    const result = await calculatorPage.getDisplayValue();
    expect(result).toBe('4');
  });

  test('Test Case 4: Subtract Test (keyboard data entry)', async ({ page }) => {
    await calculatorPage.performCalculationByKeyboard(2, '-', 2);
    const result = await calculatorPage.getDisplayValue();
    expect(result).toBe('0');
  });

  test('Test Case 5: Multiply Test (mouse data entry)', async ({ page }) => {
    await calculatorPage.performCalculationByMouse(2, 'multiply', 2);
    const result = await calculatorPage.getDisplayValue();
    expect(result).toBe('4');
  });

  test('Test Case 6: Divide Test (keyboard data entry)', async ({ page }) => {
    await calculatorPage.performCalculationByKeyboard(2, '/', 2);
    const result = await calculatorPage.getDisplayValue();
    expect(result).toBe('1');
  });

  test('Test Case 7: Division by Zero Test (mouse data entry)', async ({ page }) => {
    await calculatorPage.performCalculationByMouse(2, 'divide', 0);
    const result = await calculatorPage.getDisplayValue();
    expect(result).toBe('Not a Number');
  });
});


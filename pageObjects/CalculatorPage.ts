import { expect, type Locator, type Page } from '@playwright/test';

export class CalculatorPage {
  readonly page: Page;
  private readonly displayInput;

  constructor(page: Page) {
    this.page = page;
    this.displayInput = this.page.locator('input.window[name="display"][aria-label="answer display"]');
  }

  async goto() {
    await this.page.goto('https://www.theonlinecalculator.com/');
    await expect(this.page).toHaveTitle('The Online Calculator | Basic Calculator');
    const heading = this.page.locator('h1[itemprop="name"].heading');
    await expect(heading).toHaveText('The Online Calculator™');
  }

  async resetAll() {
    const button = await this.page.locator('input[type="button"][name="clearButton"]');
    const buttonValue = await button.getAttribute('value');
    await button.click();

    if (buttonValue === 'CE') {
      await button.click();
    }

    await expect(this.page.getByLabel('answer display')).toHaveValue('');
  }

  async performCalculationByMouse(num1: number, operator: string, num2: number) {
    await this.clickButtonByName(this.getNumberButtonName(num1));
    await this.clickButtonByName(operator);
    await this.clickButtonByName(this.getNumberButtonName(num2));
    await this.clickButtonByName('calculate');
  }

  async performCalculationByKeyboard(num1: number, operator: string, num2: number) {
    await this.displayInput.click();
    await this.page.keyboard.type(num1.toString());
    await this.page.keyboard.type(operator);
    await this.page.keyboard.type(num2.toString());
    await this.page.keyboard.press('Enter');
  }
  async getDisplayValue() {
    return this.displayInput.inputValue();
  }

  async clickButtonByName(name: string) {
    await this.page.click(`input[type="button"][name="${name}"]`);
  }

  private getNumberButtonName(num: number): string {
    switch (num) {
      case 0: return "zero";
      case 1: return "one";
      case 2: return "two";
      case 3: return "three";
      case 4: return "four";
      case 5: return "five";
      case 6: return "six";
      case 7: return "seven";
      case 8: return "eight";
      case 9: return "nine";
      default: throw new Error("Button name not mapped for number: " + num);
    }
  }
}

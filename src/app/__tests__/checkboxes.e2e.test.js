const timeout = 5000;

describe('/ [Checkbox]', () => {
    let page;

    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:3030');
    }, timeout);

    it('should switch first checkbox on click', async () => {
      await page.waitForSelector('[data-taf-path="checkbox1"]');
      const checkbox = await page.$('[data-taf-path="checkbox1"]');

      let state = await checkbox.evaluate(el => el.getAttribute('aria-checked'));
      expect(state).toBe('false');

      await checkbox.click();

      state = await checkbox.evaluate(el => el.getAttribute('aria-checked'));
      expect(state).toBe('true');
    });

    it('should switch first checkbox on keyboard [Enter]', async () => {
      await page.waitForSelector('[data-taf-path="checkbox1"]');
      const checkbox = await page.$('[data-taf-path="checkbox1"]');
      checkbox.focus();

      let state = await checkbox.evaluate(el => el.getAttribute('aria-checked'));
      expect(state).toBe('true');

      await page.keyboard.press('Enter');

      state = await checkbox.evaluate(el => el.getAttribute('aria-checked'));
      expect(state).toBe('false');
    });

    it('should switch first checkbox on keyboard [Space]', async () => {
      await page.waitForSelector('[data-taf-path="checkbox1"]');
      const checkbox = await page.$('[data-taf-path="checkbox1"]');
      checkbox.focus();

      let state = await checkbox.evaluate(el => el.getAttribute('aria-checked'));
      expect(state).toBe('false');

      await page.keyboard.press('Space');

      state = await checkbox.evaluate(el => el.getAttribute('aria-checked'));
      expect(state).toBe('true');
    });

    it('should does not switch disabled checkbox on keyboard/click', async () => {
      await page.waitForSelector('[data-taf-path="checkbox2"]');
      const checkbox = await page.$('[data-taf-path="checkbox2"]');
      checkbox.focus();

      let state = await checkbox.evaluate(el => el.getAttribute('aria-checked'));
      expect(state).toBe('true');

      await page.keyboard.press('Enter');

      state = await checkbox.evaluate(el => el.getAttribute('aria-checked'));
      expect(state).toBe('true');

      await checkbox.click();

      state = await checkbox.evaluate(el => el.getAttribute('aria-checked'));
      expect(state).toBe('true');
    });
  },
  timeout
);

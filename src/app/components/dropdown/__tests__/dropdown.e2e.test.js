const timeout = 5000;

const dropdown1 = 'div[data-taf-path="dropdown1"]';
const dropdown1_list = 'div[data-taf-path="dropdown1"].open .dropdown-content';

const dropdown2 = 'div[data-taf-path="dropdown2"]';
const dropdown2_list = 'div[data-taf-path="dropdown2"].open .dropdown-content';

describe('[Dropdown]', () => {
    let page;

    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:3030');
    }, timeout);

    beforeEach(async () => {
      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    }, timeout);

    it('should open on click, close on blur', async () => {
      await page.waitForSelector(dropdown1);
      const dropdown = await page.$(dropdown1);
      dropdown.focus();
      await dropdown.click();

      let dropdownContent = await page.$(dropdown1_list, {
        visible: true
      });
      expect(dropdownContent).toBeTruthy();

      await page.$eval(dropdown1, e => e.blur());

      dropdownContent = await page.$(dropdown1_list, {
        visible: true
      });
      expect(dropdownContent).toBeFalsy();
    });

    it('should not open disabled dropdown', async () => {
      await page.waitForSelector(dropdown2);
      const dropdown = await page.$(dropdown2);
      dropdown.focus();
      await dropdown.click();

      let dropdownContent = await page.$(dropdown2_list, {
        visible: true
      });
      expect(dropdownContent).toBeFalsy();
    });

    it('should select some value', async () => {
      await page.waitForSelector(dropdown1);
      const dropdown = await page.$(dropdown1);
      dropdown.focus();
      await dropdown.click();

      let dropdownContent = await page.$(dropdown1_list, {
        visible: true
      });
      expect(dropdownContent).toBeTruthy();
      const item = await page.waitForSelector('[data-taf-path="item1"]');
      await item.click();

      dropdownContent = await page.$(dropdown1_list, {
        visible: true
      });
      expect(dropdownContent).toBeFalsy();
      const text = await page.$eval('[data-taf-path="dropdown1"] > .dropdown-caption', e => e.textContent);
      expect(text).toBe('Item 1');
    });

    it('should select some other value', async () => {
      await page.waitForSelector(dropdown1);
      const dropdown = await page.$(dropdown1);
      dropdown.focus();
      await dropdown.click();

      let dropdownContent = await page.$(dropdown1_list, {
        visible: true
      });
      expect(dropdownContent).toBeTruthy();
      const item = await page.waitForSelector('[data-taf-path="item_bold"]');
      await item.click();

      dropdownContent = await page.$(dropdown1_list, {
        visible: false
      });
      expect(dropdownContent).toBeFalsy();
      const text = await page.$eval('[data-taf-path="dropdown1"] > .dropdown-caption', e => e.textContent);
      expect(text).toBe('Item 6 with bold text');
    });

    it('should not select disabled value', async () => {
      await page.waitForSelector(dropdown1);
      const dropdown = await page.$(dropdown1);
      await page.$eval(dropdown1, e => e.blur());

      dropdown.focus();
      await dropdown.click();

      let dropdownContent = await page.$(dropdown1_list, {
        visible: true
      });
      expect(dropdownContent).toBeTruthy();
      const item = await page.waitForSelector('[data-taf-path="item2"]');
      await item.click();

      const text = await page.$eval('[data-taf-path="dropdown1"] > .dropdown-caption', e => e.textContent);
      expect(text).toBe('Item 2');
    });

    it('should select value by keyboard key up', async () => {
      await page.waitForSelector(dropdown1);
      const dropdown = await page.$(dropdown1);
      await page.$eval(dropdown1, e => e.blur());

      dropdown.focus();
      await dropdown.click();

      let dropdownContent = await page.$(dropdown1_list, {
        visible: true
      });

      expect(dropdownContent).toBeTruthy();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');

      dropdownContent = await page.$(dropdown1_list, {
        visible: false
      });
      expect(dropdownContent).toBeFalsy();
      const text = await page.$eval('[data-taf-path="dropdown1"] > .dropdown-caption', e => e.textContent);
      expect(text).toBe('Item 0');
    });

    it('should select value by keyboard key down', async () => {
      await page.waitForSelector(dropdown1);
      const dropdown = await page.$(dropdown1);
      await page.$eval(dropdown1, e => e.blur());

      dropdown.focus();
      await dropdown.click();

      let dropdownContent = await page.$(dropdown1_list, {
        visible: true
      });

      expect(dropdownContent).toBeTruthy();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      dropdownContent = await page.$(dropdown1_list, {
        visible: false
      });
      expect(dropdownContent).toBeFalsy();
      const text = await page.$eval('[data-taf-path="dropdown1"] > .dropdown-caption', e => e.textContent);
      expect(text).toBe('Item 4');
    });

    it('should not select an value on disabled dropdown', async () => {
      await page.waitForSelector(dropdown2);
      const dropdown = await page.$(dropdown2);
      dropdown.focus();
      await dropdown.click();
      const text = await page.$eval('[data-taf-path="dropdown1"] > .dropdown-caption', e => e.textContent);
      expect(text).toBe('Item 2');
    });

  },
  timeout
);

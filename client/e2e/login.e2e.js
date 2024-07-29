describe('Login Screen', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('should display the login screen', async () => {
      await expect(element(by.placeholder('Email'))).toBeVisible();
      await expect(element(by.placeholder('Password'))).toBeVisible();
      await expect(element(by.text('Login'))).toBeVisible();
      await expect(element(by.text('Go to Register'))).toBeVisible();
    });
  
    it('should login and navigate to Main screen', async () => {
      await element(by.placeholder('Email')).typeText('test@example.com');
      await element(by.placeholder('Password')).typeText('password123');
      await element(by.text('Login')).tap();
  
      await expect(element(by.text('Main Screen Content'))).toBeVisible();
    });
  
    it('should navigate to Register screen when "Go to Register" is pressed', async () => {
      await element(by.text('Go to Register')).tap();
      await expect(element(by.text('Register Screen Content'))).toBeVisible();
    });
  });
  
import { getLoginRoutePath } from '../../../../shared/config/routes';

describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit(getLoginRoutePath());
  });

  it('should display login form with correct  title and description', () => {
    cy.contains('Войти').should('be.visible');
    cy.contains(
      'Введите свой адрес эл. почты ниже, чтобы войти в свою учетную запись',
    ).should('be.visible');
  });

  it('should show email input on first step', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="email"]').should(
      'have.attr',
      'placeholder',
      'Адрес электронной почты',
    );
  });

  it('should validate email format', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('Некорректный email').should('be.visible');
  });

  it('should proceed to second step with valid email', () => {
    // Mock the auth API call
    cy.intercept('POST', '/auth', {
      statusCode: 200,
      body: {},
    }).as('authRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();

    // Wait for the auth request to complete
    cy.wait('@authRequest');

    // Verify we're on the second step
    cy.get('input[name="code"]').should('be.visible');
    cy.contains('Код подтверждения').should('be.visible');
  });

  it('should show resend code button with timer on second step', () => {
    // First get to the second step
    cy.intercept('POST', '/auth', {
      statusCode: 200,
      body: {},
    }).as('authRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.wait('@authRequest');

    // Check resend button
    cy.contains('Отправить повторно').should('be.visible');
    cy.contains('через 120').should('be.visible');
  });

  it('should complete login process with valid code', () => {
    // Mock both API calls
    cy.intercept('POST', '/auth', {
      statusCode: 200,
      body: {},
    }).as('authRequest');

    cy.intercept('POST', '/login', {
      statusCode: 200,
      body: {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
      },
    }).as('loginRequest');

    // First step
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.wait('@authRequest');

    // Second step
    cy.get('input[name="code"]').type('123456');
    cy.wait('@loginRequest');

    // Should redirect to home page after successful login
    cy.url().should('not.include', '/login');
  });

  it('should show error message for invalid code', () => {
    // Mock API calls
    cy.intercept('POST', '/auth', {
      statusCode: 200,
      body: {},
    }).as('authRequest');

    cy.intercept('POST', '/login', {
      statusCode: 400,
      body: {
        message: 'Неверный код подтверждения',
      },
    }).as('loginRequest');

    // First step
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.wait('@authRequest');

    // Second step with invalid code
    cy.get('input[name="code"]').type('000000');
    cy.wait('@loginRequest');

    // Should show error message
    cy.contains('Неверный код подтверждения').should('be.visible');
  });
});

import { test, expect } from '@playwright/test';

import { generateOrderCode } from '../support/helpers';

/// AAA - Arrange, Act, Assert
/// PAV - Preparar, Agir, Verificar
test.describe('Order Inquiry', () => {
    
    test.beforeEach(async ({ page }) => {
        //Arrange
        await page.goto('http://localhost:5173/');
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
        // Navigation
        await page.getByRole('link', { name: 'Consultar Pedido' }).click();
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    });

    test('should check an approved order', async ({ page }) => {
        
        // Test Data
        const order = 'VLO-NE93JO'

        // Act
        await page.getByTestId('order-id-input').fill(order);
        await page.getByTestId('search-order-button').click();

        // Assert
        const containerPedido = page.getByRole('paragraph')
        .filter({ hasText: /^Pedido$/ })
        .locator('..')

        await expect(containerPedido).toContainText(order, {timeout: 10_000})
        await expect(page.getByText('APROVADO')).toBeVisible()
    });

    test('a message should be displayed when the order is not found', async ({ page }) => {

        const order = generateOrderCode();


        // Act
        await page.getByTestId('order-id-input').fill(order);
        await page.getByTestId('search-order-button').click();
        

        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
            `);

    });
})

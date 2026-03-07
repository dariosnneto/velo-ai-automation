import { test, expect } from '@playwright/test';

test('should check an approved order', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    // Checkpoint 1: Check if the page is loaded
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    // Checkpoint 2: Click on the "Configure o Seu" button
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    //checkpoint 3: Check if the "Consultar Pedido" page is loaded
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
    //checkpoint 4: Fill the order id input
    await page.getByTestId('search-order-id').fill('VLO-NE93JO');

    await page.getByTestId('search-order-button').click();

    await expect(page.getByText('PedidoVLO-NE93JOAPROVADO')).toBeVisible();
    await expect(page.getByTestId('order-result-id')).toContainText('VLO-NE93JO');

    await expect(page.getByTestId('order-result-status')).toBeVisible();
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});
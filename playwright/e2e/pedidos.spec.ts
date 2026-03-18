import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert
/// PAV - Preparar, Agir, Verificar

test('should check an approved order', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    // Navigation
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
    
    // Act
    await page.getByTestId('order-id-input').fill('VLO-NE93JO');
    await page.locator('//button[text()="Buscar Pedido"]').click();
    //await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    // Assert
    
    await expect(page.getByText('Número do Pedido')).toBeVisible({timeout: 10_000});
    await expect(page.getByTestId('order-result-id')).toContainText('VLO-NE93JO');

    await expect(page.getByTestId('order-result-status')).toBeVisible();
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
}); 
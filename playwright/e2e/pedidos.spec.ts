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
    await page.getByTestId('search-order-id').fill('VLO-NE93JO');
    await page.getByTestId('search-order-button').click();

    // Assert
    await expect(page.getByText('PedidoVLO-NE93JOAPROVADO')).toBeVisible();
    await expect(page.getByTestId('order-result-id')).toContainText('VLO-NE93JO');
    await expect(page.getByTestId('order-result-status')).toBeVisible();
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});
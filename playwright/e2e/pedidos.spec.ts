import { test, expect } from '@playwright/test';
import { generateOrder } from '../support/helpers';

/// AAA - Arrange, Act, Assert

test.describe('Order Inquiry', () => {

    test.beforeEach(async ({ page }) => {
        // Arrange
        await page.goto('http://localhost:5173/');
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

        await page.getByRole('link', { name: 'Consultar Pedido' }).click();
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
    })

    test('should check an approved order', async ({ page }) => {

        //Test Data
        const order = 'VLO-NE93JO'


        // Act
        await page.getByTestId('order-id-input').fill(order);
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();

        // Assert
        // const containerPedido = page.getByRole('paragraph')
        //     .filter({ hasText: /^Pedido$/ })
        //     .locator('..')

        // await expect(containerPedido).toContainText(order, { timeout: 10000 })

        // await expect(page.getByText('APROVADO')).toBeVisible()



          await expect(page.getByTestId('order-lookup-container')).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: VLO-NE93JO
            - img
            - text: APROVADO
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: Lunar White
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: aero Wheels
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: Netinho Automation
            - paragraph: Email
            - paragraph: netinhotester@dev.com
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

    })

    test('A message should be displayed when the request is not found', async ({ page }) => {

        const order = generateOrder()


        await page.getByTestId('order-id-input').fill(order);
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();

        const title = page.getByRole('heading', { name: 'Pedido não encontrado' })
        await expect(title).toBeVisible()

        const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })
        await expect(message).toBeVisible()

        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
            `);

    })
})

import { test, expect } from '@playwright/test'
import mocks from '../mock/HelpTOC.json'

test.describe('Tree element', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/entities', (route) =>
            route.fulfill({
                status: 200,
                body: JSON.stringify(mocks.entities),
            })
        )

        await page.route('**/topLevelIds', (route) =>
            route.fulfill({
                status: 200,
                body: JSON.stringify(mocks.topLevelIds),
            })
        )
    })

    test('Should check title', async ({ page }) => {
        await page.goto('http://127.0.0.1:3000')

        await expect(page).toHaveTitle(/Tree Playground/)
    })

    test('Should display a placeholder until data is loaded', async ({
        page,
    }) => {
        await page.goto('http://127.0.0.1:3000')

        await expect(page.getByTestId('placeholder')).toBeAttached()
    })

    test('Should display a list of top-level items', async ({ page }) => {
        await page.goto('http://127.0.0.1:3000')

        await expect(
            page.getByTestId('level0 has-children').first()
        ).toBeAttached()
    })

    test('Should not display elements with class level1, level2, or level3', async ({
        page,
    }) => {
        await page.goto('http://127.0.0.1:3000')

        await expect(
            page.getByTestId('level0 has-children').first()
        ).toBeAttached()

        await expect(page.getByTestId('level1').first()).not.toBeAttached()

        await expect(
            page.getByTestId('level1 has-children').first()
        ).not.toBeAttached()

        await expect(page.getByTestId('level2').first()).not.toBeAttached()

        await expect(
            page.getByTestId('level2 has-children').first()
        ).not.toBeAttached()

        await expect(page.getByTestId('level3').first()).not.toBeAttached()

        await expect(
            page.getByTestId('level3 has-children').first()
        ).not.toBeAttached()
    })

    test('Should display elements with class level1 after clicking on an element with class level0 etc.', async ({
        page,
    }) => {
        await page.goto('http://127.0.0.1:3000')

        await expect(
            page.getByTestId('level0 has-children').first()
        ).toBeAttached()

        await page
            .locator('div')
            .filter({ hasText: /^Getting started$/ })
            .click()

        await expect(page.getByText('Accessibility')).toBeAttached()

        await page.getByText('IntelliJ IDEA overview').click()

        await expect(
            page.locator('div').filter({ hasText: /^User interface$/ })
        ).toBeAttached()
    })

    test('Should have the "active" class on the selected element.', async ({
        page,
    }) => {
        await page.goto('http://127.0.0.1:3000')

        await page
            .locator('div')
            .filter({ hasText: /^Getting started$/ })
            .click()

        await expect(
            page.locator('div').filter({ hasText: /^Getting started$/ })
        ).toHaveClass(/active/)

        await page.getByText('IntelliJ IDEA overview').click()

        await expect(
            page.getByTestId('level1 has-children').first()
        ).toHaveClass(/active/)

        await page
            .locator('div')
            .filter({ hasText: /^User interface$/ })
            .click()

        await expect(
            page.locator('div').filter({ hasText: /^User interface$/ })
        ).toHaveClass(/active/)
    })
    test('Should have a special highlight on child nodes of the active node at the first level or deeper.', async ({
        page,
    }) => {
        await page.goto('http://127.0.0.1:3000')

        await page
            .locator('div')
            .filter({ hasText: /^Getting started$/ })
            .click()
        await page.getByText('IntelliJ IDEA overview').click()

        await expect(
            page.locator('div').filter({ hasText: /^User interface$/ })
        ).toHaveClass(/lastActive/)

        await expect(
            page.locator('div').filter({ hasText: /^Support and assistance$/ })
        ).toHaveClass(/lastActive/)
    })

    test('Should allow the theme to be changed upon clicking the switch.', async ({
        page,
    }) => {
        await page.goto('http://127.0.0.1:3000')

        await expect(page.getByTestId('app-container')).toHaveClass(/light/)
        await expect(page.getByTestId('tree-container')).toHaveClass(/light/)
        await expect(page.getByTestId('placeholder')).toHaveClass(/light/)

        await page.getByTestId('theme-switch-checkbox').click()

        await expect(page.getByTestId('app-container')).toHaveClass(/dark/)
        await expect(page.getByTestId('tree-container')).toHaveClass(/dark/)
        await expect(page.getByTestId('placeholder')).toHaveClass(/dark/)
        await expect(
            page.locator('div').filter({ hasText: /^Getting started$/ })
        ).toHaveClass(/dark/)

        await page.getByTestId('theme-switch-checkbox').click()

        await expect(
            page.locator('div').filter({ hasText: /^Getting started$/ })
        ).toHaveClass(/light/)
        await expect(page.getByTestId('app-container')).toHaveClass(/light/)
        await expect(page.getByTestId('tree-container')).toHaveClass(/light/)
    })
})

test('Should display a retry button on backend failure.', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000')

    await expect(page.getByText('Error during loadingTry Again')).toBeAttached()

    await page.route('**/entities', (route) =>
        route.fulfill({
            status: 200,
            body: JSON.stringify(mocks.entities),
        })
    )

    await page.route('**/topLevelIds', (route) =>
        route.fulfill({
            status: 200,
            body: JSON.stringify(mocks.topLevelIds),
        })
    )

    await page.getByRole('button', { name: 'Try Again' }).click()

    await expect(page.getByTestId('level0 has-children').first()).toBeAttached()
})

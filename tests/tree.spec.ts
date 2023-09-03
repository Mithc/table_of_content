import { test, expect } from '@playwright/test'

test('Should check title', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000')

    await expect(page).toHaveTitle(/Tree Playground/)
})

test('Should display a placeholder until data is loaded', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000')

    await expect(page.getByTestId('placeholder')).toBeAttached()
})

test('Should display a list of top-level items', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000')

    await expect(
        page
            .getByTestId('level0')
            .first()
            .or(page.getByTestId('level0 has-children').first())
    ).toBeAttached()
})

test('Should not display elements with class level1, level2, or level3', async ({
    page,
}) => {
    await page.goto('http://127.0.0.1:3000')

    await expect(
        page
            .getByTestId('level0')
            .first()
            .or(page.getByTestId('level0 has-children').first())
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

// test('  Should display elements with class level1 after clicking on an element with class level0.', async ({
//     page,
// }) => {
//     await page.goto('http://127.0.0.1:3000')
//
//     await expect(page.getByTestId('level0 has-children').first()).toBeAttached()
//
//     await page.getByTestId('level0 has-children').first().click()
//
//     await expect(
//         page
//             .getByTestId('level1')
//             .first()
//             .or(page.getByTestId('level1 has-children').first())
//     ).toBeAttached()
//
//     await page.getByTestId('level1 has-children').first().click()
//
//     await expect(page.getByTestId('level2').first()).toBeAttached()
//
//     await page.getByTestId('level2 has-children').first().click()
//
//     await expect(page.getByTestId('level3').first()).not.toBeAttached()
// })

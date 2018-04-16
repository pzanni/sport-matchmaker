import { defineFeature, loadFeature } from 'jest-cucumber'
import puppeteer from 'puppeteer'

const feature = loadFeature('./src/tests/features/Rockingrackets.feature')

defineFeature(feature, (test) => {
  let browser
  let page

  beforeEach(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  test('Landing on default page', async ({ given, when, then }) => {
    given('I go to rockingrackets website', async () => {
      await page.goto('http://rockingrackets.com/')
    })

    then('It has a title', async () => {
      const title = await page.title()
      expect(title).toBeTruthy()
    })
  })
})

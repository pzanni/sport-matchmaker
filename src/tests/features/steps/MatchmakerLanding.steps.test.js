import { defineFeature, loadFeature } from 'jest-cucumber'
import puppeteer from 'puppeteer'

const feature = loadFeature('./src/tests/features/MatchmakerLanding.feature')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000

defineFeature(feature, (test) => {
  let browser
  let page

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true, slowMo: 500 })
    page = await browser.newPage()
  })

  test('Landing on non-login page', ({ given, when, then }) => {
    given('I go to matchmaker website', async () => {
      await page.goto('http://localhost:3000/')
    })

    then('It has a header indicating where to sign in', async () => {
      await page.waitForSelector('.landing') // '.' -> class '#' -> id
      const textContent = await page.$eval('body', el => el.textContent)       //Suoraan kurssimatskusta pöllitty
      expect(textContent.includes('Sign In')).toBe(true)
    })
  })

  afterAll(async () => {
    await browser.close()
  })
})

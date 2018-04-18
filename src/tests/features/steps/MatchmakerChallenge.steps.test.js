import { loadFeature, defineFeature } from 'jest-cucumber'
import puppeteer from 'puppeteer'

const feature = loadFeature('./src/tests/features/MatchmakerChallenge.feature')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000

const FORM_SELECTOR = '.formInput'
const EMAIL_SELECTOR = '.emailInput'
const PW_SELECTOR = '.pwInput'
const SUBMIT_LOGIN_SELECTOR = '.MuiButtonBase-root-197'
const OPPONENTS_BUTTON = 'div.MuiGrid-typeItem-39:nth-child(3) > a:nth-child(1) > button:nth-child(1)'
const HOME_PAGE_ROOT_DIV_SELECTOR = '.homeRoot'

const INDIVIDUAL_USER_USERNAME = '.individualUserName'
const INDIVIDUAL_USER_LINK = '.individualUserLink'


//--> page.$(...) === page.$$(...)[0]
//--> page.$(...) === page.$$(...)[0]
defineFeature(feature, (test) => {
  let browser
  let page

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true, slowMo: 20 })
    page = await browser.newPage()
  })

  test('Check other player', ({ given, when, then, pending }) => {
    given('I log into matchmaker page', async () => {
      await page.goto('http://localhost:3000/')
      await page.click(EMAIL_SELECTOR)
      await page.keyboard.type('8antonm@gmail.com')
      await page.click(PW_SELECTOR)
      await page.keyboard.type('asdasd')
      await page.click(SUBMIT_LOGIN_SELECTOR)

      await page.waitFor(HOME_PAGE_ROOT_DIV_SELECTOR)
      const textContent = await page.$eval(HOME_PAGE_ROOT_DIV_SELECTOR, el => el.outerHTML)

      //Miksi console.log ei onnistu ??? dafuq
      //Miksi console.log ei onnistu ??? dafuq
      // console.log(textContent)

      expect(textContent).toContain('Kirjautuneen käyttäjän etusivu')
    })

    when('I choose all opponents', async () => {
      await page.waitFor(1000)
      await page.click(OPPONENTS_BUTTON)
      await page.waitFor(1000)
      await page.waitFor(INDIVIDUAL_USER_USERNAME)
      const firstUser = await page.$eval(INDIVIDUAL_USER_USERNAME, el => el.innerText)
      expect(firstUser).toBe('eliteati')

      // await page.waitFor(1000)
      // await page.click(USER_SELECTOR) // Hakee 1. pelaajan
      // await page.waitFor(2000)

      //Kuinka hakea taulusta pelaajia??
      // const users = await page.$$eval(USER_SELECTOR)
      // await page.click(USER_SELECTOR)
      // page.click(users[1])
      // const button = await page.$(USERS_BUTTON)
      // await page.click(button)
      // const users = await page.evaluate(() => {
      //   return document.querySelectorAll(USER_SELECTOR)
      // })
      // console.log(users)
      //expect -> list of all users
    })

    then('I can check individual users profile', async () => {
      await page.waitFor(1000)
      await page.waitFor(INDIVIDUAL_USER_LINK)
      await page.click(INDIVIDUAL_USER_LINK)
      await page.waitFor(1000)
      const textContent = await page.$eval('body', el => el.innerText)
      expect(textContent).toContain('User settings for')
    })
  })

  afterAll(async () => {
    await browser.close()
  })
})

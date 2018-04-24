import React from 'react'
import { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router'
import SignInPage, { SignInForm } from '../../components/loggedOutUser/SignIn'
import Users from '../../components/loggedInUser/Users'

const DEFAULT_STATE = ''
const EXAMPLE_EMAIL = 'anton@anni.goodteam'
const EXAMPLE_PASSWORD = 'bestapptofindpartners'

const getComponent = (props) => {
  <MemoryRouter>
    <SignInPage />
  </MemoryRouter>
}


describe('<SignInPage />', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    )
  })

  it('should render a header text to indicate a sign in form', () => {
    //Tiedosto exportetaan withRouterin kanssa (history)
    //--> react-routerin dokumentaatiossa vaaditaan MemoryRouteria ym. asian korjaamiseksi
    // console.log(wrapper.debug())
    const header = wrapper.find('h1').text()
    // console.log(header) // Sign In
    //HUOMIO - EI to.equal
    //https://stackoverflow.com/questions/39926517/typeerror-cannot-read-property-equal-of-undefined?answertab=votes#tab-top
    //käytetään vissiin jestin oletusasetuksia toBe / toEqual ym..?
    expect(header).toEqual('Sign in')
  })

  it('should render a sign in form', () => {
    expect(wrapper.containsMatchingElement(<SignInForm />)).toEqual(true)
  })

  it('shouldn´t render a list of users', () => {
    expect(wrapper.containsMatchingElement(<Users />)).toEqual(false)
  })
})

describe('<SignInForm />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    )
  })
  it('should render both email and password input fields and a submit button', () => {
    const inputFields = wrapper.find('input')
    const button = wrapper.find('button')
    // console.log(inputFields.first().html())
    // console.log(inputFields.last().html())
    expect(inputFields.length).toBe(2)
    expect(inputFields.first().html()).toContain("email")
    expect(inputFields.last().html()).toContain("password")

    // console.log(button.text())
    expect(button.length).toBe(1)
    expect(button.text()).toEqual("Submit")
  })

  it('should have a default state', () => {
    // MemoryRouter aiheuttaa ongelmia staten muunnoksessa (root component)
    // Yritetään kiertää tilannetta allaolevan linkin turvin
    // https://stackoverflow.com/questions/44979735/how-does-one-access-state-on-a-nested-react-component-wrapped-by-an-hoc?answertab=votes#tab-top

    const Form = wrapper.find('SignInForm').instance()
    const currentState = Form.state // HUOM EI FUNKTIO AINAKAAN INSTANSSISSA
    // const currentState = wrapper.find('SignInForm').instance().state
    expect(currentState.email).toBe(DEFAULT_STATE)
    expect(currentState.password).toBe(DEFAULT_STATE)
  })

  it('should be able to modify default state via input fields', () => {
    // Kurssisivujen menettely ei toiminut, githubista kuitenkin löytyi hieno ratkaisu
    // https://github.com/airbnb/enzyme/issues/1283
    const emailInputField = wrapper.find('input').first()
    emailInputField.instance().value = EXAMPLE_EMAIL
    emailInputField.simulate('change')
    const Form = wrapper.find('SignInForm').instance()
    expect(Form.state.email).toBe(EXAMPLE_EMAIL)
  })

  //TEST FAILS - onSubmit needs to be mocked. Wrapper component mandatory?
  // it('should revert to default state after clicking submitting', () => {
  //   const Form = wrapper.find('SignInForm').instance()
  //   const inputForm = wrapper.find('form')

  //   const emailInputField = wrapper.find('input').first()
  //   emailInputField.instance().value = EXAMPLE_EMAIL
  //   emailInputField.simulate('change')

  //   const passwordInputField = wrapper.find('input').last()
  //   passwordInputField.instance().value = EXAMPLE_PASSWORD
  //   passwordInputField.simulate('change')

  //   expect(Form.state.email).toBe(EXAMPLE_EMAIL)
  //   expect(Form.state.password).toBe(EXAMPLE_PASSWORD)

  //   // TODO - Kuinka mockata tämä - vaaditaan internet-yhteyttä - testi kaatuu tässä
  //   inputForm.simulate('submit')
  //   console.log(Form.state)

  // })
})
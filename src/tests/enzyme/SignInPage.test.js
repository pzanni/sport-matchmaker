import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import SignInPage from '../../components/loggedOutUser/SignIn'

describe('<SignInPage/>', () => {

  it('should render a header text to indicate a sign in form', () => {
    //Tiedosto exportetaan withRouterin kanssa (history)
    //--> react-routerin dokumentaatiossa vaaditaan MemoryRouteria ym. asian korjaamiseksi
    const wrapper = mount(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>)
    // console.log(wrapper.debug())
    const header = wrapper.find('h1').text()
    // console.log(header) // Sign In
    //HUOMIO - EI to.equal
    //https://stackoverflow.com/questions/39926517/typeerror-cannot-read-property-equal-of-undefined?answertab=votes#tab-top
    //käytetään vissiin jestin oletusasetuksia toBe / toEqual ym..?
    expect(header).toEqual('Sign in')
  })

  // it('should render a sign in form', () => {
  // })
})
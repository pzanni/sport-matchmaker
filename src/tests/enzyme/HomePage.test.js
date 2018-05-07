import React from 'react'
import { mount, shallow } from 'enzyme'
import Home from '../../components/loggedInUser/Home'
import { ConnectedChallengeList } from '../../components/loggedInUser/Challenge'

//TODO TODO TODO
//TODO TODO TODO
//TODO TODO TODO

//Connect -> seach SO for answer (solution looks like a similar one to <MemoryRouter/>)
describe('<Home/>', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<Home />)
  })

  it('should render a list of existing challenges', () => {
    console.log(wrapper.html())
  })
})

//TODO TODO TODO
//TODO TODO TODO
//TODO TODO TODO
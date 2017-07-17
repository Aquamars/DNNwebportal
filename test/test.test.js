import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Main from '../src/app/Main'
import SigninFrom from '../src/app/components/SigninFrom'

describe('a passing test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  })
})

it('should match <Main />', () => {
  const wrapper = shallow(<Main />)
  expect(wrapper.contains(<SigninFrom/>)).to.equal(true)
})
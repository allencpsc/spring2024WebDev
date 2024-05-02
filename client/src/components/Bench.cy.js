import React from 'react'
import { Bench } from './Bench'

describe('<Bench />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Bench />)
  })
})
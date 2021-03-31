// @flow
import React from 'react'
import 'react-native'
import { Text } from 'react-native'
import renderer from 'react-test-renderer'
import merge from 'lodash.merge'
import { Provider } from 'react-redux'

import configReducer, {
  changeServerEnvironment,
} from '../../store/config-store'
import { getStore } from '../../../__mocks__/static-data'
import { configStoreNotHydratedInstalledVcxInit } from '../../../__mocks__/data/config-store-mock-data'
import { Offline } from '../offline'
import offlineReducer, { offline } from '../offline-store'

const getConfigStoreInitialState = () =>
  configReducer(undefined, { type: 'INITIAL_TEST_ACTION' })

const  getProps = () => {
  return {
      offline: jest.fn(),
      overlay: true,
      vcxInitPoolStart: jest.fn(), 
      vcxInitStart: jest.fn(),
    }
}

const setup = (currentStore) => {
  const props = getProps()
  const component = renderer.create(
    <Provider store={currentStore}>
      <Offline {...props}></Offline>
    </Provider>)
  const instance: Offline = component.getInstance()

  return { props, component, instance }
}

describe('<Offline /> for offline case', () => {
  const currentState = getStore().getState()
    const store = { ...getStore(), getState() {
      return merge(
        {},
        {
          ...currentState,
          offline: {
            offline: true
          }
        })
      }
    }
  it('should match snapshot for offline case', () => {
    const { component } = setup(store)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('current text error for offline case', () => {
    const { component } = setup(store)
    let tree = component.root.findByType(Text).props.children
    expect(tree[0] + tree[1].props.children).toBe('No internet connection detected. Reconnect')
  })

  it('click is working for offline case', () => {
    const { component } = setup(store)
    expect(component.root.findAllByType(Text).length).toBe(2)
    let tree = component.root.findByType(Text).props.children
    tree[1].props.onPress()
    expect(component.root.findAllByType(Text).length).toBe(1)
  })
})

describe('<Offline /> for disconnect agent case', () => {
  const currentState = getStore().getState()
    const store = { ...getStore(), getState() {
      return merge(
        {},
        {
          ...currentState,
          config: {
            ...configStoreNotHydratedInstalledVcxInit,
            isVcxInitFailed: true,
          }
        })
      }
    }
  it('should match snapshot for disconnect agent case', () => {
    const { component } = setup(store)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('current text error for disconnect agent case', () => {
    const { component } = setup(store)
    let tree = component.root.findByType(Text).props.children
    expect(tree[0] + tree[1].props.children).toBe('No agent connection detected. Reconnect')
  })

  it('click is working for disconnect agent case', () => {
    const { component } = setup(store)
    let tree = component.root.findByType(Text).props.children
    tree[1].props.onPress()
  })
})

describe('<Offline /> for disconnect pool case', () => {
  const currentState = getStore().getState()
    const store = { ...getStore(), getState() {
      return merge(
        {},
        {
          ...currentState,
          config: {
            ...configStoreNotHydratedInstalledVcxInit,
            isVcxPoolInitFailed: true,
          }
        })
      }
    }
  it('should match snapshot for disconnect pool case', () => {
    const { component } = setup(store)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('current text error for disconnect pool case', () => {
    const { component } = setup(store)
    let tree = component.root.findByType(Text).props.children
    expect(tree[0] + tree[1].props.children).toBe('No pool connection detected. Reconnect')
  })

  it('click is working for disconnect pool case', () => {
    const { component } = setup(store)
    let tree = component.root.findByType(Text).props.children
    tree[1].props.onPress()
  })
})


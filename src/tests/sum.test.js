import { expect, test } from 'vitest'
import Fn from './functionTest.ts'

test('adds 1 + 2 to equal 3', () => {
  expect(Fn.sum(1, 2)).toBe(3)
})
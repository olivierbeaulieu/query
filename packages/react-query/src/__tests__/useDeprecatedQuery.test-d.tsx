import { describe, expectTypeOf, it } from 'vitest'

import { useDeprecatedQuery } from '../useDeprecatedQuery'

describe('react-query useDeprecatedQuery type overrides', () => {
  it('Basic non-suspense', () => {
    expectTypeOf(
      useDeprecatedQuery({
        queryKey: ['key'],
        queryFn: async () => 42,
      }).data,
    ).toEqualTypeOf<number | undefined>()
  })

  it('Basic suspense', () => {
    expectTypeOf(
      useDeprecatedQuery({
        queryKey: ['key'],
        queryFn: async () => 42,
        suspense: true,
      }).data,
    ).toBeNumber()
  })

  it('Suspense + disabled', () => {
    expectTypeOf(
      useDeprecatedQuery({
        queryKey: ['key'],
        queryFn: async () => 42,
        suspense: true,
        enabled: false,
      }).data,
    ).toEqualTypeOf<number | undefined>()
  })

  it('Suspense + maybe disabled', () => {
    expectTypeOf(
      useDeprecatedQuery({
        queryKey: ['key'],
        queryFn: async () => 42,
        suspense: true,
        enabled: Math.random() > 0.5,
      }).data,
    ).toEqualTypeOf<number | undefined>()
  })

  it('Using select', () => {
    expectTypeOf(
      useDeprecatedQuery({
        queryKey: ['key'],
        queryFn: async () => ({
          foo: 42,
        }),
        select: (data) => data.foo,
      }).data,
    ).toEqualTypeOf<number | undefined>()
  })

  it('Using select and suspense', () => {
    expectTypeOf(
      useDeprecatedQuery({
        queryKey: ['key'],
        queryFn: async () => ({
          foo: 42,
        }),
        select: (data) => data.foo,
        suspense: true,
      }).data,
    ).toEqualTypeOf<number>()
  })

  it('Using select and suspense', () => {
    expectTypeOf(
      useDeprecatedQuery({
        queryKey: ['key'],
        queryFn: async () => ({
          foo: 42,
        }),
        select: (data) => data.foo,
        refetchInterval: (query) => {
          expectTypeOf(query.state.data).toEqualTypeOf<
            { foo: number } | undefined
          >()

          return 5000
        },
        suspense: true,
      }).data,
    ).toEqualTypeOf<number>()
  })
})

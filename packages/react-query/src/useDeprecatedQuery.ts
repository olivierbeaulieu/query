'use client'
import { QueryObserver } from '@tanstack/query-core'
import { useBaseQuery } from './useBaseQuery'
import type { DefaultError, QueryKey } from '@tanstack/query-core'
import type {
  UseBaseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryResult,
} from './types'

type SuspenseQueryOptions = {
  suspense: true
  enabled?: never | true
  useErrorBoundary?: never | true
}

export function useDeprecatedQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TQueryData = TQueryFnData,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  > &
    SuspenseQueryOptions,
): UseSuspenseQueryResult<TData, TError>

export function useDeprecatedQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TQueryData = TQueryFnData,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >,
): UseQueryResult<TData, TError>

export function useDeprecatedQuery(options: any): any {
  return useBaseQuery(options, QueryObserver)
}

import type { BasePayload, BaseRecord } from '@/records/base'

export enum TradeAction {
  buy = 'buy',
  sell = 'sell',
  close = 'close',
}

export interface TradePayload extends BasePayload {
  account: string
  tradeAction: TradeAction
  symbol: string
  avgCost: number
  openInterest: number
  deleted: string
}

export interface TradeRecord extends BaseRecord {
  account: string
  tradeAction: TradeAction
  symbol: string
  avgCost: number
  openInterest: number
  deleted: Date
}

export function tfBasePayloadToRecord(payload: TradePayload): TradeRecord {
  return {
    id: payload.id,
    account: payload.account,
    tradeAction: payload.tradeAction,
    symbol: payload.symbol,
    avgCost: payload.avgCost,
    openInterest: payload.openInterest,
    deleted: new Date(payload.deleted),
    created: new Date(payload.created),
    updated: new Date(payload.updated),
  }
}

export function tfBaseRecordToPayload(record: TradeRecord): TradePayload {
  return {
    id: record.id,
    account: record.account,
    tradeAction: record.tradeAction,
    symbol: record.symbol,
    avgCost: record.avgCost,
    openInterest: record.openInterest,
    deleted: record.deleted.toISOString(),
    created: record.created.toISOString(),
    updated: record.updated.toISOString(),
  }
}

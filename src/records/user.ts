import type { BasePayload, BaseRecord } from '@/records/base'

export interface UserPayload extends BasePayload {
  username: string
  email: string
  emailVisibility: boolean
  verified: boolean
  operatorNumber: number
}

export interface UserRecord extends BaseRecord {
  username: string
  email: string
  emailVisibility: boolean
  verified: boolean
  operatorNumber: number
}

export function userPayloadToRecord(payload: UserPayload): UserRecord {
  return {
    id: payload.id,
    username: payload.username,
    email: payload.email,
    emailVisibility: payload.emailVisibility,
    verified: payload.verified,
    operatorNumber: payload.operatorNumber,
    created: new Date(payload.created),
    updated: new Date(payload.updated),
  }
}

export function userRecordToPayload(record: UserRecord): UserPayload {
  return {
    id: record.id,
    username: record.username,
    email: record.email,
    emailVisibility: record.emailVisibility,
    verified: record.verified,
    operatorNumber: record.operatorNumber,
    created: record.created.toISOString(),
    updated: record.updated.toISOString(),
  }
}

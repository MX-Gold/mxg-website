import type { BasePayload, BaseRecord } from '@/records/base'

export interface UserMetaPayload extends BasePayload {
  user: string
  idNumber: string
  account: string
}

export interface UserMetaRecord extends BaseRecord {
  user: string
  idNumber: string
  account: string
}

export function userMetaPayloadToRecord(payload: UserMetaPayload): UserMetaRecord {
  return {
    id: payload.id,
    user: payload.user,
    idNumber: payload.idNumber,
    account: payload.account,
    created: new Date(payload.created),
    updated: new Date(payload.updated),
  }
}

export function userMetaRecordToPayload(record: UserMetaRecord): UserMetaPayload {
  return {
    id: record.id,
    user: record.user,
    idNumber: record.idNumber,
    account: record.account,
    created: record.created.toISOString(),
    updated: record.updated.toISOString(),
  }
}

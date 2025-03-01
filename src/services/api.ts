import type { FormData } from '../context/formTypes'

const API_BASE_URL = 'http://localhost:3000'

export interface EntityResponse extends FormData {
  uuid: string
}

export interface ApiResponse {
  message: string
  entity: EntityResponse
}

export async function createEntity(data: FormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/entities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create entity')
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('Response body is empty')
  }

  let result = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    result += new TextDecoder().decode(value)
  }

  return JSON.parse(result)
}

export async function updateEntity(uuid: string, data: FormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/entities/${uuid}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update entity')
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('Response body is empty')
  }

  let result = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    result += new TextDecoder().decode(value)
  }

  return JSON.parse(result)
}

export async function getEntity(uuid: string): Promise<EntityResponse> {
  const response = await fetch(`${API_BASE_URL}/entities/${uuid}`)

  if (!response.ok) {
    throw new Error('Failed to fetch entity')
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('Response body is empty')
  }

  let result = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    result += new TextDecoder().decode(value)
  }

  return JSON.parse(result)
}

export type AsyncState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}
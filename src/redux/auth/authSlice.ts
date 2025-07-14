import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { JwtType } from '../../types'
import { requestRefresh } from '../../services/auth'
import { jwt } from '../../utils/jwt'

export const fetchRefresh = createAsyncThunk('auth/fetchRefresh', async (body: Pick<JwtType, 'refresh'>) => {
  const data = await requestRefresh(body)
  let newJwt = null

  // Обновление JWT
  if (data) {
    newJwt = {
      refresh: body.refresh,
      access: data.access
    }

    jwt.setToLocalStorage(newJwt)
  }

  return newJwt
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    jwt: jwt.getFromLocalStorage(),
    isLoading: false,
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRefresh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchRefresh.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchRefresh.fulfilled, (state, action) => {
        state.jwt = action.payload
        state.isLoading = false
      })
  }
})

export const { } = authSlice.actions
export const authReducer = authSlice.reducer
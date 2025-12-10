import { supabase } from '@/supabase.js'
import { useRquest } from '@/composables/useRequest.js'

export function useAuth() {
  const { loading, errorMessage, handleRequest } = useRquest()

  const signUp = async ({ email, password }) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return data
    })
  }

  return { signUp, loading, errorMessage }
}

// Mock Auth Service for prototype
// Replace this with Supabase Auth later

let isAuthenticated = false;

export const authService = {
  login: async (username, password) => {
    // Isolated temporary credential check
    // In production, this would call supabase.auth.signInWithPassword
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (username === 'admin' && password === 'anaya2026') {
      isAuthenticated = true;
      return { user: { username: 'admin' }, error: null };
    }
    
    return { user: null, error: new Error('Invalid credentials') };
  },
  
  logout: async () => {
    // In production: await supabase.auth.signOut()
    await new Promise(resolve => setTimeout(resolve, 200));
    isAuthenticated = false;
  },
  
  checkAuth: () => {
    // In production: return await supabase.auth.getSession()
    return isAuthenticated;
  }
};

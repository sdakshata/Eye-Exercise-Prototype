import { ApplicationSettings } from '@nativescript/core';

export interface User {
  id: string;
  email: string;
  name: string;
}

class AuthService {
  private static instance: AuthService;
  
  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    const user = {
      id: '1',
      email,
      name: email.split('@')[0]
    };
    
    this.saveUserData(user);
    return user;
  }

  private saveUserData(userData: User): void {
    ApplicationSettings.setString('user', JSON.stringify(userData));
  }

  getUserData(): User | null {
    const userData = ApplicationSettings.getString('user');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    ApplicationSettings.remove('user');
  }
}

export const authService = AuthService.getInstance();
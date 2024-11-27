// src/users/user.interface.ts

export interface UserInterface {
    username: string;
    email: string;
    password: string; // Ten en cuenta que no deberías devolver la contraseña en un entorno real
  }
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// Define tipos para el usuario y su rol
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    roleId: string;
    role?: {
      id: string;
      name: string;
    };
  }
  interface Session {
    user: User;
  }
}

// Definir opciones de autenticación
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Añadir información de rol al token
      if (user) {
        token.id = user.id;
        token.roleId = user.roleId;
        // Obtener información adicional del rol
        const userWithRole = await prisma.user.findUnique({
          where: { id: user.id },
          include: { role: true },
        });
        if (userWithRole?.role) {
          token.role = {
            id: userWithRole.role.id,
            name: userWithRole.role.name,
          };
        }
      }
      // Actualizar el token si se actualizan los datos de sesión
      if (trigger === "update" && session) {
        if (session.user) {
          token.name = session.user.name;
          token.email = session.user.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string | null;
        session.user.roleId = token.roleId as string;
        session.user.role = token.role as { id: string; name: string };
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciales incompletas");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            role: true,
          },
        });
        if (!user || !user.password) {
          throw new Error("Usuario no encontrado");
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) {
          throw new Error("Contraseña incorrecta");
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          role: user.role ? {
            id: user.role.id,
            name: user.role.name,
          } : undefined,
        };
      },
    }),
  ],
};

// Exportar handlers de NextAuth
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

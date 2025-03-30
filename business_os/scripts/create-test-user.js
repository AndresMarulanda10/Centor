// Script para crear un usuario de prueba
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Verificando roles existentes...');
  
  // Verificar si existen roles, si no, crear los básicos
  const adminRoleExists = await prisma.role.findUnique({ where: { id: 'admin' } });
  const userRoleExists = await prisma.role.findUnique({ where: { id: 'user' } });
  
  if (!adminRoleExists) {
    console.log('Creando rol de administrador...');
    await prisma.role.create({
      data: {
        id: 'admin',
        name: 'Administrador',
        description: 'Acceso completo a todas las funcionalidades',
      }
    });
  }
  
  if (!userRoleExists) {
    console.log('Creando rol de usuario estándar...');
    await prisma.role.create({
      data: {
        id: 'user',
        name: 'Usuario',
        description: 'Acceso limitado a funcionalidades básicas',
      }
    });
  }
  
  // Hash de la contraseña
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Verificar si el usuario de prueba ya existe
  const existingUser = await prisma.user.findUnique({
    where: {
      email: 'test@example.com',
    }
  });
  
  if (existingUser) {
    console.log('El usuario de prueba ya existe:', existingUser.email);
    return;
  }
  
  // Crear usuario de prueba
  const user = await prisma.user.create({
    data: {
      name: 'Usuario de Prueba',
      email: 'test@example.com',
      password: hashedPassword,
      roleId: 'admin', // Asignar rol de administrador para tener acceso completo
    }
  });
  
  console.log('Usuario de prueba creado exitosamente:');
  console.log('- Email:', user.email);
  console.log('- Contraseña: password123');
  console.log('- Rol:', user.roleId);
}

main()
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

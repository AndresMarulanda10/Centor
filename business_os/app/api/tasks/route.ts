import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// GET /api/tasks - Obtener todas las tareas
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Solo permitir usuarios autenticados
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Buscar por correo electrónico ya que estamos seguros que el usuario está autenticado
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Obtener las tareas asignadas al usuario o creadas por él
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { assigneeId: user.id },
          { creatorId: user.id }
        ]
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// POST /api/tasks - Crear una nueva tarea
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Solo permitir usuarios autenticados
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Obtener el ID del usuario autenticado
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const data = await request.json();
    
    // Validar datos mínimos necesarios
    if (!data.title) {
      return NextResponse.json({ error: 'El título es requerido' }, { status: 400 });
    }

    // Crear tarea en la base de datos
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || '',
        status: data.status || 'pending',
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        creator: { connect: { id: user.id } },
        assignee: data.responsible ? 
          { connect: { id: user.id } } : // Asignar al creador por defecto
          undefined
      },
    });

    // Registrar actividad de creación
    await prisma.activity.create({
      data: {
        action: 'created',
        details: `Tarea "${task.title}" creada`,
        user: { connect: { id: user.id } },
        task: { connect: { id: task.id } }
      }
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
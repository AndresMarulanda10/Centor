import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET /api/tasks/[id] - Obtener una tarea específica
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Verificar autenticación
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    const taskId = params.id;
    
    // Obtener la tarea con el ID especificado
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    if (!task) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// PUT /api/tasks/[id] - Actualizar una tarea
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Verificar autenticación
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    // Obtener el usuario actual
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    
    const taskId = params.id;
    const data = await request.json();
    
    // Verificar que la tarea existe
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });
    
    if (!existingTask) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }
    
    // Preparar datos para actualización
    const updateData: any = {};
    
    if (data.title) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status) updateData.status = data.status;
    if (data.dueDate) updateData.dueDate = new Date(data.dueDate);
    
    // Actualizar la tarea
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: updateData
    });
    
    // Registrar actividad de actualización
    await prisma.activity.create({
      data: {
        action: 'updated',
        details: `Tarea "${updatedTask.title}" actualizada`,
        user: { connect: { id: user.id } },
        task: { connect: { id: taskId } }
      }
    });
    
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// DELETE /api/tasks/[id] - Eliminar una tarea
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Verificar autenticación
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    const taskId = params.id;
    
    // Verificar que la tarea existe
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });
    
    if (!task) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }
    
    // Eliminar la tarea
    await prisma.task.delete({
      where: { id: taskId }
    });
    
    return NextResponse.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
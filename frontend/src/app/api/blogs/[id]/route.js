import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Blog from '../../../../models/Blog';

// GET single blog
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const blog = await Blog.findById(params.id);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      blog
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Check if slug is being changed and if it conflicts
    if (body.slug) {
      const existingBlog = await Blog.findOne({ 
        slug: body.slug,
        _id: { $ne: params.id }
      });
      if (existingBlog) {
        return NextResponse.json(
          { success: false, error: 'Another blog with this title already exists' },
          { status: 400 }
        );
      }
    }
    
    const blog = await Blog.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      blog
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const blog = await Blog.findByIdAndDelete(params.id);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
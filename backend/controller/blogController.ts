
const asyncHandler = require("express-async-handler")
import {PrismaClient} from "@prisma/client"
import {  Request, Response} from "express";
interface AuthenticatedRequest extends Request {
    user?: any;
  }
export const createBlog = asyncHandler(async(req:AuthenticatedRequest, res:Response)=>{
    const user = req.user;
    const body = req.body;
    const {title, label, description}=body;
    if(!title || !label || !description){
        throw new Error("All fields are required.");
    }
    const prisma = new PrismaClient();
    try{

      const newBlog = await prisma.blog.create({
          data: {
            title,
            label,
            Description: description,
            userId: user.id, // Assuming userId corresponds to an existing User in your database
          },
        });
        await prisma.user.update({
          where: { id: user.id },
          data: { blogs: { connect: { id: newBlog.id } } },
        });
      
      // console.log(req.user);
      return res.status(200).json(newBlog)
    }
    finally{
  await prisma.$disconnect();

    }
})

export const updateBlog = asyncHandler(async(req:AuthenticatedRequest, res:Response)=>{
  const user = req.user;
  const body = req.body;
  const { blogId, title, label, description,   } = body;

  if (!blogId || !title || !label || !description) {
    throw new Error("All fields are required.");
  }

  const prisma = new PrismaClient();
  try{

    const existingBlog = await prisma.blog.findFirst({
      where: {
        id: blogId,
        userId: user.id,
      },
    });
  
    if (!existingBlog) {
      throw new Error("Blog not found or you do not have permission to update it.");
    }
  
    // Update the blog
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        label,
        Description: description,
      },
    });
  
    return res.status(200).json({updatedBlog, status:"success"});
  }
  finally{
  await prisma.$disconnect();

  }
  // Check if the blog exists and belongs to the logged-in user

})

export const likeBlog = asyncHandler(async(req:AuthenticatedRequest, res:Response)=>{
  const user = req.user;
  const body = req.body;
  const { blogId } = body;

  if (!blogId) {
    throw new Error("Blog ID is required.");
  }

  const prisma = new PrismaClient();
  try{

    const existingBlog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });
  
    if (!existingBlog) {
      throw new Error("Blog not found.");
    }
  
    // Check if the user has already liked the blog
    const existingLike = await prisma.likedBlog.findFirst({
      where: {
        userId: user.id,
        blogId: blogId,
      },
    });
  
    if (existingLike) {
      throw new Error("You have already liked this blog.");
    }
  
    // Create a new liked blog entry
    const increase = await prisma.blog.update({
      where: {
        id: blogId
      },
      data: {
        likes: {
          increment: 1, // Increment the 'likes' count by 1
        },
      },
    })
    const likedBlog = await prisma.likedBlog.create({
      data: {
        userId: user.id,
        blogId: blogId,
      },
    });
  
    return res.status(200).json({ message: "Blog liked successfully." });
  }
  finally{
  await prisma.$disconnect();

  }
  // Check if the blog exists
})

export const dislikeBlog = asyncHandler(async(req:AuthenticatedRequest, res:Response)=>{
  const user = req.user;
  const body = req.body;
  const { blogId } = body;

  if (!blogId) {
    throw new Error("Blog ID is required.");
  }

  const prisma = new PrismaClient();
  try{

    const existingBlog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });
  
    if (!existingBlog) {
      throw new Error("Blog not found.");
    }
  
    // Check if the user has liked the blog
    const existingLike = await prisma.likedBlog.findFirst({
      where: {
        userId: user.id,
        blogId: blogId,
      },
    });
  
    if (!existingLike) {
      throw new Error("You haven't liked this blog.");
    }
  
    // Remove the liked blog entry
    const decrement = await prisma.blog.update({
      where: {
        id: blogId
      },
      data: {
        likes: {
          decrement: 1, // Increment the 'likes' count by 1
        },
      },
    })
    await prisma.likedBlog.delete({
      where: {
        id: existingLike.id,
      },
    });
  
    return res.status(200).json({ message: "Like removed successfully." });
  }
  finally{
  await prisma.$disconnect();

  }
  // Check if the blog exists

})

export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try{

    const blogs = await prisma.blog.findMany();
  
    return res.status(200).json({blogs, message:"success"});
  }
  finally{
  await prisma.$disconnect();

  }
});

export const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const blogId = req.params.blogId;
  
  const prisma = new PrismaClient();

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });
  
    if (!blog) {
      throw new Error("Blog not found.");
    }
  
    return res.status(200).json(blog);
    
  } finally{
  await prisma.$disconnect();

  }
});
export const getUserBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  
  const prisma = new PrismaClient();
  try{
  const blog = await prisma.blog.findMany({
    where: {
      userId: userId,
    },
  });
  if (!blog) {
    throw new Error("Blog not found.");
  }

  return res.status(200).json({blog, message:"success"});
    
  }
  finally{
  // console.log("inside finaly statement ")
    await prisma.$disconnect();

  }
});


export const deleteBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const blogId = req.params.blogId;
  
  // console.log(user)
  const prisma = new PrismaClient();
  try {
    
    if(!blogId){
      throw new Error("Invalid Request.");
  }
  // Check if the blog exists
  console.log(blogId,user.id)
  const existingBlog = await prisma.blog.findFirst({
    where: {
      id: blogId,
      userId: user.id, // Ensure the blog belongs to the logged-in user
    },
  });
  
  if (!existingBlog) {
    throw new Error("Blog not found or you do not have permission to delete it.");
  }

  await prisma.likedBlog.deleteMany({
    where: {
      blogId: blogId,
    },
  });
  // Delete the blog
  await prisma.blog.delete({
    where: {
      id: blogId,
    },
  });

  return res.status(200).json({ message: "Blog deleted successfully." });
} finally {
  await prisma.$disconnect()
}
});


export const getAllBlogsExceptUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const prisma = new PrismaClient();
  try {
    
    const blogs = await prisma.blog.findMany({
      where: {
        NOT: {
          userId: user.id,
        },
      },
    });
  
    return res.status(200).json({blogs, message:"success"});
  } finally {
    await prisma.$disconnect()
  }
})


export const isLikedBlog = asyncHandler(async (req:AuthenticatedRequest, res:Response) =>{
  const user = req.user;
  const {blogId} = req.body;
  if(!blogId){
    throw new Error("Invalid Request. Blog not found.")
  }
  const prisma = new PrismaClient();
  try{
    const isLiked = await prisma.likedBlog.findFirst({
      where:{
        userId: user.id,
        blogId: blogId
      }
    })
    if(isLiked){
      res.status(200).json({status:"success", isLiked:true})
    }
    else{
      res.status(200).json({status:"success", isLiked:false})
    }

  }
  finally{
    await prisma.$disconnect()
  }

})
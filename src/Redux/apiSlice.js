import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Async thunk for fetching profile
export const createArticle = createAsyncThunk("api/generate-article", async (data, {rejectWithValue}) => {
    try {
        const prompt = `Write an artical about ${data.input} in ${data.selectedLength.text}`
        const response = await axios.post("/api/ai/generate-article", {prompt, length: data.selectedLength.length},
            {
                headers:{Authorization: `Bearer ${data.token}`}
            }
        );
        if (response?.data?.success) {
            toast.success('Article created successfully!');
        }else {
            toast.error('Error in article creation!');
        }
        return response?.data?.content;
    } catch (error) {
        console.log("Error", error);
        toast.error(
        error?.response?.data?.message || error?.message || 'An error occurred',
      );
      return rejectWithValue(error.response?.data || error.message);
    }
}
);

export const createBlogTitle = createAsyncThunk("api/generate-blog-title", async (data, {rejectWithValue}) => {
    try {
        const prompt = `generate a blog title for the keyword ${data.input} in the category ${data.selectedCategory}`
        const response = await axios.post("/api/ai/generate-blog-title", {prompt},
            {
                headers:{Authorization: `Bearer ${data.token}`}
            }
        );
        if (response?.data?.success) {
            toast.success('Document generated successfully!');
        }else {
            toast.error('Document generated successfully!');
        }
        return response?.data?.content;
    } catch (error) {
        console.log("Error", error);
        toast.error(
        error?.response?.data?.message || error?.message || 'An error occurred',
      );
      return rejectWithValue(error.response?.data || error.message);
    }
}
);

export const generateImage = createAsyncThunk("api/generate-image", async (data, {rejectWithValue}) => {
    try {
        const prompt = `generate a image of ${data?.input} in the style ${data?.selectedStyle}`
        const response = await axios.post("/api/ai/generate-image", {prompt, publish: data?.publish},
            {
                headers:{Authorization: `Bearer ${data?.token}`}
            }
        );
        if (response?.data?.success) {
            toast.success('Image generated successfully!');
        }else {
            toast.error('Error in image generation!');
        }
        return response?.data?.content;
    } catch (error) {
        console.log("Error", error);
        toast.error(
        error?.response?.data?.message || error?.message || 'An error occurred',
      );
      return rejectWithValue(error.response?.data || error.message);
    }
}
);

export const removeObject = createAsyncThunk("api/remove-object-from-image", async ({formData, token}, {rejectWithValue}) => {
    try {
        console.log("data>>>", formData);
        // const prompt = `generate a image of ${data?.input} in the style ${data?.selectedStyle}`
        const response = await axios.post("/api/ai/remove-object-from-image", formData,
            {
                headers:{Authorization: `Bearer ${token}`}
            }
        );
        if (response?.data?.success) {
            toast.success('Image generated successfully!');
        }else {
            toast.error('Error in image generation!');
        }
        return response?.data?.content;
    } catch (error) {
        console.log("Error", error);
        toast.error(
        error?.response?.data?.message || error?.message || 'An error occurred',
      );
      return rejectWithValue(error.response?.data || error.message);
    }
}
);

export const reviewResume = createAsyncThunk("api/resume-review", async ({formData, token}, {rejectWithValue}) => {
    try {
        console.log("data>>>", formData);
        // const prompt = `generate a image of ${data?.input} in the style ${data?.selectedStyle}`
        const response = await axios.post("/api/ai/resume-review", formData,
            {
                headers:{Authorization: `Bearer ${token}`}
            }
        );
        if (response?.data?.success) {
            toast.success(response?.data?.message || 'Image generated successfully!');
        }else {
            toast.error(response?.data?.message || 'Error in image generation!');
        }
        return response?.data?.content;
    } catch (error) {
        console.log("Error", error);
        toast.error(
        error?.response?.data?.message || error?.message || 'An error occurred',
      );
      return rejectWithValue(error.response?.data || error.message);
    }
}
);

export const community = createAsyncThunk("api/get-published-creations", async ({token}, {rejectWithValue}) => {
    try {
        const response = await axios.get("/api/user/get-published-creations",
            {
                headers:{Authorization: `Bearer ${token}`}
            }
        );
        if (response?.data?.success) {
            toast.success(response?.data?.message || 'Image generated successfully!');
        }else {
            toast.error(response?.data?.message || 'Error in image generation!');
        }
        return response?.data?.creations;
    } catch (error) {
        console.log("Error", error);
        toast.error(
        error?.response?.data?.message || error?.message || 'An error occurred',
      );
      return rejectWithValue(error.response?.data || error.message);
    }
}
);

export const likeDislike = createAsyncThunk("api/toggle-like-creation", async ({token, userId, creationId}, {rejectWithValue, dispatch}) => {
    try {

        const response = await axios.post("/api/user/toggle-like-creation", {userId, creationId},
            {
                headers:{Authorization: `Bearer ${token}`}
            }
        );
        if (response?.data?.success) {
             dispatch(community({ token }));
            toast.success(response?.data?.message || 'Image generated successfully!');
        }else {
            toast.error(response?.data?.message || 'Error in image generation!');
        }
        return;
    } catch (error) {
        console.log("Error", error);
        toast.error(
        error?.response?.data?.message || error?.message || 'An error occurred',
      );
      return rejectWithValue(error.response?.data || error.message);
    }
}
);

export const getUsersCreation = createAsyncThunk("api/get-user-creations", async ({token}, {rejectWithValue}) => {
    try {
        const response = await axios.get("/api/user/get-user-creations",
            {
                headers:{Authorization: `Bearer ${token}`}
            }
        );
        if (response?.data?.success) {
            toast.success(response?.data?.message || 'Image generated successfully!');
        }else {
            toast.error(response?.data?.message || 'Error in image generation!');
        }
        return response?.data?.creations;
    } catch (error) {
        console.log("Error", error);
        toast.error(
        error?.response?.data?.message || error?.message || 'An error occurred',
      );
      return rejectWithValue(error.response?.data || error.message);
    }
}
);

const apiSlice = createSlice({
    name:"api",
    initialState: {
         article: null,
         isArticleLoading: false,
         blogTitle: null,
         isBlogTitleLoading: false,
         image: null,
         isImageGenerating: false,
         updatedImage: null,
         isObjectRemoving: false,
         resume: null,
         isReviewingResume: false,
         publishedImage: null,
         isLoading: false,
         isLikeDisliking: false,
         userCreations: null,
         isLoadingAllCreations: false,
    },
    reducers: {
        getProfileDetails : (action, state)=>{
            
        }
    },
    extraReducers : (builder) => {
        // Article
        builder
            .addCase(createArticle.pending, (state)=>{
                state.isArticleLoading=true;
            })
            .addCase(createArticle.fulfilled, (state, action)=>{
                state.article=action.payload;
                state.isArticleLoading=false;
            })
            .addCase(createArticle.rejected, (state)=>{
                state.isArticleLoading=false;
            }) 
        // Blog Title
        builder
            .addCase(createBlogTitle.pending, (state)=>{
                state.isBlogTitleLoading=true;
            })
            .addCase(createBlogTitle.fulfilled, (state, action)=>{
                state.blogTitle=action.payload;
                state.isBlogTitleLoading=false;
            })
            .addCase(createBlogTitle.rejected, (state)=>{
                state.isBlogTitleLoading=false;
            }) 
        // Blog Title
        builder
            .addCase(generateImage.pending, (state)=>{
                state.isImageGenerating=true;
            })
            .addCase(generateImage.fulfilled, (state, action)=>{
                state.image=action.payload;
                state.isImageGenerating=false;
            })
            .addCase(generateImage.rejected, (state)=>{
                state.isImageGenerating=false;
            }) 
        // Blog Title
        builder
            .addCase(removeObject.pending, (state)=>{
                state.isObjectRemoving=true;
            })
            .addCase(removeObject.fulfilled, (state, action)=>{
                state.updatedImage=action.payload;
                state.isObjectRemoving=false;
            })
            .addCase(removeObject.rejected, (state)=>{
                state.isObjectRemoving=false;
            }) 
        // Blog Title
        builder
            .addCase(reviewResume.pending, (state)=>{
                state.isReviewingResume=true;
            })
            .addCase(reviewResume.fulfilled, (state, action)=>{
                state.resume=action.payload;
                state.isReviewingResume=false;
            })
            .addCase(reviewResume.rejected, (state)=>{
                state.isReviewingResume=false;
            }) 
        // Blog Title
        builder
            .addCase(community.pending, (state)=>{
                state.isLoading=true;
            })
            .addCase(community.fulfilled, (state, action)=>{
                state.publishedImage=action.payload;
                state.isLoading=false;
            })
            .addCase(community.rejected, (state)=>{
                state.isLoading=false;
            })

        // Like and Dislike---
          builder
            .addCase(likeDislike.pending, (state)=>{
                state.isLikeDisliking=true;
            })
            .addCase(likeDislike.fulfilled, (state)=>{
                state.isLikeDisliking=false;
            })
            .addCase(likeDislike.rejected, (state)=>{
                state.isLikeDisliking=false;
            }) 

        // Get all creations
        builder
            .addCase(getUsersCreation.pending, (state)=>{
                state.isLoadingAllCreations=true;
            })
            .addCase(getUsersCreation.fulfilled, (state, action)=>{
                state.userCreations=action.payload;
                state.isLoadingAllCreations=false;
            })
            .addCase(getUsersCreation.rejected, (state)=>{
                state.isLoadingAllCreations=false;
            })
    }
}
);

export default apiSlice.reducer
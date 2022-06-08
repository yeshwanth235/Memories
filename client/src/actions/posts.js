import { FETCH_ALL,DELETE, CREATE,UPDATE } from '../constants/actionTypes';
import * as api from '../api/index.js';

//Actions Creator
export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data});
    }catch (error) {
        console.log(`Error in getPosts, ${error.message}`)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post)
        console.log("post created")
        dispatch({type: CREATE, payload: data})
    }catch (err) {
        console.log(`Error in createPost, ${err.message}`)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(id, post)
        console.log(`updated data: ${data}`)
        dispatch({type: UPDATE, payload: data})
    } catch (err) {
        console.log(err)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)
        console.log('delete')
        dispatch({type: DELETE, payload: id})
    }catch(err) {
        console.log(err)
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id)
        console.log(`likePost data: ${data}`)
        dispatch({ type: UPDATE, payload: data })
    } catch (err) {
        console.log(err)
    }
}
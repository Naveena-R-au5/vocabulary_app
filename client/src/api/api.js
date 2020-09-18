import axios from 'axios'
//fetch api to get all the words
export const fetchData=()=>{
    return(dispatch)=>{
        axios.get('/fullwords')
        .then(response =>{
            console.log('resonse',response)
            dispatch({
                type:'GET_DATA',
                payload:response.data.data
            })
        }).catch(error=>{
            console.log(error)
        })
    }
}
//fetch api to get details of each word
export const fetchWordData=(id)=>{
    return(dispatch)=>{
        axios.get(`/word/${id}`)
        .then(response =>{
            console.log('detail resonse',response)
            dispatch({
                type:'WORD_DATA',
                payload:response.data.data
            })
        }).catch(error=>{
            console.log(error)
        })
    }
}


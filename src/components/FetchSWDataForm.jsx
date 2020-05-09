import React, { useState, useEffect, useRef} from "react"
import axios from "axios"
import { navigate } from "@reach/router"

const FetchSWDataForm = props => {
    const { data, setData, error, setError } = props
    const [resource, setResource] = useState("people")
    const [id, setId] = useState(1)
    const [flag, setFlag] = useState(false)

    // THIS BLOCK PREVENTS useEffect from running on initial page load
    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
    
        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }
    // THIS BLOCK PREVENTS useEffect from running on initial page load

    useDidMountEffect( ()=>{
        axios.get(`https://swapi.dev/api/${resource}/${id}`)
        .then(response=>{
            setData(response.data)
            setError(false)
        })
        .catch(err=>{
            setData({})
            setError(true)
        })
    }, [flag] )


    const onChange = e => {setResource(e.target.value)}
    const onChangeId = e => {setId(e.target.value)}
    const onSubmit = e => {
        e.preventDefault()
        setFlag(true)
        flag?
        setFlag(false):
        setFlag(true);
        navigate(`/${resource}/${id}/`)
    }
    
    return(
        <div className="row" style={{marginTop: "20px"}}>
            <div className="col-12 col-md-10 offset-md-1">
                <form onSubmit={ onSubmit } className="form-horizontal row">
                    <label className="col-form-label col-3">Search for:</label>
                    <div className="form-group col-3">
                        <select onChange={ onChange } className="form-control">
                            <option>people</option>
                            <option>planets</option>
                            <option>films</option>
                            <option>species</option>
                            <option>vehicles</option>
                            <option>starships</option>                    
                        </select>
                    </div>
                    <label className="col-form-label col-1">ID:</label>
                    <div className="form-group col-2">
                        <input onChange={ onChangeId } type="number" placeholder={1} className="form-control"/>
                    </div>
                    <div className="form-group col-3">
                        <button className="btn btn-primary btn-block">Search</button>
                    </div>
                </form>
            
            </div>

        </div>
    )
}
export default FetchSWDataForm
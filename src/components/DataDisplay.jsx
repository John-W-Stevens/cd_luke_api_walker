import React, { useState, useEffect, useRef } from "react";
import BenKenobi from "../ben_kenobi.png"
import axios from "axios"

const DataDisplay = props => {
    const { data, error } = props

    const [keys, setKeys] = useState([])
    const [vals, setVals] = useState([])

    const [isPerson, setIsPerson] = useState(false)
    const [homeWorld, setHomeWorld] = useState("")

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
        if (error === false){
            let keyArray = []
            let valArray = []
            if (data.homeworld){
                setIsPerson(true)
            }
            else {setIsPerson(false)}
            for (const [k, v] of Object.entries(data)){
                keyArray.push(k)
                valArray.push(v)
            }
            setKeys(keyArray)
            setVals(valArray)
        }
    }, [error, data] )

    useDidMountEffect( ()=>{
        axios.get(data.homeworld)
        .then(response=>{
            let i = keys.indexOf("homeworld")
            setVals(vals.slice(0,i).concat(response.data.name).concat(vals.slice(i+1,vals.length)))
        })
        .catch(err=>{
            setHomeWorld("")
        })
    }, [isPerson] )

    return(
        <div className="row" style={{marginTop: "20px"}}>
            <div className="col-12 col-md-10 offset-md-1">
                 {
                     error === true?
                     <div className="text-center">
                        <h4>There are not the droids you are looking for...</h4>
                        <p>This resource doesn't exist</p>
                        <img src={BenKenobi} alt="Obi Wan Kenobi" style={{border: "1px solid lightgrey", borderRadius:"5px"}}/>
                     </div>:
                     <div style={{minHeight: "500px", maxHeight: "500px", overflow: "auto", border: "1px solid lightgrey", borderRadius:"5px", padding:"10px"}}>
                        {
                            keys.map( (item, i)=> (
                                <p key={i} > <strong>{ item }:</strong> { vals[i] }</p>
                            ))
                        }
                     </div>
                 }
            </div>
        </div>
    )
}

export default DataDisplay
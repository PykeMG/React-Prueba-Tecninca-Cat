import { useEffect, useState } from "react"
import './App.css';

const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`

export function App() {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

    // Aqui va el fetch a la API de los gatos
    useEffect(() => {

        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => {
            if (!res.ok) throw new Error('Error fetching cats facts')
            return res.json()})
        .then(data => {
            const {fact} = data
            setFact(fact)
        })
    }, [])

    useEffect(() => {

        if (!fact) return

        const firstword = fact.split(' ').slice(0, 3).join(' ')

            fetch(`https://cataas.com/cat/says/${firstword}?size=50&color=red&json=true`)
            .then(res => {
                if (!res.ok) throw new Error('Error fetching cats facts')
                return res.json()})
            .then(response => {
        
                const {_id} = response
                setImageUrl(`https://cataas.com/cat/${_id}/says/${firstword}`)
            })
    }, [fact])

        return(
            <main>
                <h1>App de gatitos</h1>
                {fact && <p>{fact} </p>}
                {imageUrl && <img src={imageUrl} alt={`Image extracted from the first Word from ${fact}`}/>}
            </main>          
        )
}